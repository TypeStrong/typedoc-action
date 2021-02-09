import * as fs from 'fs';
import * as Path from 'path';
import { promisify } from 'util';

interface Options {
    publishBranch: string;
    publishDir: string;
    args: string;
}

interface ComputedOptions {
    renderDir: string;
    tempCloneDir: string;
    gitAuthor: string;
    typedocVersion: string;
}

const enum PackageManager {
    Yarn2,
    Yarn1,
    Npm,
    Pnpm
}

const Filename = {
    lockfile: 'yarn.lock'
} as const;

/**
 * Lifted from yarnpkg/berry
 * https://github.com/yarnpkg/berry/blob/10ff0a97b78fcd5ca787658409fea92f4bc0fc84/packages/yarnpkg-core/sources/scriptUtils.ts#L41-L62
 */
async function detectPackageManager(location: string) {
    let yarnLock = null;
    try {
        yarnLock = await promisify(fs.readFile)(Path.join(location, Filename.lockfile), `utf8`);
    } catch { }

    if (yarnLock !== null) {
        if (yarnLock.match(/^__metadata:$/m)) {
            return PackageManager.Yarn2;
        } else {
            return PackageManager.Yarn1;
        }
    }

    if (fs.existsSync(Path.join(location, `package-lock.json`)))
        return PackageManager.Npm;

    if (fs.existsSync(Path.join(location, `pnpm-lock.yaml`)))
        return PackageManager.Pnpm;

    return null;
}

async function installDepsIfNecessary() {
    /*
    If typedoc and/or already installed locally, use that
    Check for both!  typedoc and typescript

    Check for `node_modules/typedoc` and `node_modules/typescript`
    `yarn why typedoc --json`?

    npm install typedoc@$version
    yarn add typedoc@$version
    pnpm install typedoc@$version
    */
}

async function runTypedoc() {
    /*
    Either (depending on package manager):
    ./node_modules/.bin/typedoc $args
    or:
    yarn exec typedoc $args
    */
}

async function publishToGithubPages() {
    /*
    create temp clone dir

    git clone --reference-if-able $cwd --shared --branch $publishBranch $tempCloneDir
    git -C $tempCloneDir rm --force $publishDir
    cp -R $renderDir $tempCloneDir/$publishDir
    git add $tempCloneDir/$publishDir
    GIT_AUTHOR=$gitAuthor git -C $tempCloneDir commit -m 'Publish typedoc'
    git -C $tempCloneDir push origin $publishBranch:$publishBranch
     */
}