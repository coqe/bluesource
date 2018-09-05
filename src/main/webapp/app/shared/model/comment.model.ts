import { Moment } from 'moment';
import { IProject } from 'app/shared/model//project.model';

export interface IComment {
  id?: number;
  text?: string;
  createdAt?: Moment;
  project?: IProject;
}

export const defaultValue: Readonly<IComment> = {};
