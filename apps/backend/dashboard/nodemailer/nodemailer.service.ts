import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as path from 'path';
import * as ejs from 'ejs';
import * as nodemailer from 'nodemailer';
import {ApiConfigService} from '../config/config.service';
import Nodemailer from '../auth/interface/nodemailer.interface';

@Injectable()
export class NodemailerService {
  constructor(private readonly configService: ApiConfigService) {}

  public async compileTemplate(template, data, options) {
    try {
      const file = path.resolve(
        `${this.configService.templatesPath}/${template}.ejs`
      );
      return await ejs.renderFile(file, data, options);
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async createMessageBodyFromTemplate(
    data,
    templateOptions
  ): Promise<Nodemailer> {
    try {
      const template = templateOptions.template || '';
      const dataTemplate = templateOptions.data || {};
      const options = templateOptions.options || {};

      data.html = await this.compileTemplate(template, dataTemplate, options);
      return data;
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async sendMessageToEmail(htmlMessageBodyObj, message) {
    try {
      const transporter = await nodemailer.createTransport({
        service: this.configService.smtpTransportService,
        host: this.configService.smtpTransportHost,
        port: 587,
        secure: true,
        requireTLS: true,
        auth: {
          user: this.configService.smtpTransportAuthUser,
          pass: this.configService.smtpTransportAuthPassword,
        },
      });

      const mailOptions = {
        from: htmlMessageBodyObj.from,
        to: htmlMessageBodyObj.to,
        subject: htmlMessageBodyObj.subject,
        html: htmlMessageBodyObj.html,
      };

      await transporter.sendMail(mailOptions, (error) => {
        if (error) {
          console.log('transporter.sendMail error', error);
          return error;
        }
      });

      return {
        success: true,
        message: message,
      };
    } catch (err) {
      throw new HttpException(
        `${err.detail}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
