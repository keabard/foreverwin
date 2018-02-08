import { Selector, t } from 'testcafe';

import config from '../../config.json';

const getBouyguesTelephone = async () => {

  await t
    .navigateTo('https://www.bouyguestelecom.fr')
    .click(Selector('article#js-hc--compte'))
    .click(Selector('a').withText('Accéder à votre compte'))
    .typeText(Selector('input#username'), config.phone.bouygues.login)
    .typeText(Selector('input#password'), config.phone.bouygues.password)
    .click(Selector('input#bt_valider'))
    .wait(10000)
    .click(Selector('a[data-link="invoices"]'));

  // if (await Selector('input#lastname').exists) {
  //   await t.typeText(Selector('input#lastname'), config.phone.bouygues.lastName);
  // }
  //
  // await t
  //   .click(Selector('input#bt_valider'))
  //   .debug()
  //   .click(Selector('a[data-link="invoices"]'))
  //   .click(Selector('a').withText('Télécharger'))
  //   .debug()
  //   .wait(5000);

  t.fixtureCtx.numericable = {
    price : 'coucou',
    billFilePath : 'coucou2'
  };
};

export default getBouyguesTelephone;
