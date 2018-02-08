var path = require('path');
var fs = require('fs');
var replace = require('replace-in-file');

var DIRECTORIES = require('./variables');

['handlers.json', 'prefs.js'].map(filename => fs.copyFileSync(path.join(DIRECTORIES.firefox.config, filename), path.join(DIRECTORIES.firefox.session, filename)));

replace.sync({
  files : path.join(DIRECTORIES.firefox.session, 'prefs.js'),
  from : /user_pref\("browser\.download\.dir", .*\);/g,
  to : `user_pref("browser.download.dir", "${DIRECTORIES.downloads[process.argv[2]]}");`
});
