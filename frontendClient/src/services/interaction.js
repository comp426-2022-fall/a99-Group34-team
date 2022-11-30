export const getCookie = async (username) => {
    const options = {
        method: 'GET',
        credentials: 'include'
      };
    return fetch(`http://localhost:5555/app/interaction/${username}/getCookie`, options);
}