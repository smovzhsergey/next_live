const fs = require('fs').promises;
const path = require('path');

export const readDataFile = async (name) => {

    const fileData = await fs.readFile(path.resolve(name))
        .then((data) => {
            return JSON.parse(data);
        }).catch((error) => {
            console.error(error.message);
        });

    return fileData;
};