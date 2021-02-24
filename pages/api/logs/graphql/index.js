import { createLogBody, saveNewRestLog, readDataFile } from '../../../../helpers';

export default async (req, res) => {
    
    if (req.method === 'POST') {
        
        const newLog = createLogBody(req);

        await saveNewRestLog(newLog, 'graphql');

        res.status(201).json({ type: 'GRAPHQL', message: `created at ${newLog.created}` });

    } else if (req.method === 'GET') {

        const graphqlLogs = await readDataFile('logs/graphql/graphqlLogs.json');

        if (!!req.query.userId) {
            const userLogs = graphqlLogs.filter(log => log.userId === req.query.userId);
            
            if (userLogs.length > 0) {
                res.status(200).json({ userLogs });
            } else {
                res.status(404).json({ message: `User id = ${req.query.userId} has no logs` });
            }

        } else {
            res.status(200).json({ graphqlLogs });
        }
    }
}