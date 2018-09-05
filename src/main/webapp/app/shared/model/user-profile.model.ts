import { IUser } from './user.model';
import { IProject } from 'app/shared/model//project.model';
import { IComment } from 'app/shared/model//comment.model';
import { IIssue } from 'app/shared/model//issue.model';
import { IKeyword } from 'app/shared/model//keyword.model';

export interface IUserProfile {
  id?: number;
  role?: string;
  avatarContentType?: string;
  avatar?: any;
  account?: IUser;
  creates?: IProject[];
  makes?: IComment[];
  raises?: IIssue[];
  skills?: IKeyword[];
  projects?: IProject[];
  administers?: IProject[];
}

export const defaultValue: Readonly<IUserProfile> = {};
