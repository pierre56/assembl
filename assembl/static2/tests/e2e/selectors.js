/* eslint-disable */
const selectors = {
  generalInformation: {
    name: 'puppeteertest1',
    email: 'testassembl@gmail.com',
    password: 'coucou',
    newPassword: 'newpassword'
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
    addRessourceButton:
      '#root > div > div.root-child > div > div.app-child > div > div.app-content > div > div.max-container > div > div > div.col-md-8.col-xs-12 > div > div:nth-child(4) > div' /* eslint-disable */,
    mediaTitlePlaceholder: 'Titre*',
    videoTextPlaceholder: 'Vidéo/Slides',
    saveButton:
      '#root > div > div.root-child > div > div.app-child > div > div.app-content > div > div.max-container > div > div > div.col-md-8.col-xs-12 > div > button' /* eslint-disable */
  },
  modifyRessource: {}
};

export default selectors;
