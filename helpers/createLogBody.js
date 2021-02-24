import cookie from 'cookie';

import { createLogId } from './createLogId';

export const createLogBody = (req) => {
    
    const cookies = cookie.parse(req.headers.cookie) 

    return {
        logId: createLogId(),
        created: new Date().toISOString(),
        userId: cookies.user_cookie,
        userAgent: req.headers['user-agent'],
        payload: JSON.parse(req.body)
    }
}