const fs = require("fs")
const cp = require("child_process")

const nodeModulesPath = "node_modules"

let isUpToDate = fs.existsSync(nodeModulesPath)
if (isUpToDate) {
  const packageJsonPath = "package.json"
  const packageLockJsonPath = "package-lock.json"

  const m = fs.statSync(nodeModulesPath)
  const p1 = fs.statSync(packageJsonPath)
  const p2 = fs.statSync(packageLockJsonPath)
  isUpToDate =
    m.mtime >= p1.mtime &&
    m.mtime >= p2.mtime &&
    m.mtime >= p1.ctime &&
    m.mtime >= p2.ctime
}

if (!isUpToDate) {
  console.log("\n================================\nNode modules are being installed.\n================================")
  cp.spawnSync('npm', ["install"], {
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: true })
  const now = new Date()
  fs.utimesSync(nodeModulesPath, now, now)
}
else
  console.log("\n")

const art = require("artel/build/art.js")
// art.awaiter.then(() => console.log("\n\n"), () => console.log("\n\n"))
