import fs from 'fs';
import path from 'path';
import { Selector, t } from 'testcafe';

import DIRECTORIES from '../variables';

import config from '../../config.json';

const MOBILE_PHONE_REGEX = new RegExp(/^ *06.*$/)

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
    .navigateTo('https://www.bouyguestelecom.fr/mon-compte/mes-factures');

  const mobileFactureSection = Selector('div.lineAndOffer').withText(MOBILE_PHONE_REGEX).parent('section.factureSection');
  const billPrice = await mobileFactureSection.find('div.factureTotal').textContent;

  await t  
    .click(Selector('a').withText('Télécharger'))
    .wait(5000);

  t.fixtureCtx.bouygues = {
    price : parseFloat(billPrice.trim().replace('€', '.')).toFixed(2),
    billFilePath : path.join(DIRECTORIES.downloads.phone, fs.readdirSync(DIRECTORIES.downloads.phone)[0])
  };
};

export default getBouyguesTelephone;
