import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import project, {
  ProjectState
} from 'app/entities/project/project.reducer';
// prettier-ignore
import comment, {
  CommentState
} from 'app/entities/comment/comment.reducer';
// prettier-ignore
import keyword, {
  KeywordState
} from 'app/entities/keyword/keyword.reducer';
// prettier-ignore
import repo, {
  RepoState
} from 'app/entities/repo/repo.reducer';
// prettier-ignore
import userProfile, {
  UserProfileState
} from 'app/entities/user-profile/user-profile.reducer';
// prettier-ignore
import skill, {
  SkillState
} from 'app/entities/skill/skill.reducer';
// prettier-ignore
import issue, {
  IssueState
} from 'app/entities/issue/issue.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly project: ProjectState;
  readonly comment: CommentState;
  readonly keyword: KeywordState;
  readonly repo: RepoState;
  readonly userProfile: UserProfileState;
  readonly skill: SkillState;
  readonly issue: IssueState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  project,
  comment,
  keyword,
  repo,
  userProfile,
  skill,
  issue,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
