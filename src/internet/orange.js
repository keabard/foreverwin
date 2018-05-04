
import fs from 'fs';
import path from 'path';
import { Selector, t } from 'testcafe';
import moment from 'moment';

import DIRECTORIES from '../variables';

import config from '../../config.json';

const getOrangeInternet = async () => {
  await t
    .navigateTo('https://login.orange.fr/')
    .typeText(Selector('input#login'), config.internet.orange.login)
    .click(Selector('button#btnSubmit'))
    .typeText(Selector('input#password'), config.internet.orange.password)
    .click(Selector('button#btnSubmit'));
};

export default getOrangeInternet;
