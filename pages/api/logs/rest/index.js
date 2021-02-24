import { createLogBody, saveNewRestLog, readDataFile } from '../../../../helpers';

export default async (req, res) => {
    
    if (req.method === 'POST') {
        
        const newLog = createLogBody(req);

        await saveNewRestLog(newLog, 'rest');

        res.status(201).json({ type: 'REST', message: `created at ${newLog.created}` });

    } else if (req.method === 'GET') {

        const restLogs = await readDataFile('logs/rest/restLogs.json');

        if (!!req.query.userId) {
            const userLogs = restLogs.filter(log => log.userId === req.query.userId);
            
            if (userLogs.length > 0) {
                res.status(200).json({ userLogs });
            } else {
                res.status(404).json({ message: `User id = ${req.query.userId} has no logs` });
            }

        } else {
            res.status(200).json({ restLogs });
        }
    }
}