
import * as fs from "fs"
import * as cp from "child_process"

const AUTO_INSTALL = true // auto install if node_modules doesn't exist
const AUTO_UPDATE = true  // auto update if package.json is changed

let isUpToDate = !AUTO_INSTALL || fs.existsSync("node_modules")
if (isUpToDate) {
  const m = fs.statSync("node_modules")
  const p1 = fs.statSync("package.json")
  const p2 = fs.statSync("package-lock.json")
  isUpToDate = !AUTO_UPDATE || (
    m.mtime >= p1.mtime && m.mtime >= p2.mtime &&
    m.mtime >= p1.ctime && m.mtime >= p2.ctime)
}

if (!isUpToDate) {
  console.log("\nNode modules installation:")
  cp.spawnSync('npm', ["install"], {
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: true })
  const now = new Date()
  fs.utimesSync("node_modules", now, now)
  console.log("\nNode modules installation is completed.\n")
}
else
  console.log("\n")

await import("artel/build/artel-cli.js")

