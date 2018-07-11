const fs = require('fs-extra')

exports.toStdout = async (cb, str, output=false) => {
  if (output) {
    cb(fs.writeFileSync(output, str));
  } else {
    cb(process.stdout.write(str));
  }
}
