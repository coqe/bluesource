import { Moment } from 'moment';
import { IRepo } from 'app/shared/model//repo.model';
import { IUserProfile } from 'app/shared/model//user-profile.model';
import { IComment } from 'app/shared/model//comment.model';
import { IKeyword } from 'app/shared/model//keyword.model';

export interface IProject {
  id?: number;
  name?: string;
  createdAt?: Moment;
  description?: string;
  logoContentType?: string;
  logo?: any;
  status?: string;
  issueTrackerUri?: string;
  attachmentContentType?: string;
  attachment?: any;
  repo?: IRepo;
  createdBies?: IUserProfile[];
  comments?: IComment[];
  technologies?: IKeyword[];
  contributors?: IUserProfile[];
  admins?: IUserProfile[];
}

export const defaultValue: Readonly<IProject> = {};
