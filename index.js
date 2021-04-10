const { spawn } = require('child_process');
const { mkdirSync } = require('fs');

const CARGO_LLVM_COV_URL = 'https://github.com/taiki-e/cargo-llvm-cov/releases/download/v0.1.0-alpha.2/cargo-llvm-cov-x86_64-unknown-linux-musl.tar.gz';

mkdirSync('~/.local/bin', { recursive: true });
const curl = spawn('curl', ['-sSL', CARGO_LLVM_COV_URL], { stdio: ['ignore', 'pipe', 'inherit'] });
const tar = spawn('tar', ['zxf', '-', '-C', '~/.local/bin'], { stdio: [curl.stdout, 'inherit', 'inherit'] });
tar.on('end', code => {
    if (code) {
        core.setFailed(`Failed to download cargo-llvm-cov: ${code}`);
    }

    const cargo = spawn(
        'cargo',
        ['llvm-cov'],
        {
            env: {
                PATH: `~/.local/bin:${process.env['PATH']}`,
            },
            stdio: ['ignore', 'inherit', 'inherit']
        });
    cargo.on('end', code => {
        if (code) {
            core.setFailed(`Failed to run cargo llvm-cov: ${code}`);
        }
    });
});
