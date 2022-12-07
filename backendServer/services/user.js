import { query, queryOne, run, seed } from './userDB.js';

const getExistingUser = (username) => {
    seed();
    const data = queryOne('SELECT * FROM user WHERE username = ?',username);
    return data;
}

const getAllExistingUsers = (username) => {
    seed();
    if (isAdmin(username)) {
        const data = query('SELECT * FROM user WHERE role_type = ?', 1);
        return data;
    } else {
        throw 'Forbidden';
    }
}

const changeUserRole = (adminUser, targetUser, newRole) => {
    seed();
    if (isAdmin(adminUser)) {

        let result = run('UPDATE user set role_type = ? WHERE username = ?', 
        [newRole, targetUser]);

        if (result.changes) {
            return 'Success!';
        } else {
            throw `Error Occured Updating the User Role for ${targetUser}.`;
        }

    } else {
        throw 'Forbidden';
    }
}

const isAdmin = (username) => {
    const data = getExistingUser(username);
    const {role_type} = data; 
    return role_type === 0? true : false;
}

const createNewUser = (user) => {
    const {username, email, password} = user;
    const role_type = 1;
    seed();
    let result = run('INSERT INTO user (username, email, password, role_type) VALUES (@username, @email, @password, @role_type)', 
        {username, email, password, role_type});

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

const deleteAUser = (deleteUser) => {
    const {username, email, password} = deleteUser;
    let oldUser = queryOne('SELECT * FROM user WHERE username = ?', username);
    // make sure first if all the fields not being changed are correct
    const finalCheck = verifyBeforeChange(oldUser, username, email, password);
    if (finalCheck){
        throw `Wrong ${finalCheck}, cannot delete user!`
    }
    let result = run('DELETE FROM user WHERE user_id = ?', 
        [oldUser.user_id]);

    if (result.changes) {
        return 'Success!';
    } else {
        return 'Error Occured Deleting the User.';
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
    updateUser,
    deleteAUser,
    isAdmin,
    getAllExistingUsers,
    changeUserRole
};