import { IUser } from './user.model';
import { ISkill } from 'app/shared/model//skill.model';
import { IProject } from 'app/shared/model//project.model';

export interface IUserProfile {
  id?: number;
  role?: string;
  avatarContentType?: string;
  avatar?: any;
  account?: IUser;
  skills?: ISkill[];
  created?: IProject;
  projects?: IProject[];
  administrators?: IProject[];
}

export const defaultValue: Readonly<IUserProfile> = {};
