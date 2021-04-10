const { setFailed } = require('@actions/core');
const { exec } = require('@actions/exec');

exec("./setup.sh").catch(setFailed);
