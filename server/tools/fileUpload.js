let fs = require('fs');
const handleFileUpload = (file, dir) => {
  return new Promise((resolve, reject) => {
    const filename = file.hapi.filename;
    const data = file._data;
    fs.writeFile(dir + filename, data, err => {
      if (err) {
        console.log(err);
        reject({ ...err, code: 'failed' });
      }
      resolve({ code: 'uploaded' });
    });
  });
};

module.exports = handleFileUpload;
