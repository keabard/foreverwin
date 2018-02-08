import config from '../config.json';

import enterEverwinBill from './everwin';
import getBouyguesPhone from './phone/bouygues';

fixture('Rentrer ma facture téléphone dans Everwin');

const phoneScripts = {
  bouygues : getBouyguesPhone
};

test('Just do it', async t => {
  await phoneScripts[config.phone.current]();
  // await enterEverwinBill('internet', t.fixtureCtx[config.phone.current].price / 2, t.fixtureCtx[config.phone.current].billFilePath);
});

