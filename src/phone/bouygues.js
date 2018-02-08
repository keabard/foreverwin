import { Selector, t } from 'testcafe';

import config from '../../config.json';

const getBouyguesTelephone = async () => {

  await t
    .maximizeWindow()
    .navigateTo('https://www.bouyguestelecom.fr/mon-compte')
    // .click(Selector('article#js-hc--compte'))
    // .click(Selector('a').withText('Accéder à votre compte'))
    .typeText(Selector('input#username'), config.phone.bouygues.login)
    .typeText(Selector('input#password'), config.phone.bouygues.password);


  if (await Selector('input#lastname').exists) {
    await t.typeText(Selector('input#lastname'), config.phone.bouygues.lastName);
  }

  await t
    .click(Selector('input#bt_valider'))

  await Selector('div#dashboardTop')();

  await t
    .navigateTo('https://www.bouyguestelecom.fr/mon-compte/mes-factures')
    .click(Selector('a').withText('Télécharger'))
    .wait(5000);

  t.fixtureCtx.numericable = {
    price : 'coucou',
    billFilePath : 'coucou2'
  };
};

export default getBouyguesTelephone;
