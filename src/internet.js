import config from '../config.json';

import enterEverwinBill from './everwin';
import getNumericableInternet from './internet/numericable';

fixture('Rentrer ma facture internet dans Everwin');

const internetScripts = {
  numericable : getNumericableInternet
};

test('Just do it', async t => {
  await internetScripts[config.internet.current]();
  await enterEverwinBill('internet', t.fixtureCtx[config.internet.current].price / 2, t.fixtureCtx[config.internet.current].billFilePath);
});

