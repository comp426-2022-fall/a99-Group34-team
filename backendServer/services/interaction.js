import { query, queryOne, run, seed } from './userDB.js';

const getUserInteractions = (username) => {
    seed();
    const data = query('SELECT * FROM interaction WHERE accessedby = ?',username);
    console.log(data);
    return data;
}

const postUserInteractions = (interaction) => {
    seed();
    const {accessedby, cookie_key, cookie_value} = interaction;
    let result = run('INSERT INTO interaction (accessedby, cookie_key, cookie_value) VALUES (@accessedby, @cookie_key, @cookie_value)', 
        {accessedby, cookie_key, cookie_value});

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