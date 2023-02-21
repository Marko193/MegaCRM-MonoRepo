import {Module} from '@nestjs/common';
import {TokenService} from './token.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Token} from '../entities/tokens.entity';
import {User} from '../entities/user.entity';
import {CryptoModule} from '../crypto/crypto.module';
import {ApiConfigModule} from '../config/config.module';
import {JwtModule} from '@nestjs/jwt';

@Module({
  imports: [
    ApiConfigModule,
    CryptoModule,
    TypeOrmModule.forFeature([Token, User]),
    JwtModule.register({}),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
