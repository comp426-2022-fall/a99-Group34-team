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

const updateUser = (updatedInfo, updateType) => {
    let result;
    if (updateType === 'username') {
        const {old_username, new_username, email, password} = updatedInfo;
        let oldUser = queryOne('SELECT * FROM user WHERE username = ?', old_username);
        
        // make sure first if all the fields not being changed are correct
        const finalCheck = verifyBeforeChange(oldUser, old_username, email, password);
        if (finalCheck){
            throw `Wrong ${finalCheck}!`
        }

        result = run('UPDATE user set username = ?, email = ?, password = ? WHERE user_id = ?', 
        [new_username, email, password, oldUser.user_id]);

    } else if (updateType === 'email') {
        const {username, old_email, new_email, password} = updatedInfo;
        let oldUser = queryOne('SELECT * FROM user WHERE username = ?', username);

        // make sure first if all the fields not being changed are correct
        const finalCheck = verifyBeforeChange(oldUser, username, old_email, password);
        if (finalCheck){
            throw `Wrong ${finalCheck}!`
        }

        result = run('UPDATE user set username = ?, email = ?, password = ? WHERE user_id = ?', 
        [username, new_email, password, oldUser.user_id]);
    } else {
        const {username, email, old_password, new_password} = updatedInfo;
        let oldUser = queryOne('SELECT * FROM user WHERE username = ?', username);

        // make sure first if all the fields not being changed are correct
        const finalCheck = verifyBeforeChange(oldUser, username, email, old_password);
        if (finalCheck){
            throw `Wrong ${finalCheck}!`
        }

        result = run('UPDATE user set username = ?, email = ?, password = ? WHERE user_id = ?', 
        [username, email, new_password, oldUser.user_id]);
    } 
    
    if (result.changes) {
        return 'Success!';
    } else {
        return 'Error Occured Updating the User.';
    }
}

const verifyBeforeChange = (oldUser, _username, _email, _password) => {
    const {username, email, password} = oldUser;    
    if (username === _username && email === _email && password === _password){
        return false;
    } else if (!(username === _username)){
        return 'username';
    } else if (!(email === _email)) {
        return 'email';
    } else if (!(password === _password)) {
        return 'password';
    }
}

export {
    getExistingUser,
    createNewUser,
    updateUser
};