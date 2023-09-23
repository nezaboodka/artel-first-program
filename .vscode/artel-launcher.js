const fs = require("fs")
const cp = require("child_process")

const nodeModulesPath = "./node_modules"
const packageJsonPath = "./package.json"
const packageLockJsonPath = "./package-lock.json"

let isUpToDate = fs.existsSync(nodeModulesPath)
if (isUpToDate) {
  const m = fs.statSync(nodeModulesPath)
  const p1 = fs.statSync(packageJsonPath)
  const p2 = fs.statSync(packageLockJsonPath)
  isUpToDate =
    m.ctime >= p1.ctime &&
    m.ctime >= p2.ctime &&
    m.mtime >= p1.mtime &&
    m.mtime >= p2.mtime
}

if (!isUpToDate) {
  console.log("Node modules are not installed or not up to date.")
  cp.spawnSync('npm', ["install"], {
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: true })
}

require("artel/build/art.js")
