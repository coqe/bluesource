import { IUserProfile } from 'app/shared/model//user-profile.model';

export interface ISkill {
  id?: number;
  name?: string;
  users?: IUserProfile[];
}

export const defaultValue: Readonly<ISkill> = {};
