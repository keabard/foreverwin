import config from '../config.json';

import getTimesheets from './everwin/getTimesheets';
import {writeCSV} from './utils/index.js'

fixture('Rechercher les retardataires de 2018');

test('Just do it', async t => {
  await getTimesheets('31/12/2018');
  await writeCSV('./retardataires2018.csv', t.fixtureCtx.timesheets);
});
