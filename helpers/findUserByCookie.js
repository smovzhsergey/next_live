import nookies from 'nookies';
import { createUserId, updateUserVisitCounts } from '../helpers';

export const findUserByCookie = async (user_cookie, visitors, ctx, fs) => {
    let user;
    let visitCounts = 0;

    if (!user_cookie) {

        visitCounts = 1;
        const id = `${createUserId()}`;
        
        user = {
            userId: id,
            visitCounts
        };
        
        fs.writeFile('data/users.json', JSON.stringify({visitors: [...visitors, user]}), null, 4)
            .catch((error) => {
                console.error(error.message);
            });

        nookies.set(ctx, 'user_cookie', id);

    } else {

        const currentUser = visitors.filter(user => user.userId === user_cookie);
        
        if (currentUser.length > 0) {

            const updatedUsers = updateUserVisitCounts(visitors, user_cookie);
            user = updatedUsers.user;
            
            fs.writeFile('data/users.json', JSON.stringify({visitors: updatedUsers.users}), null, 4)
                .catch((error) => {
                    console.error(error.message);
                });

        } else {
            nookies.destroy(ctx, 'user_cookie');
        }
    }

    return user;
}