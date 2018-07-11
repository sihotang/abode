const wasNotFound = require('./wasNotFound')

exports.streamToString = async (stream, cb) => {
  var data = '';

  stream.on('data', function onData(chunk) {
    data += chunk;
  }).once('end', function onEnd() {
    cb(data.toString());
  }).on('error', function onError(err) {
    if (wasNotFound(err)) {
      console.error('Could not find file:', err.path);
    } else {
      console.error('Error while reading file:', err.message);
    }
    process.exit(1);
  });
}
