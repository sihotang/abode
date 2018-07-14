const fs = require('fs-extra')

exports.wasNotFound = async (err) => {
  if (outputArg) {
    cb(fs.writeFileSync(outputArg, str));
  } else {
    cb(process.stdout.write(str));
  }
}
