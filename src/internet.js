import config from '../config.json';

import enterEverwinBill from './everwin';
import getBouyguesInternet from './internet/bouygues';
import getNumericableInternet from './internet/numericable';
import getOrangeInternet from './internet/orange';

fixture('Rentrer ma facture internet dans Everwin');

const internetScripts = {
  bouygues : getBouyguesInternet,
  numericable : getNumericableInternet,
  orange : getOrangeInternet
};

test('Just do it', async t => {
  await internetScripts[config.internet.current]();
  await enterEverwinBill('internet', t.fixtureCtx[config.internet.current].price / 2, t.fixtureCtx[config.internet.current].billFilePath);
});

