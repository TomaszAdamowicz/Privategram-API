const AdmZip = require('adm-zip');
const path = require('path');

const zipFiles = (array) => {
    const today = new Date();
    const fileName = `wojtagram-${today.getMonth()}`;
    const zip = new AdmZip();
    const zipPath = path.join(__dirname, '../public');

    array.forEach(item => {
        zip.addLocalFile(item);
    })

    zip.writeZip(`${zipPath}/zipped/${fileName}.zip`);

    zipData = {
        path: `${zipPath}/zipped/${fileName}.zip`,
        file: `wojtagram-${today.getMonth()}.zip`
    }

    return zipData;
}

module.exports = zipFiles;