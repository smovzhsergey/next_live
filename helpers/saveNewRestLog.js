const fs = require('fs').promises;
const path = require('path');

export const saveNewRestLog = async (log, type) => {
    
    const logsPath  = path.resolve(`logs/${type}`, `${type}Logs.json`);
    const newLogPath  = path.resolve(`logs/${type}`, `${log.logId}.json`);

    const source = await fs.readFile(logsPath, 'utf-8');
    const data = JSON.parse(source);

    data.push(log);

    await fs.writeFile(logsPath, JSON.stringify(data, null, 4), 'utf-8');

    await fs.writeFile(newLogPath, JSON.stringify(log, null, 4), 'utf-8');

}