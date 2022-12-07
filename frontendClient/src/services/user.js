export const postIsLoggedIn = async () => {
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"http://localhost:3000/"
        }
      };
    return fetch('http://localhost:5555/app/user/postaction', options);
  }

export const postLoggingIn = async (data) => {
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        json: data,
        body: JSON.stringify(data)
    }
    return fetch('http://localhost:5555/app/user/login', options);
}

export const postSigningUp = async (data) => {
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        json: data,
        body: JSON.stringify(data)
    }
    return fetch('http://localhost:5555/app/user/signup', options);
}

export const postLoggingOut = async () => {
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        }
    }
    return fetch('http://localhost:5555/app/user/logout', options);
}

export const patchChangeUsername = async (data) => {
    const options = {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        json: data,
        body: JSON.stringify(data)
    }
    return fetch('http://localhost:5555/app/user/changeUsername', options);
}

export const patchChangeEmail = async (data) => {
    const options = {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        json: data,
        body: JSON.stringify(data)
    }
    return fetch('http://localhost:5555/app/user/changeEmail', options);
}

export const patchChangePassword= async (data) => {
    const options = {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        json: data,
        body: JSON.stringify(data)
    }
    return fetch('http://localhost:5555/app/user/changePassword', options);
}


export const deleteUser = async (data) => {
    const options = {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        json: data,
        body: JSON.stringify(data)
    }
    return fetch('http://localhost:5555/app/user/deleteUser', options);
}