import { getProject, getBranch, checkFeature, checkPr, getGroup, getEnv, getAccount } from './helper'

const branch = getBranch()
const project = getProject()
const isFeature = checkFeature({ branch })
const isPr = checkPr({ branch })
const group = getGroup({ project })
const account = getAccount({ isFeature, isPr, branch })

const result = {
    project,
    branch,
    isFeature,
    isPr,
    group,
    env: getEnv({ branch }),
    account
}

console.log(JSON.stringify(result))

