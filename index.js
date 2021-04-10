const { setFailed } = require('@actions/core');
const { exec } = require('@actions/exec');

(async () => {
    await exec("./setup.sh");
    await exec('cargo', ['llvm-cov'], {
        env: {
            PATH: `~/.local/bin:${process.env['PATH']}`,
        }
    })
})().catch(setFailed);;
