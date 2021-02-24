import { readDataFile } from '../../../../helpers';

export default async (req, res) => {

    let log = await readDataFile(`logs/rest/${req.query.logId}.json`);

    if (!!log) {
        res.status(200).json({ log });
    } else {
        res.status(404).json({ message: `Log id = ${req.query.logId} not found`});
    }
    

}