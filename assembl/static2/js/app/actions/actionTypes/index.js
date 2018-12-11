/* redux action types */
// @flow
import { type moment } from 'moment';
import { type AdminActions } from './admin';

export const UPDATE_CONTENT_LOCALE_BY_ID: 'UPDATE_CONTENT_LOCALE_BY_ID' = 'UPDATE_CONTENT_LOCALE_BY_ID';
export const UPDATE_CONTENT_LOCALE_BY_ORIGINAL_LOCALE: 'UPDATE_CONTENT_LOCALE_BY_ORIGINAL_LOCALE' =
  'UPDATE_CONTENT_LOCALE_BY_ORIGINAL_LOCALE';
export const UPDATE_CONTENT_LOCALE: 'UPDATE_CONTENT_LOCALE' = 'UPDATE_CONTENT_LOCALE';
export const UPDATE_SECTIONS: 'UPDATE_SECTIONS' = 'UPDATE_SECTIONS';
export const UPDATE_SECTION_TITLE: 'UPDATE_SECTION_TITLE' = 'UPDATE_SECTION_TITLE';
export const UPDATE_SECTION_URL: 'UPDATE_SECTION_URL' = 'UPDATE_SECTION_URL';
export const TOGGLE_EXTERNAL_PAGE: 'TOGGLE_EXTERNAL_PAGE' = 'TOGGLE_EXTERNAL_PAGE';
export const CREATE_SECTION: 'CREATE_SECTION' = 'CREATE_SECTION';
export const DELETE_SECTION: 'DELETE_SECTION' = 'DELETE_SECTION';
export const MOVE_UP_SECTION: 'MOVE_UP_SECTION' = 'MOVE_UP_SECTION';
export const MOVE_DOWN_SECTION: 'MOVE_DOWN_SECTION' = 'MOVE_DOWN_SECTION';
export const UPDATE_LEGAL_NOTICE_ENTRY: 'UPDATE_LEGAL_NOTICE_ENTRY' = 'UPDATE_LEGAL_NOTICE_ENTRY';
export const UPDATE_TERMS_AND_CONDITIONS_ENTRY: 'UPDATE_TERMS_AND_CONDITIONS_ENTRY' = 'UPDATE_TERMS_AND_CONDITIONS_ENTRY';
export const UPDATE_LEGAL_CONTENTS: 'UPDATE_LEGAL_CONTENTS' = 'UPDATE_LEGAL_CONTENTS';
export const UPDATE_COOKIES_POLICY_ENTRY: 'UPDATE_COOKIES_POLICY_ENTRY' = 'UPDATE_COOKIES_POLICY_ENTRY';
export const UPDATE_PRIVACY_POLICY_ENTRY: 'UPDATE_PRIVACY_POLICY_ENTRY' = 'UPDATE_PRIVACY_POLICY_ENTRY';
export const UPDATE_VOTE_SESSION_PAGE: 'UPDATE_VOTE_SESSION_PAGE' = 'UPDATE_VOTE_SESSION_PAGE';
export const UPDATE_VOTE_SESSION_PAGE_TITLE: 'UPDATE_VOTE_SESSION_PAGE_TITLE' = 'UPDATE_VOTE_SESSION_PAGE_TITLE';
export const UPDATE_VOTE_SESSION_PAGE_SEECURRENTVOTES: 'UPDATE_VOTE_SESSION_PAGE_SEECURRENTVOTES' =
  'UPDATE_VOTE_SESSION_PAGE_SEECURRENTVOTES';
export const UPDATE_VOTE_SESSION_PAGE_SUBTITLE: 'UPDATE_VOTE_SESSION_PAGE_SUBTITLE' = 'UPDATE_VOTE_SESSION_PAGE_SUBTITLE';
export const UPDATE_VOTE_SESSION_PAGE_INSTRUCTIONS_TITLE: 'UPDATE_VOTE_SESSION_PAGE_INSTRUCTIONS_TITLE' =
  'UPDATE_VOTE_SESSION_PAGE_INSTRUCTIONS_TITLE';
export const UPDATE_VOTE_SESSION_PAGE_INSTRUCTIONS_CONTENT: 'UPDATE_VOTE_SESSION_PAGE_INSTRUCTIONS_CONTENT' =
  'UPDATE_VOTE_SESSION_PAGE_INSTRUCTIONS_CONTENT';
export const UPDATE_VOTE_SESSION_PAGE_PROPOSITIONS_TITLE: 'UPDATE_VOTE_SESSION_PAGE_PROPOSITIONS_TITLE' =
  'UPDATE_VOTE_SESSION_PAGE_PROPOSITIONS_TITLE';
export const UPDATE_VOTE_SESSION_PAGE_IMAGE: 'UPDATE_VOTE_SESSION_PAGE_IMAGE' = 'UPDATE_VOTE_SESSION_PAGE_IMAGE';
export const UPDATE_VOTE_MODULES: 'UPDATE_VOTE_MODULES' = 'UPDATE_VOTE_MODULES';
export const CREATE_TOKEN_VOTE_MODULE: 'CREATE_TOKEN_VOTE_MODULE' = 'CREATE_TOKEN_VOTE_MODULE';
export const DELETE_VOTE_MODULE: 'DELETE_VOTE_MODULE' = 'DELETE_VOTE_MODULE';
export const CREATE_GAUGE_VOTE_MODULE: 'CREATE_GAUGE_VOTE_MODULE' = 'CREATE_GAUGE_VOTE_MODULE';
export const UPDATE_TOKEN_VOTE_INSTRUCTIONS: 'UPDATE_TOKEN_VOTE_INSTRUCTIONS' = 'UPDATE_TOKEN_VOTE_INSTRUCTIONS';
export const CREATE_TOKEN_VOTE_CATEGORY: 'CREATE_TOKEN_VOTE_CATEGORY' = 'CREATE_TOKEN_VOTE_CATEGORY';
export const DELETE_TOKEN_VOTE_CATEGORY: 'DELETE_TOKEN_VOTE_CATEGORY' = 'DELETE_TOKEN_VOTE_CATEGORY';
export const UPDATE_TOKEN_VOTE_EXCLUSIVE_CATEGORY: 'UPDATE_TOKEN_VOTE_EXCLUSIVE_CATEGORY' =
  'UPDATE_TOKEN_VOTE_EXCLUSIVE_CATEGORY';
export const UPDATE_TOKEN_VOTE_CATEGORY_TITLE: 'UPDATE_TOKEN_VOTE_CATEGORY_TITLE' = 'UPDATE_TOKEN_VOTE_CATEGORY_TITLE';
export const UPDATE_TOKEN_VOTE_CATEGORY_COLOR: 'UPDATE_TOKEN_VOTE_CATEGORY_COLOR' = 'UPDATE_TOKEN_VOTE_CATEGORY_COLOR';
export const UPDATE_TOKEN_TOTAL_NUMBER: 'UPDATE_TOKEN_TOTAL_NUMBER' = 'UPDATE_TOKEN_TOTAL_NUMBER';
export const UPDATE_GAUGE_VOTE_INSTRUCTIONS: 'UPDATE_GAUGE_VOTE_INSTRUCTIONS' = 'UPDATE_GAUGE_VOTE_INSTRUCTIONS';
export const UPDATE_GAUGE_VOTE_NUMBER_TICKS: 'UPDATE_GAUGE_VOTE_NUMBER_TICKS' = 'UPDATE_GAUGE_VOTE_NUMBER_TICKS';
export const UPDATE_GAUGE_VOTE_IS_NUMBER: 'UPDATE_GAUGE_VOTE_IS_NUMBER' = 'UPDATE_GAUGE_VOTE_IS_NUMBER';
export const CREATE_GAUGE_VOTE_CHOICE: 'CREATE_GAUGE_VOTE_CHOICE' = 'CREATE_GAUGE_VOTE_CHOICE';
export const DELETE_GAUGE_VOTE_CHOICE: 'DELETE_GAUGE_VOTE_CHOICE' = 'DELETE_GAUGE_VOTE_CHOICE';
export const UPDATE_GAUGE_VOTE_CHOICE_LABEL: 'UPDATE_GAUGE_VOTE_CHOICE_LABEL' = 'UPDATE_GAUGE_VOTE_CHOICE_LABEL';
export const UPDATE_GAUGE_MINIMUM: 'UPDATE_GAUGE_MINIMUM' = 'UPDATE_GAUGE_MINIMUM';
export const UPDATE_GAUGE_MAXIMUM: 'UPDATE_GAUGE_MAXIMUM' = 'UPDATE_GAUGE_MAXIMUM';
export const UPDATE_GAUGE_UNIT: 'UPDATE_GAUGE_UNIT' = 'UPDATE_GAUGE_UNIT';
export const CREATE_LANDING_PAGE_MODULE: 'CREATE_LANDING_PAGE_MODULE' = 'CREATE_LANDING_PAGE_MODULE';
export const UPDATE_LANDING_PAGE_MODULES: 'UPDATE_LANDING_PAGE_MODULES' = 'UPDATE_LANDING_PAGE_MODULES';
export const TOGGLE_LANDING_PAGE_MODULE: 'TOGGLE_LANDING_PAGE_MODULE' = 'TOGGLE_LANDING_PAGE_MODULE';
export const MOVE_LANDING_PAGE_MODULE_UP: 'MOVE_LANDING_PAGE_MODULE_UP' = 'MOVE_LANDING_PAGE_MODULE_UP';
export const MOVE_LANDING_PAGE_MODULE_DOWN: 'MOVE_LANDING_PAGE_MODULE_DOWN' = 'MOVE_LANDING_PAGE_MODULE_DOWN';
export const UPDATE_VOTE_PROPOSALS: 'UPDATE_VOTE_PROPOSALS' = 'UPDATE_VOTE_PROPOSALS';
export const CREATE_VOTE_PROPOSAL: 'CREATE_VOTE_PROPOSAL' = 'CREATE_VOTE_PROPOSAL';
export const DELETE_VOTE_PROPOSAL: 'DELETE_VOTE_PROPOSAL' = 'DELETE_VOTE_PROPOSAL';
export const UPDATE_VOTE_PROPOSAL_TITLE: 'UPDATE_VOTE_PROPOSAL_TITLE' = 'UPDATE_VOTE_PROPOSAL_TITLE';
export const UPDATE_VOTE_PROPOSAL_DESCRIPTION: 'UPDATE_VOTE_PROPOSAL_DESCRIPTION' = 'UPDATE_VOTE_PROPOSAL_DESCRIPTION';
export const MOVE_PROPOSAL_UP: 'MOVE_PROPOSAL_UP' = 'MOVE_PROPOSAL_UP';
export const MOVE_PROPOSAL_DOWN: 'MOVE_PROPOSAL_DOWN' = 'MOVE_PROPOSAL_DOWN';
export const ADD_MODULE_TO_PROPOSAL: 'ADD_MODULE_TO_PROPOSAL' = 'ADD_MODULE_TO_PROPOSAL';
export const UNDELETE_MODULE: 'UNDELETE_MODULE' = 'UNDELETE_MODULE';
export const MARK_ALL_DEPENDENCIES_AS_CHANGED: 'MARK_ALL_DEPENDENCIES_AS_CHANGED' = 'MARK_ALL_DEPENDENCIES_AS_CHANGED';
export const SET_VALIDATION_ERRORS: 'SET_VALIDATION_ERRORS' = 'SET_VALIDATION_ERRORS';
export const CANCEL_MODULE_CUSTOMIZATION: 'CANCEL_MODULE_CUSTOMIZATION' = 'CANCEL_MODULE_CUSTOMIZATION';
export const UPDATE_VOTE_MODULE: 'UPDATE_VOTE_MODULE' = 'UPDATE_VOTE_MODULE';
export const CREATE_PHASE: 'CREATE_PHASE' = 'CREATE_PHASE';
export const UPDATE_PHASES: 'UPDATE_PHASES' = 'UPDATE_PHASES';
export const DELETE_PHASE: 'DELETE_PHASE' = 'DELETE_PHASE';
export const UPDATE_PHASE_TITLE: 'UPDATE_PHASE_TITLE' = 'UPDATE_PHASE_TITLE';
export const UPDATE_PHASE_DESCRIPTION: 'UPDATE_PHASE_DESCRIPTION' = 'UPDATE_PHASE_DESCRIPTION';
export const UPDATE_PHASE_IDENTIFIER: 'UPDATE_PHASE_IDENTIFIER' = 'UPDATE_PHASE_IDENTIFIER';
export const UPDATE_PHASE_IMAGE: 'UPDATE_PHASE_IMAGE' = 'UPDATE_PHASE_IMAGE';
export const UPDATE_PHASE_START: 'UPDATE_PHASE_START' = 'UPDATE_PHASE_START';
export const UPDATE_PHASE_END: 'UPDATE_PHASE_END' = 'UPDATE_PHASE_END';
export const UPDATE_IS_THEMATICS_TABLE: 'UPDATE_IS_THEMATICS_TABLE' = 'UPDATE_IS_THEMATICS_TABLE';
export const MOVE_PHASE_UP: 'MOVE_PHASE_UP' = 'MOVE_PHASE_UP';
export const MOVE_PHASE_DOWN: 'MOVE_PHASE_DOWN' = 'MOVE_PHASE_DOWN';
export const UPDATE_LANDING_PAGE_MODULE_TITLE: 'UPDATE_LANDING_PAGE_MODULE_TITLE' = 'UPDATE_LANDING_PAGE_MODULE_TITLE';
export const UPDATE_LANDING_PAGE_MODULE_SUBTITLE: 'UPDATE_LANDING_PAGE_MODULE_SUBTITLE' = 'UPDATE_LANDING_PAGE_MODULE_SUBTITLE';

export type UpdateContentLocaleById = {
  type: typeof UPDATE_CONTENT_LOCALE_BY_ID,
  id: string,
  value: string
};

export type UpdateContentLocaleByOriginalLocale = {
  type: typeof UPDATE_CONTENT_LOCALE_BY_ORIGINAL_LOCALE,
  originalLocale: string,
  value: string
};

export type ContentLocaleInfo = {
  contentLocale: string,
  originalLocale: string
};

export type ContentLocaleMapping = {
  [string]: ContentLocaleInfo
};

export type UpdateContentLocale = {
  type: typeof UPDATE_CONTENT_LOCALE,
  data: ContentLocaleMapping
};

export type SectionInfo = {
  id: string
};

export type SectionsArray = Array<SectionInfo>;

export type UpdateSections = {
  sections: SectionsArray,
  type: typeof UPDATE_SECTIONS
};

export type UpdateSectionTitle = {
  id: string,
  locale: string,
  value: string,
  type: typeof UPDATE_SECTION_TITLE
};

export type UpdateSectionUrl = {
  id: string,
  value: string,
  type: typeof UPDATE_SECTION_URL
};

export type ToggleExternalPage = {
  id: string,
  type: typeof TOGGLE_EXTERNAL_PAGE
};

export type CreateSection = {
  id: string,
  order: number,
  type: typeof CREATE_SECTION
};

export type DeleteSection = {
  id: string,
  type: typeof DELETE_SECTION
};

export type UpSection = {
  id: string,
  type: typeof MOVE_UP_SECTION
};

export type DownSection = {
  id: string,
  type: typeof MOVE_DOWN_SECTION
};

export type UpdateLegalNoticeEntry = {
  type: typeof UPDATE_LEGAL_NOTICE_ENTRY,
  locale: string,
  value: string
};

export type UpdateTermsAndConditionsEntry = {
  type: typeof UPDATE_TERMS_AND_CONDITIONS_ENTRY,
  locale: string,
  value: string
};

export type UpdateCookiesPolicyEntry = {
  type: typeof UPDATE_COOKIES_POLICY_ENTRY,
  locale: string,
  value: string
};

export type UpdatePrivacyPolicyEntry = {
  type: typeof UPDATE_PRIVACY_POLICY_ENTRY,
  locale: string,
  value: string
};

export type UpdateLegalContents = {
  legalNoticeEntries: Array<LangStringEntryInput>,
  termsAndConditionsEntries: Array<LangStringEntryInput>,
  cookiesPolicyEntries: Array<LangStringEntryInput>,
  privacyPolicyEntries: Array<LangStringEntryInput>,
  type: typeof UPDATE_LEGAL_CONTENTS
};

export type UpdateVoteSessionPageTitle = {
  locale: string,
  value: string,
  type: typeof UPDATE_VOTE_SESSION_PAGE_TITLE
};

export type UpdateVoteSessionPageSeeCurrentVotes = {
  value: string,
  type: typeof UPDATE_VOTE_SESSION_PAGE_SEECURRENTVOTES
};

export type UpdateVoteSessionPageSubtitle = {
  locale: string,
  value: string,
  type: typeof UPDATE_VOTE_SESSION_PAGE_SUBTITLE
};

export type UpdateVoteSessionPageInstructionsTitle = {
  locale: string,
  value: string,
  type: typeof UPDATE_VOTE_SESSION_PAGE_INSTRUCTIONS_TITLE
};

export type UpdateVoteSessionPageInstructionsContent = {
  locale: string,
  value: string,
  type: typeof UPDATE_VOTE_SESSION_PAGE_INSTRUCTIONS_CONTENT
};

export type UpdateVoteSessionPagePropositionsTitle = {
  locale: string,
  value: string,
  type: typeof UPDATE_VOTE_SESSION_PAGE_PROPOSITIONS_TITLE
};

export type UpdateVoteSessionHeaderImage = {
  value: File,
  type: typeof UPDATE_VOTE_SESSION_PAGE_IMAGE
};

export type UpdateVoteSessionPage = {
  titleEntries: Array<LangStringEntryInput>,
  seeCurrentVotes: boolean,
  subTitleEntries: Array<LangStringEntryInput>,
  instructionsSectionTitleEntries: Array<LangStringEntryInput>,
  instructionsSectionContentEntries: Array<LangStringEntryInput>,
  propositionsSectionTitleEntries: Array<LangStringEntryInput>,
  headerImage: File | null,
  type: typeof UPDATE_VOTE_SESSION_PAGE
};

export type ModuleInfo = {
  id: string
};

export type VoteModulesArray = Array<ModuleInfo>;

export type VoteProposalInfo = {
  id: string
};

export type VoteProposalsArray = Array<VoteProposalInfo>;

export type UpdateVoteModules = {
  voteModules: VoteModulesArray,
  type: typeof UPDATE_VOTE_MODULES
};

export type CreateTokenVoteModule = {
  id: string,
  type: typeof CREATE_TOKEN_VOTE_MODULE
};

export type DeleteVoteModule = {
  id: string,
  type: typeof DELETE_VOTE_MODULE
};

export type CreateGaugeVoteModule = {
  id: string,
  type: typeof CREATE_GAUGE_VOTE_MODULE
};

export type UpdateTokenVoteExclusiveCategory = {
  id: string,
  value: boolean,
  type: typeof UPDATE_TOKEN_VOTE_EXCLUSIVE_CATEGORY
};

export type UpdateTokenVoteInstructions = {
  id: string,
  locale: string,
  value: string,
  type: typeof UPDATE_TOKEN_VOTE_INSTRUCTIONS
};

export type CreateTokenVoteCategory = {
  id: string,
  moduleId: string,
  type: typeof CREATE_TOKEN_VOTE_CATEGORY
};

export type DeleteTokenVoteCategory = {
  moduleId: string,
  index: number,
  type: typeof DELETE_TOKEN_VOTE_CATEGORY
};

export type UpdateTokenVoteCategoryTitle = {
  moduleId: string,
  id: string,
  locale: string,
  value: string,
  type: typeof UPDATE_TOKEN_VOTE_CATEGORY_TITLE
};

export type UpdateTokenTotalNumber = {
  moduleId: string,
  id: string,
  value: number,
  type: typeof UPDATE_TOKEN_TOTAL_NUMBER
};

export type UpdateTokenVoteCategoryColor = {
  moduleId: string,
  id: string,
  value: string,
  type: typeof UPDATE_TOKEN_VOTE_CATEGORY_COLOR
};

export type UpdateVoteProposals = {
  voteProposals: VoteProposalsArray,
  type: typeof UPDATE_VOTE_PROPOSALS
};

export type CreateVoteProposal = {
  id: string,
  type: typeof CREATE_VOTE_PROPOSAL
};

export type DeleteVoteProposal = {
  id: string,
  type: typeof DELETE_VOTE_PROPOSAL
};

export type UpdateVoteProposalTitle = {
  id: string,
  locale: string,
  value: string,
  type: typeof UPDATE_VOTE_PROPOSAL_TITLE
};

export type UpdateVoteProposalDescription = {
  id: string,
  locale: string,
  value: string,
  type: typeof UPDATE_VOTE_PROPOSAL_DESCRIPTION
};

export type MoveProposalUp = {
  id: string,
  type: typeof MOVE_PROPOSAL_UP
};

export type MoveProposalDown = {
  id: string,
  type: typeof MOVE_PROPOSAL_DOWN
};

export type toggleLandingPageModule = {
  id: string,
  type: typeof TOGGLE_LANDING_PAGE_MODULE
};

type LandingPageModuleInfo = {
  id: string
};
export type LandingPageModules = Array<LandingPageModuleInfo>;
export type UpdateLandingPageModules = {
  modules: LandingPageModules,
  type: typeof UPDATE_LANDING_PAGE_MODULES
};

export type createLandingPageModule = {
  id: string,
  identifier: string,
  order: number,
  numberOfDuplicatesModules: number,
  title: string,
  type: typeof CREATE_LANDING_PAGE_MODULE
};

export type MoveLandingPageModuleUp = {
  id: string,
  type: typeof MOVE_LANDING_PAGE_MODULE_UP
};

export type MoveLandingPageModuleDown = {
  id: string,
  type: typeof MOVE_LANDING_PAGE_MODULE_DOWN
};

export type UpdateLandingPageModuleTitle = {
  id: string,
  locale: string,
  value: string,
  type: typeof UPDATE_LANDING_PAGE_MODULE_TITLE
};

export type UpdateLandingPageModuleSubtitle = {
  id: string,
  locale: string,
  value: string,
  type: typeof UPDATE_LANDING_PAGE_MODULE_SUBTITLE
};

export type UpdateGaugeVoteInstructions = {
  id: string,
  locale: string,
  value: string,
  type: typeof UPDATE_GAUGE_VOTE_INSTRUCTIONS
};

export type UpdateGaugeVoteNbTicks = {
  id: string,
  value: number,
  type: typeof UPDATE_GAUGE_VOTE_NUMBER_TICKS
};

export type UpdateGaugeVoteIsNumber = {
  id: string,
  value: boolean,
  type: typeof UPDATE_GAUGE_VOTE_IS_NUMBER
};

export type CreateGaugeVoteChoice = {
  moduleId: string,
  id: string,
  type: typeof CREATE_GAUGE_VOTE_CHOICE
};

export type DeleteGaugeVoteChoice = {
  moduleId: string,
  index: number,
  type: typeof DELETE_GAUGE_VOTE_CHOICE
};

export type UpdateGaugeVoteChoiceLabel = {
  moduleId: string,
  id: string,
  locale: string,
  value: string,
  type: typeof UPDATE_GAUGE_VOTE_CHOICE_LABEL
};

export type UpdateGaugeMinimum = {
  id: string,
  value: number,
  type: typeof UPDATE_GAUGE_MINIMUM
};

export type UpdateGaugeMaximum = {
  id: string,
  value: number,
  type: typeof UPDATE_GAUGE_MAXIMUM
};

export type UpdateGaugeUnit = {
  id: string,
  value: string,
  type: typeof UPDATE_GAUGE_UNIT
};

export type AddModuleToProposal = {
  id: string,
  voteSpecTemplateId: string,
  proposalId: string,
  type: typeof ADD_MODULE_TO_PROPOSAL
};

export type UndeleteModule = {
  id: string,
  type: typeof UNDELETE_MODULE
};

export type MarkAllDependenciesAsChanged = {
  id: string,
  type: typeof MARK_ALL_DEPENDENCIES_AS_CHANGED
};

export type SetValidationErrors = {
  errors: ValidationErrors,
  id: string,
  type: typeof SET_VALIDATION_ERRORS
};

export type CancelModuleCustomization = {
  id: string,
  type: typeof CANCEL_MODULE_CUSTOMIZATION
};

export type CustomizeVoteModule = {
  id: string,
  info: { [string]: any },
  locale: string,
  type: typeof UPDATE_VOTE_MODULE
};

export type CreatePhase = {
  id: string,
  type: typeof CREATE_PHASE
};

export type PhaseInfo = {
  id: string
};

export type PhasesArray = Array<PhaseInfo>;

export type UpdatePhases = {
  phases: PhasesArray,
  type: typeof UPDATE_PHASES
};

export type DeletePhase = {
  id: string,
  type: typeof DELETE_PHASE
};

export type UpdatePhaseTitle = {
  id: string,
  locale: string,
  value: string,
  type: typeof UPDATE_PHASE_TITLE
};

export type UpdatePhaseDescription = {
  id: string,
  locale: string,
  value: string,
  type: typeof UPDATE_PHASE_DESCRIPTION
};

export type UpdatePhaseIdentifier = {
  id: string,
  value: string,
  type: typeof UPDATE_PHASE_IDENTIFIER
};

export type UpdatePhaseImage = {
  id: string,
  value: File,
  type: typeof UPDATE_PHASE_IMAGE
};

export type UpdatePhaseStart = {
  id: string,
  value: moment,
  type: typeof UPDATE_PHASE_START
};

export type UpdatePhaseEnd = {
  id: string,
  value: moment,
  type: typeof UPDATE_PHASE_END
};

export type UpdateIsThematicsTable = {
  id: string,
  value: boolean,
  type: typeof UPDATE_IS_THEMATICS_TABLE
};

export type MovePhaseUp = {
  id: string,
  type: typeof MOVE_PHASE_UP
};

export type MovePhaseDown = {
  id: string,
  type: typeof MOVE_PHASE_DOWN
};

type BasicAction = {
  type: string
};

// TODO: create type for all possible action types

type LegalContentsActions = UpdateLegalNoticeEntry | UpdateTermsAndConditionsEntry | UpdateLegalContents;

type SectionActions = CreateSection | DeleteSection | UpSection | DownSection;

type TimelineActions =
  | CreatePhase
  | UpdatePhases
  | DeletePhase
  | UpdatePhaseTitle
  | UpdatePhaseIdentifier
  | UpdatePhaseStart
  | UpdatePhaseEnd
  | UpdateIsThematicsTable
  | MovePhaseUp
  | MovePhaseDown;

type VoteSessionActions =
  | UpdateVoteSessionPageTitle
  | UpdateVoteSessionPageSeeCurrentVotes
  | UpdateVoteSessionPageSubtitle
  | UpdateVoteSessionPageInstructionsTitle
  | UpdateVoteSessionPageInstructionsContent
  | UpdateVoteSessionPagePropositionsTitle
  | UpdateVoteSessionHeaderImage
  | UpdateVoteModules
  | DeleteVoteModule
  | CreateTokenVoteModule
  | CreateGaugeVoteModule
  | UpdateTokenVoteInstructions
  | CreateTokenVoteCategory
  | DeleteTokenVoteCategory
  | UpdateTokenVoteCategoryTitle
  | UpdateTokenTotalNumber
  | UpdateTokenVoteCategoryColor
  | UpdateVoteProposals
  | CreateVoteProposal
  | DeleteVoteProposal
  | UpdateVoteProposalTitle
  | UpdateVoteProposalDescription
  | MoveProposalUp
  | MoveProposalDown
  | UpdateGaugeVoteNbTicks
  | UpdateGaugeVoteIsNumber
  | CreateGaugeVoteChoice
  | DeleteGaugeVoteChoice
  | UpdateGaugeVoteChoiceLabel
  | UpdateGaugeMinimum
  | UpdateGaugeMaximum
  | UpdateGaugeUnit
  | AddModuleToProposal
  | UpdateGaugeVoteInstructions
  | UndeleteModule
  | MarkAllDependenciesAsChanged
  | SetValidationErrors
  | CustomizeVoteModule;

export type Action =
  | UpdateContentLocaleById
  | UpdateContentLocaleByOriginalLocale
  | LegalContentsActions
  | SectionActions
  | VoteSessionActions
  | AdminActions
  | TimelineActions
  | BasicAction;