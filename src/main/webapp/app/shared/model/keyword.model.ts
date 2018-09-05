import { IProject } from 'app/shared/model//project.model';
import { IUserProfile } from 'app/shared/model//user-profile.model';

export interface IKeyword {
  id?: number;
  word?: string;
  projects?: IProject[];
  users?: IUserProfile[];
}

export const defaultValue: Readonly<IKeyword> = {};
