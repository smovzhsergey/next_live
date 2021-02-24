export const updateUserVisitCounts = (users, id) => {

    let currentUser;
    const updatedUsers = users.map( user => {
        if (user.userId === id) {
            user.visitCounts += 1;
            currentUser = user;
        }

        return user;
    });

    return {
        users: updatedUsers,
        user: currentUser
    }
};