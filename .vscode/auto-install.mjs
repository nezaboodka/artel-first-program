import fs from "fs"
import { spawnSync } from "child_process"

if (!fs.existsSync("./node_modules")) {
  console.log("Installing node modules for the project...")
  spawnSync('npm', ["install"], {
    stdio: [process.stdin, process.stdout, process.stderr],
    shell: true })
}
