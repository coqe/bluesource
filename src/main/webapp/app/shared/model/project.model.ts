import { Moment } from 'moment';
import { IRepo } from 'app/shared/model//repo.model';
import { IComment } from 'app/shared/model//comment.model';
import { IUserProfile } from 'app/shared/model//user-profile.model';
import { IIssue } from 'app/shared/model//issue.model';
import { IKeyword } from 'app/shared/model//keyword.model';

export const enum Status {
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  ATTIC = 'ATTIC'
}

export interface IProject {
  id?: number;
  name?: string;
  createdAt?: Moment;
  dueDate?: Moment;
  description?: string;
  logoContentType?: string;
  logo?: any;
  interest?: number;
  status?: Status;
  issueTrackerUri?: string;
  attachmentContentType?: string;
  attachment?: any;
  repo?: IRepo;
  comments?: IComment[];
  createdBy?: IUserProfile;
  issue?: IIssue;
  technologies?: IKeyword[];
  contributors?: IUserProfile[];
  admins?: IUserProfile[];
}

export const defaultValue: Readonly<IProject> = {};
