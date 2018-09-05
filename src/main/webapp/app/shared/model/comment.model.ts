import { Moment } from 'moment';
import { IUserProfile } from 'app/shared/model//user-profile.model';
import { IProject } from 'app/shared/model//project.model';
import { IIssue } from 'app/shared/model//issue.model';

export interface IComment {
  id?: number;
  text?: string;
  createdAt?: Moment;
  madeBy?: IUserProfile;
  project?: IProject;
  issue?: IIssue;
}

export const defaultValue: Readonly<IComment> = {};
