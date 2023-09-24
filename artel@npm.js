
const fs = require("fs")
const cp = require("child_process")
const nodeModulesPath = "node_modules"
const packageJsonPath = "package.json"
const packageLockJsonPath = "package-lock.json"

let isUpToDate = fs.existsSync(nodeModulesPath)
if (isUpToDate) {
  const m = fs.statSync(nodeModulesPath)
  const p1 = fs.statSync(packageJsonPath)
  const p2 = fs.statSync(packageLockJsonPath)
  isUpToDate = m.mtime >= p1.mtime && m.mtime >= p2.mtime &&
    m.mtime >= p1.ctime && m.mtime >= p2.ctime
}

if (!isUpToDate) {
  console.log("\nNode modules installation:")
  cp.spawnSync('npm', ["install"], {
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: true })
  const now = new Date()
  fs.utimesSync(nodeModulesPath, now, now)
  console.log("\nNode modules installation is completed.\n")
}
else
  console.log("\n")

const cli = require("artel/build/artel-cli.js")
cli.awaiter.then(
  result => {
    // do nothing
  },
  error => {
    // do nothing
  })
