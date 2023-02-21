import {Request} from 'express';
import {User} from '../../entities/user.entity';

export default interface UserObject extends Request {
  user: User;
}
