import { IProject } from 'app/shared/model//project.model';

export interface IKeyword {
  id?: number;
  word?: string;
  projects?: IProject[];
}

export const defaultValue: Readonly<IKeyword> = {};
