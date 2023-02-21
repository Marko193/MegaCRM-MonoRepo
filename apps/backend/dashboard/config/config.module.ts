import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {validationEnv} from './env.validation';
import {ApiConfigService, EnvironmentVariables} from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: {
        validate: validationEnv(EnvironmentVariables),
      },
    }),
  ],
  providers: [ApiConfigService],
  exports: [ApiConfigService],
})
export class ApiConfigModule {}
