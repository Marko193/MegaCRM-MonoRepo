import {Module} from '@nestjs/common';
import {CryptoService} from './crypto.service';
import {ApiConfigService} from '../config/config.service';
import {ConfigService} from '@nestjs/config';

@Module({
  providers: [CryptoService, ApiConfigService, ConfigService],
  exports: [CryptoService, ApiConfigService, ConfigService],
})
export class CryptoModule {}
