import fs from 'fs';
import path from 'path';
import { Selector, t } from 'testcafe';
import moment from 'moment';

import DIRECTORIES from '../variables';

import config from '../../config.json';

const getNumericableInternet = async () => {
  const currentDate = moment().locale('fr');
  let frenchCurrentMonth = currentDate.format('MMMM');
  frenchCurrentMonth = frenchCurrentMonth.slice(0, 1).toUpperCase() + frenchCurrentMonth.slice(1);

  await t
    .navigateTo('http://www.numericable.fr')
    .click(Selector('a[title="Espace Client"]'))
    .typeText(Selector('input[name="login"]'), config.internet.numericable.login)
    .typeText(Selector('input[name="pwd"]'), config.internet.numericable.password)
    .click(Selector('input#ctl00_CphCenter_BtnLogin'))
    .click(Selector('li#serviceTab_conso'));

  const monthBillSelector = Selector('div.servicesContent.containerHalf.right').find('h3').withText(frenchCurrentMonth);
  const billPrice = await monthBillSelector.nextSibling('p').textContent;

  await t
    .click(monthBillSelector.parent().find('a').withText('Télécharger la facture'))
    .wait(5000);

  t.fixtureCtx.numericable = {
    price : parseFloat(billPrice.replace(',', '.').replace('€', '')),
    billFilePath : path.join(DIRECTORIES.downloads.internet, fs.readdirSync(DIRECTORIES.downloads.internet)[0])
  };
};

export default getNumericableInternet;
