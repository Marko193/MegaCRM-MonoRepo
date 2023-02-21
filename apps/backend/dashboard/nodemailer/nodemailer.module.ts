import {Module} from '@nestjs/common';
import {NodemailerService} from './nodemailer.service';
import {ApiConfigModule} from '../config/config.module';

@Module({
  imports: [ApiConfigModule],
  providers: [NodemailerService],
  exports: [NodemailerService],
})
export class NodemailerModule {}
