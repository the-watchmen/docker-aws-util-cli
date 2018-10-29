import child from 'child_process'
import assert from 'assert'
import path from 'path'

const infra = 'infra'

export function exec(cmd, { isMulti } = {}) {
    const out = child.execSync(cmd)
    const lines = out.toString().split('\n').slice(0, -1)
    isMulti || assert(lines.length == 1)
    return (lines.length == 1) ? lines[0] : lines
}

export function getProject() {
    const origin = exec('git config --get remote.origin.url')
    return path.basename(origin, '.git')
}

export function getBranch() {
    return exec('git symbolic-ref --short HEAD')
}

export function checkFeature({ branch }) {
    return branch.indexOf('/') > -1
}

export function checkPr({ branch }) {
    return branch.startsWith('PR-')
}

export function getGroup({ project }) {
    return project.split('-')[0]
}

export function getEnv({ branch }) {
    return branch.replace(new RegExp('/', 'g'), '-')
}

export function getAccount({ isPr, isFeature, branch }) {
    var account
    if (isPr) {
        // note: CHANGE_TARGET is a jenkins-ism
        //
        const target = process.env.CHANGE_TARGET
        assert(target)
        account = checkFeature({ branch: target }) ? infra : target
    } else if (branch == 'master') {
        account = 'prod'
    } else {
        account = isFeature ? infra : branch
    }
    return account
}
