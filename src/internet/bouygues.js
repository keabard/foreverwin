import fs from 'fs';
import path from 'path';
import { Selector, t } from 'testcafe';

import DIRECTORIES from '../variables';

import config from '../../config.json';

const FIXED_PHONE_REGEX = new RegExp(/^ *0[^6]( \d{2}){4}.*$/)

const getBouyguesInternet = async () => {

  await t
    .maximizeWindow()
    .navigateTo('https://www.bouyguestelecom.fr/mon-compte')
    .typeText(Selector('input#username'), config.internet.bouygues.login)
    .typeText(Selector('input#password'), config.internet.bouygues.password);


  if (await Selector('input#lastname').exists) {
    await t.typeText(Selector('input#lastname'), config.internet.bouygues.lastName);
  }

  await t
    .click(Selector('input#bt_valider'))

  await Selector('div#dashboardTop')();
  await t
    .navigateTo('https://www.bouyguestelecom.fr/mon-compte/mes-factures');

  const internetFactureSection = Selector('div.lineAndOffer').withText(FIXED_PHONE_REGEX).parent('section.factureSection');
  const billPrice = await internetFactureSection.find('div.factureTotal').textContent;

  await t  
    .click(Selector('a').withText('Télécharger'))
    .wait(5000);

  t.fixtureCtx.bouygues = {
    price : parseFloat(billPrice.trim().replace('€', '.')).toFixed(2),
    billFilePath : path.join(DIRECTORIES.downloads.internet, fs.readdirSync(DIRECTORIES.downloads.internet)[0])
  };
};

export default getBouyguesInternet;
