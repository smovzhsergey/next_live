const fs = require('fs').promises;

export const readDataFile = async (path) => {

    const fileData = await fs.readFile(path)
        .then((data) => {
            return JSON.parse(data);
        }).catch((error) => {
            console.error(error.message);
        });

    return fileData;
};