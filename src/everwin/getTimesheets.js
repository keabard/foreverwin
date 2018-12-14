import { Selector, t } from 'testcafe';

import config from '../../config.json';

const timesheetsByXebian = {};

const getTimesheets = async (maxDate) => {
  await t
    .maximizeWindow()
    .navigateTo('https://sx.xebia.fr')
    .typeText(Selector('input[name="login"]'), config.everwin.login)
    .typeText(Selector('input[name="password"]'), config.everwin.password)
    .click(Selector('button#submitButton'))
    .click(Selector('button').withText('Temps'))
    .click(Selector('li').withText('Feuilles de temps'))
    .switchToIframe(Selector('iframe#main'))
    .typeText(Selector('input#dateTis_end'), maxDate)
    .click(Selector('input#combovalidTis').nextSibling('img'))
    .click(Selector('div').withText('Aucune validation').prevSibling('img'))
    .click(Selector('div').withText('Validation Collaborateur').prevSibling('img'))
    .click(Selector('div.x-window').find('button').withText('Rechercher'));

  while(true) {

    const timesheetRows = Selector('div#xGrid_tis_TisTab').find('div.x-grid3-row');
    const timesheetRowsCount = await timesheetRows.count;

    for(let i = 0; i < timesheetRowsCount; i++) {
      const row = await timesheetRows.nth(i).innerText;
      const weekStartDate = row.split('\n')[1];
      const name = row.split('\n')[2];
      const validationStep = row.split('\n')[5];

      if (!(name in timesheetsByXebian)) {
        timesheetsByXebian[name] = []
      }
      timesheetsByXebian[name].push({weekStartDate, validationStep})
    }

    if(await Selector('button.x-tbar-page-next').parent('table.x-item-disabled').exists) {
      break;
    }

    await t
      .click(Selector('button.x-tbar-page-next'))
      .wait(2000);
  }

  t.fixtureCtx.timesheets = timesheetsByXebian;
  
};

export default getTimesheets;