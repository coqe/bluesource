import { IProject } from 'app/shared/model//project.model';

export interface IRepo {
  id?: number;
  uri?: string;
  project?: IProject;
}

export const defaultValue: Readonly<IRepo> = {};
