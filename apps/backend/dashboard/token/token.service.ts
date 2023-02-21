import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {User} from '../entities/user.entity';
import {TypeToken} from '../enums';
import {CryptoService} from '../crypto/crypto.service';
import {DataSource, Repository} from 'typeorm';
import {Token} from '../entities/tokens.entity';
import {CONNECTION} from '../tenancy/tenancy.symbols';
import Payload from '../auth/interface/payload.interface';
import {ApiConfigService} from '../config/config.service';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class TokenService {
  private readonly tokenEntity: Repository<Token>;
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly configService: ApiConfigService,
    private readonly jwtService: JwtService,
    @Inject(CONNECTION) connection: DataSource
  ) {
    this.tokenEntity = connection.getRepository(Token);
  }

  public async setCurrentTokenType(
    token: string,
    user: User,
    tokenType: TypeToken,
    expTime: Date,
    createTime: Date
  ) {
    try {
      const rawHashedToken =
        tokenType !== 'restore_password'
          ? await this.cryptoService.hash(token.slice(137))
          : token;

      await this.tokenEntity.upsert(
        {
          user_id: user.id,
          token: rawHashedToken,
          type: tokenType,
          used_at: createTime,
          expiratin_at: expTime,
        },
        {
          skipUpdateIfNoValuesChanged: true,
          conflictPaths: ['user_id'],
        }
      );
      return rawHashedToken;
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getJwtToken(user: User, tokenOption: TypeToken) {
    const payload: Payload = {
      id: user.id,
      corporate_email: user.corporate_email,
    };
    return this.jwtService.sign(payload, {
      privateKey:
        tokenOption === 'access'
          ? this.configService.jwtPrivateKeyAccess
          : this.configService.jwtPrivateKeyRefresh,
      expiresIn:
        tokenOption === 'access'
          ? this.configService.jwtAccessTokenExpTime
          : this.configService.jwtRefreshTokenExpTime,
      algorithm: 'RS256',
    });
  }

  public async getTokenByHash(tokenHash: string) {
    const token = await this.tokenEntity.findOne({
      where: {
        token: tokenHash,
      },
    });
    if (token) {
      return token;
    }
    throw new HttpException('Such token wasn`t found.', HttpStatus.NOT_FOUND);
  }

  public async removeTokenHelper(user_id: number) {
    return this.tokenEntity
      .createQueryBuilder()
      .delete()
      .where('user_id = :user_id', {user_id})
      .execute();
  }
}
