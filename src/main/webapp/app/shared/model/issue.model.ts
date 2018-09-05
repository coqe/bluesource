import { IComment } from 'app/shared/model//comment.model';
import { IProject } from 'app/shared/model//project.model';
import { IUserProfile } from 'app/shared/model//user-profile.model';

export interface IIssue {
  id?: number;
  summary?: string;
  fullDescription?: any;
  interest?: number;
  rewards?: number;
  comments?: IComment[];
  project?: IProject;
  createdBy?: IUserProfile;
}

export const defaultValue: Readonly<IIssue> = {};
