// services folder
import { postUserInteractions } from './interaction.js';
import { isAdmin } from './user.js';
import { query, queryOne, run, seed, runPlain } from './userDB.js';

const getRandomCookie = (accessedby) => {
    seed();
    const data = runPlain('SELECT * FROM cookie ORDER BY RANDOM() LIMIT 1');
    console.log(data);
    
    // Log into interaction table who accessed the cookie
    const interaction = {
        accessedby: accessedby, 
        cookie_key: data[0].cookie_key, 
        cookie_value: data[0].cookie_value
    }

    if (postUserInteractions(interaction) === 'Success!'){
        return data;
    } else {
        return 'Error Occured Getting Random Cookie.';
    }
    
}

const getAllExistingCookies = (adminUser) => {
    if (isAdmin(username)) {
        const data = query('SELECT * FROM cookie WHERE createdby = ?', adminUser);
        return data;
    } else {
        return 'Forbidden';
    }
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