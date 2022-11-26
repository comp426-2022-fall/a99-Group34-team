import { query, queryOne, run, seed } from './userDB.js';

const getExistingUser = (username) => {
    seed();
    const data = queryOne('SELECT * FROM user WHERE username = ?',username);
    return data;
}

const createNewUser = (user) => {
    const {username, email, password} = user;
    seed();
    let result = run('INSERT INTO user (username, email, password) VALUES (@username, @email, @password)', 
        {username, email, password});

    if (result.changes) {
        return 'Success!';
    } else {
        return 'Error Occured Creating New User.';
    }
}

export {
    getExistingUser,
    createNewUser
};