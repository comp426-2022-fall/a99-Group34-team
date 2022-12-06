// services folder
import { query, queryOne, run, seed, runPlain } from './userDB.js';

const getRandomCookie = (accessedby) => {
    seed();
    const data = runPlain('SELECT * FROM cookie ORDER BY RANDOM() LIMIT 1');
    console.log(data);
    return data;
}

const postNewCookie = (cookie) => {
    seed();
    const {createdby, cookie_key, cookie_value} = cookie;
    let result = run('INSERT INTO cookie (cookie_key, cookie_value, createdby) VALUES (@cookie_key, @cookie_value, @createdby)', 
        {cookie_key, cookie_value, createdby});
    if (result.changes) {
        return 'Success!';
    } else {
        return 'Error Occured Creating New Cookie Record.';
    }
}
export {
    getRandomCookie,
    postNewCookie
};