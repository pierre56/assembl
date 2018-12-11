/* @flow */
/* eslint-disable */
import { type EditorState } from 'draft-js';
import Immutable from 'immutable';

/* temporary dummy types */
type RawDraftContentState = {
  blocks: Array<Object>,
  entityMap: { [key: string]: Object }
};
type DraftBlockType = string;
type DraftInlineStyle = Immutable.OrderedSet<string>;
/* end temporary dummy types */

export type IdeaMessageColumns = Array<IdeaMessageColumnFragment>;

export type TreeItem = {
  id: string,
  children?: Array<TreeItem>
};

export type Idea = {
  id: string,
  parentId: string,
  title: string,
  description: string,
  img: Object,
  numChildren: number,
  numContributors: number,
  numPosts: number,
  order: number,
  ancestors: Array<string>,
  posts: Posts,
  messageColumns: IdeaMessageColumns
};

type Post = { ...PostFragment } & {
  messageClassifier: ?string,
  creationDate: string,
  parentId: number
};

type FictionPostPreview = {
  id: string,
  dbId: number,
  subject: ?string,
  body: ?string,
  creationDate: string,
  creator: ?{|
    userId: string,
    displayName: ?string,
    isDeleted: ?boolean
  |},
  publicationState: string
};

type EditableDocument = DocumentFragment & {
  file?: File
};

type LangstringEntry = {
  localeCode: string,
  value: string
};

type LangstringEntries = Array<LangstringEntry>;

type RichTextLangstringEntry = {
  localeCode: string,
  value: EditorState
};
type RichTextLangstringEntries = Array<RichTextLangstringEntry>;

type TitleEntries = {
  titleEntries: LangstringEntries
};

type RouterParams = {
  phase: string,
  slug: string,
  themeId: string
};

type Chatbot = TitleEntries & {
  link: string,
  name: string
};

type Partner = {
  link: string,
  logo: string,
  name: string
};

type Phase = Object; // TODO

type SocialMedia = {
  name: string,
  url: string
};

type Timeline = Array<Phase>;

type DebateVideo = {
  titleEntries: null | { [string]: string },
  descriptionEntriesTop: null | { [string]: string },
  videoUrl: null | string
};

type DebateData = Object & {
  chatbot: Chatbot,
  chatframe: any, // TODO
  dates: {
    endDate: string,
    startDate: string
  },
  headerBackgroundUrl: string,
  headerLogoUrl: ?string,
  helpUrl: string,
  identifier: string,
  introduction: TitleEntries,
  logo: string,
  objectives: TitleEntries & {
    descriptionEntries: LangstringEntries,
    images: { img1Url: string, img2Url: string }
  },
  partners: Array<Partner>,
  slug: string,
  socialMedias: Array<SocialMedia>,
  termsOfUseUrl: ?string,
  timeline: Timeline,
  topic: TitleEntries,
  translationEnabled: boolean,
  translationEnabled: boolean,
  twitter: { backgroundImageUrl: string, id: string },
  useSocialMedia: boolean,
  video: DebateVideo,
  customHtmlCodeLandingPage: ?string,
  customHtmlCodeRegistrationPage: ?string
};

type ErrorDef = {
  code: string,
  vars: { [string]: any }
};

type ValidationErrors = { [string]: Array<ErrorDef> };

type TextFragmentIdentifier = {
  xpathStart: string,
  xpathEnd: string,
  offsetStart: number,
  offsetEnd: number
};

type Tag = {
  id: string,
  value: string
};

type Extract = {
  textFragmentIdentifiers: Array<TextFragmentIdentifier>,
  id: string,
  creationDate: string,
  important: boolean,
  extractNature: string,
  extractAction: string,
  extractState: string,
  body: string,
  creator: AgentProfileInfoFragment,
  tags: Array<Tag>
};

type FieldIdentifier = 'EMAIL' | 'FULLNAME' | 'PASSWORD' | 'PASSWORD2' | 'USERNAME' | 'CUSTOM';

type SelectFieldOption = { label: string, id: string };

type ConfigurableField = {
  fieldType: string,
  id: string,
  identifier: FieldIdentifier,
  order: number,
  required: boolean,
  hidden: boolean,
  title: string,
  options?: Array<SelectFieldOption>,
  __typename: string
};

type OverlayPlacement = 'top' | 'right' | 'bottom' | 'left';

type RouterPath = {
  action: string,
  hash?: string,
  key: string,
  pathname: string,
  query?: { [key: string]: any },
  search: string
};

type StrictFile =
  | {
      externalUrl: ?File,
      mimeType: ?string,
      title: ?string
    }
  | {
      externalUrl: ?string,
      mimeType: ?string,
      title: ?string
    };
