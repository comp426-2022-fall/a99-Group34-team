export const getAllUsers = async () => {
    const options = {
        method: 'GET',
        credentials: 'include'
      };
    return fetch(`http://localhost:5555/app/admin/allUsers`, options);
}

export const postNewCookie = async (data) => {
  const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      json: data,
      body: JSON.stringify(data)
    };
  return fetch(`http://localhost:5555/app/cookie/admin/new`, options);
}

export const getAllInteractions = async (username) => {
  const options = {
      method: 'GET',
      credentials: 'include'
    };
  return fetch(`http://localhost:5555/app/interaction/${username}`, options);
}