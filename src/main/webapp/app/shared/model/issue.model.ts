import { IComment } from 'app/shared/model//comment.model';
import { IUserProfile } from 'app/shared/model//user-profile.model';
import { IProject } from 'app/shared/model//project.model';

export interface IIssue {
  id?: number;
  summary?: string;
  fullDescription?: any;
  interest?: number;
  rewards?: number;
  comments?: IComment[];
  createdBy?: IUserProfile;
  projects?: IProject[];
}

export const defaultValue: Readonly<IIssue> = {};
