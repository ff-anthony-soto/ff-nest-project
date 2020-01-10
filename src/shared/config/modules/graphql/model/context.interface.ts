import { IUser } from '@shared/auth/model/user.interface';
import { IDataloader } from '@shared/modules/dataloader/model/dataloader.interface';

export interface ICustomContext {
  req: any;
  res: any;
  user?: IUser;
  dataloader?: IDataloader;
}
