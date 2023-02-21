import {Injectable} from '@nestjs/common';
import {hash, compare} from 'bcrypt';
import * as CryptoJS from 'crypto-js';
import {ApiConfigService} from '../config/config.service';
import * as passwordGenerator from 'generate-password';

@Injectable()
export class CryptoService {
  constructor(private readonly configService: ApiConfigService) {}
  readonly salt: number = 12;
  readonly passwordLength: number = 16;
  readonly isNumbersAllowed: boolean = true;

  async generatePasswordKey(): Promise<string> {
    return passwordGenerator.generate({
      length: this.passwordLength,
      numbers: this.isNumbersAllowed,
    });
  }

  async hash(input: string): Promise<string> {
    return await hash(input, this.salt);
  }

  async compareHash(input: string, hashToCompare: string): Promise<boolean> {
    return await compare(input, hashToCompare);
  }

  async restorePasswordTokenEncoder(restorePasswordKey: string) {
    const encrypted = CryptoJS.AES.encrypt(
      restorePasswordKey,
      this.configService.secretEncodeKey
    ).toString();
    return {
      encrypted,
      encoded: CryptoJS.enc.Base64.parse(encrypted).toString(CryptoJS.enc.Hex),
    };
  }

  async restorePasswordTokenDecoder(encodedRestorePasswordToken: string) {
    return CryptoJS.enc.Hex.parse(encodedRestorePasswordToken).toString(
      CryptoJS.enc.Base64
    );
  }

  async encryptText(rawText: string) {
    return await CryptoJS.AES.encrypt(
      rawText,
      this.configService.secretEncodeKey
    ).toString();
  }

  async decryptText(hashedText: string) {
    return await CryptoJS.AES.decrypt(
      hashedText,
      this.configService.secretEncodeKey
    ).toString(CryptoJS.enc.Utf8);
  }
}
