import { Moment } from 'moment';
import { IProject } from 'app/shared/model//project.model';
import { IIssue } from 'app/shared/model//issue.model';
import { IUserProfile } from 'app/shared/model//user-profile.model';

export interface IComment {
  id?: number;
  text?: string;
  createdAt?: Moment;
  project?: IProject;
  issue?: IIssue;
  madeBy?: IUserProfile;
}

export const defaultValue: Readonly<IComment> = {};
