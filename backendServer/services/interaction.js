import { query, queryOne, run, seed } from './userDB.js';
import { isAdmin } from './user.js';

const getUserInteractions = (adminUser, targetUser) => {
    seed();
    if (isAdmin(adminUser)) {
        const data = query('SELECT * FROM interaction WHERE accessedby = ?',targetUser);
        console.log(data);
        return data;
    } else {
        return 'Forbidden';
    }
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