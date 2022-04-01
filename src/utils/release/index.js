#!/usr/bin/env node
const shell = require('shelljs');
const pkg = require('../../../package.json');

/**
 * @description shell 脚本打tag 然后通过github action 自动发布
 */
function release() {
    shell.exec(`git tag v${pkg.version}`);
    shell.exec(`git push origin v${pkg.version}`);
}

release();
