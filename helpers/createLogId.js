export const createLogId = () => {

    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const diggits = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];

    let id = '';

    for (let i = 0; i <= 12; i++) {

        if (Math.random() < 0.5) {
            id += letters[Math.floor(Math.random()*10)];
        } else {
            id += diggits[Math.floor(Math.random()*10)]
        }
    }

    return id;
}