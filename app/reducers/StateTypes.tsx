import {ErrorType} from '../error'
// TODO: URL type?

export type DialogIDType = 'ERROR' | 'PUBLISHED' | 'UNPUBLISHED';

export type ShareType = 'PRIVATE' | 'UNLISTED' | 'PUBLIC';

export interface QuestType {
  id?: string;
  xml?: string;
  md?: string;
  mdRealtime?: any;
  draftUrl?: string;
  publishedUrl?: string;
  created?: string;
  modified?: string;
  published?: string;
  shared?: string;
  shortUrl?: string;
  metaTitle?: string,
  metaSummary?: string,
  metaMinPlayers?: number,
  metaMaxPlayers?: number,
  metaEmail?: string,
  metaUrl?: string,
  metaMinTimeMinutes?: number,
  metaMaxTimeMinutes?: number,
  metaAuthor?: string
};

export type DirtyState = boolean;

export interface DialogsState {
  USER: boolean;
  ERROR: boolean;
  PUBLISHED: boolean;
  UNPUBLISHED: boolean;
  [key: string]: boolean;
}

export interface UserState {
  loggedIn?: boolean,
  id?: string,
  displayName?: string,
  image?: string
};

export type ErrorsState = ErrorType[];

export interface AppState {
  quest: QuestType;
  dirty: DirtyState;
  user: UserState;
  dialogs: DialogsState;
  errors: ErrorsState;
}