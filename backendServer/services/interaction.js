import { query, queryOne, run, seed } from './userDB.js';

const getUserInteractions = (username) => {
    seed();
    const data = query('SELECT * FROM interaction WHERE username = ?',username);
    console.log(data);
    return data;
}

const postUserInteractions = (interaction) => {
    seed();
    const {username, crud_type, url} = interaction;
    let result = run('INSERT INTO interaction (username, crud_type, url) VALUES (@username, @crud_type, @url)', 
        {username, crud_type, url});

    if (result.changes) {
        return 'Success!';
    } else {
        return 'Error Occured Creating New Interaction Record.';
    }
}

export {
    getUserInteractions,
    postUserInteractions
};