export const detectUserType = (visitCounts) => {

    return visitCounts === undefined || visitCounts < 3
        ? 'guest'
        : visitCounts < 5
            ? 'friend'
            : 'familyMember';
};