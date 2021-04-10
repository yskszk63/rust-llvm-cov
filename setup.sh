#!/bin/bash

set -e

CARGO_LLVM_COV_URL='https://github.com/taiki-e/cargo-llvm-cov/releases/download/v0.1.0-alpha.2/cargo-llvm-cov-x86_64-unknown-linux-musl.tar.gz'

mkdir -p ~/.local/bin
curl -sSL $CARGO_LLVM_COV_URL | tar zxf - -C ~/.local/bin
cargo install cargo-binutils
cargo install rustfilt
echo ~/.local/bin >> $GITHUB_PATH
