/* eslint-disable */
const selectors = {
  generalInformation: {
    name: 'puppeteertest1'
  },
  passwordChange: {
    modifyPasswordButton:
      '#root > div > div.root-child > div > div.app-child > div > div.app-content > div > div > div > div > div.col-sm-9.col-xs-12 > div > div:nth-child(4) > div > button' /* eslint-disable */,
    saveNewPassword:
      '#root > div > div.root-child > div > div.app-child > div > div.app-content > div > div > div > div > div.col-sm-9.col-xs-12 > div > div:nth-child(4) > div > div > button' /* eslint-disable */,
    actualPasswordPlaceholder: 'Mot de passe actuel*',
    newPasswordPlaceholder: 'Nouveau mot de passe*',
    confirmNewPasswordPlaceholder: 'Retaper le mot de passe*'
  },
  deleteAccount: {
    confirmDelete:
      '#root > div > div.root-child > div > div.app-child > div > div.app-content > div > div > div > div > div.col-sm-9.col-xs-12 > div > div:nth-child(5) > div > form > div.center.margin-l > button' /* eslint-disable */,
    checkbox:
      '#root > div > div.root-child > div > div.app-child > div > div.app-content > div > div > div > div > div.col-sm-9.col-xs-12 > div > div:nth-child(5) > div > form > div.form-group > div > label > input[type="checkbox"]' /* eslint-disable */,
    validationButton:
      'body > div:nth-child(18) > div.fade.in.modal > div > div > div.modal-footer > button.button-submit.button-dark.btn.btn-default' /* eslint-disable */
  },
  newRessource: {
    pageTitlePlaceholder: 'Titre de la page',
    imagePath: '/Users/felix/projects/assembl/assembl/static2/tests/e2e/images/imageupload.jpg',
    imagePath2: '/Users/felix/projects/assembl/assembl/static2/tests/e2e/images/imageupload2.jpeg',
    addRessourceButton: '#add-media-button' /* eslint-disable */,
    addSecondRessourceButton: '#add-media-button',
    inputSecondRessource:
      '#root > div > div.root-child > div > div.app-child > div > div.app-content > div > div.max-container > div > div > div.col-md-8.col-xs-12 > div > div:nth-child(4) > div.form-container.edit--355846 > input',
    fistMediaTitle: '#media-title-0',
    secondMediaTitle: '#media-title-1',
    videoTextPlaceholder: 'Vidéo/Slides',
    saveButton: '#save-button > span > button'
  },
  modifyRessource: {
    mediaTitlePlaceholder: ''
  },
  landingPage: {
    headerTitle:
      '#root > div > div.root-child > div > div.app-child > div > div.app-content > div > section.home-section.header-section > div.max-container.container-fluid > div > div > h1',
    headerSubtitle:
      '#root > div > div.root-child > div > div.app-child > div > div.app-content > div > section.home-section.header-section > div.max-container.container-fluid > div > div > h4',
    titleVideoSection:
      '#root > div > div.root-child > div > div.app-child > div > div.app-content > div > section.home-section.video-section > div > div > div.title-section > h1',
    TitleTwitterSection:
      '#root > div > div.root-child > div > div.app-child > div > div.app-content > div > section.home-section.twitter-section > div > div > div > div > div > div > div.title-section > h1'
  },
  voteSession: {
    voteSessionMenu:
      '#root > div > div.root-child > div > div.app-child > div > div.app-content > div > div.max-container > div > div > div.col-md-3.col-xs-12 > div > ul > li:nth-child(8)',
    headerTitlePlaceholder: 'Titre du bandeau FR*',
    headerSubtitlePlaceholder: 'Sous-titre du bandeau FR',
    consigneTitlePlaceholder: 'Titre de la consigne FR*',
    sectionTitlePlaceholder: 'Titre de la section FR*',
    nextSectionArrow:
      '#root > div > div.root-child > div > div.app-child > div > div.app-content > div > div.max-container > div > div > div.col-md-8.col-xs-12 > div > div.admin-navbar > div:nth-child(2) > div > div',
    sectionOneSaveButton: '.save-button',
    tokenCheckbox:
      '#root > div > div.root-child > div > div.app-child > div > div.app-content > div > div.max-container > div > div > div.col-md-8.col-xs-12 > div > div.admin-box > div.admin-content > div > div > div:nth-child(1) > label > div',
    tokenConsignePlaceholder: 'Consigne du vote par jetons*',
    tokenNumberSelectionDropdown: '#input-dropdown-addon',
    firstTokenName: '#type-form-0 > div > div:nth-child(1) > input',
    firstTokenNumber: '#type-form-0 > div > div:nth-child(2) > input',
    tokenNumberSelection:
      '#root > div > div.root-child > div > div.app-child > div > div.app-content > div > div.max-container > div > div > div.col-md-8.col-xs-12 > div > div.admin-box > div.admin-content > div > div > div.token-vote-form > form > div:nth-child(4) > div > ul > li:nth-child(2) > a',
    colorSelector: '',
    secondTokenName: '#type-form-1 > div > div:nth-child(1) > input',
    secondTokenNumber: '#type-form-1 > div > div:nth-child(2) > input',
    secondTokenColorSelector: '',
    evolutionCheckbox: '#seeCurrentVotes',
    addPropositionButton:
      '#root > div > div.root-child > div > div.app-child > div > div.app-content > div > div.max-container > div > div > div.col-md-8.col-xs-12 > div > div.vote-proposals-section > div > div.admin-content > form > div.plus.margin-l',
    propositionTitle: '#proposal-form-1 > div:nth-child(3) > input',
    propositionDescription:
      '#proposal-form-1 > div:nth-child(4) > div > div:nth-child(2) > div > div.DraftEditor-editorContainer > div',
    secondPropositionTitle: '#proposal-form-2 > div:nth-child(3) > input',
    secondPropositionDescription:
      '#proposal-form-2 > div:nth-child(4) > div > div:nth-child(2) > div > div.DraftEditor-editorContainer > div',
    phaseTrash:
      '#root > div > div.root-child > div > div.app-child > div > div.app-content > div > div.max-container > div > div > div.col-md-8.col-xs-12 > div > div > div:nth-child(3) > div.form-container > form > div:nth-child(4) > div.flex.phase-title-form > div.flex > button:nth-child(2) > span'
  }
};
export default selectors;
