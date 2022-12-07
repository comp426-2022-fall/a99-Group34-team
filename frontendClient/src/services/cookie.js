export const getRandomCookie = async (username) => {
    const options = {
        method: 'GET',
        credentials: 'include'
      };
    return fetch(`http://localhost:5555/app/cookie/${username}`, options);
}