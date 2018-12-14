import { Selector, t } from 'testcafe';

import config from '../config.json';

const TYPE_TO_SX_CATEGORY = {
  phone : 'Téléphone portable',
  internet : 'Internet'
};

const enterEverwinBill = async (type, price, billFilePath) => {
  await t
    .navigateTo('https://sx.xebia.fr')
    .typeText(Selector('input[name="login"]'), config.everwin.login)
    .typeText(Selector('input[name="password"]'), config.everwin.password)
    .click(Selector('button#submitButton'))
    .click(Selector('button').withText('Frais'))
    .click(Selector('li').withText('Frais en cours'))
    .wait(2000)
    .switchToIframe(Selector('iframe#main'))
    .click(Selector('button').withText('Ajouter une ligne'))
    .click(Selector('input#rxpPrj').nextSibling('img'))
    .click(Selector('div.x-combo-list-item').withText('INTERNE'))
    .click(Selector('input#comborxpRty').nextSibling('img'))
    .click(Selector('div.x-combo-list-item').withText(`INTERNE - ${TYPE_TO_SX_CATEGORY[type]}`))
    .typeText(Selector('input#labelRxp'), TYPE_TO_SX_CATEGORY[type])
    .typeText(Selector('input#amtRxp'), price.toString())
    .setFilesToUpload(Selector('input#xUpl-file'), billFilePath)
    .click(Selector('div.x-window').withText('Attention').find('div.x-tool-close'))
    .click(Selector('div.x-window').find('button').withText('Ajouter'));
};

export default enterEverwinBill;