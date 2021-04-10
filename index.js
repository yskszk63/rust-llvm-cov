const { setFailed } = require('@actions/core');
const { exec } = require('@actions/exec');

exec('cargo', ['llvm-cov'], {
    env: {
        PATH: `~/.local/bin:${process.env['PATH']}`,
    }
}).catch(setFailed);
