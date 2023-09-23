import fs from "fs"
import { exec } from "child_process"

if (!fs.existsSync("./node_modules")) {
  console.log("Installing node modules for the project...")
  exec('npm install')
}
