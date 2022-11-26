
- [API](#api)
  - [0. API root endpoint at `http://HOST/app/`](#0-api-root-endpoint-at-httphostapp)
    - [GET `/`](#get-)
  - [1. Authentication with JWT Token as HTTP-Only Cookie](#1-authentication-with-jwt-token-as-http-only-cookie)
    - [POST `/user/login`](#post-userlogin)
    - [POST `/user/logout`](#post-userlogout)
    - [POST `/user/signup`](#post-usersignup)
    - [POST `/user/postaction`](#post-userpostaction)
  - [2. User-specific Interactions Logging and Retrieval](#2-user-specific-interactions-logging-and-retrieval)
    - [GET `/interaction/:username`](#get-interactionusername)
    - [POST `/interaction/:username/new`](#post-interactionusernamenew)
    - [GET `/interaction`](#get-interaction)

# API

## 0. API root endpoint at `http://HOST/app/`

### GET `/`
Testing endpoing.
```js
res.json({message: 'alive'});
```


## 1. Authentication with JWT Token as HTTP-Only Cookie

### POST `/user/login`
Given `username` and `password`, verify the user and assign a JWT token as a HTTP Only Cookie. 

```js
res
    .status(200)
    .cookie('token', token, {httpOnly: true})
    .json({
        success: true,
        data: {
            username: existUser.username,
            email: existUser.email,
            token: token,
        },
    });
```

### POST `/user/logout`
Invalidate JWT token in Cookies. 

```js
res
  .status(200)
  .cookie('token', null, {httpOnly: true})
  .json({
    success: true
  });
```

### POST `/user/signup`
Given `username` and `password` and `email`, update user table and assign a JWT token as a HTTP Only Cookie. 

```js
res
      .status(201)
      .cookie('token', token, {httpOnly: true})
      .json({
        success: true,
        data: { username: newUser.username,
            email: newUser.email, token: token },
      });
```

### POST `/user/postaction`
Verify JWT token retrieved from Request Cookies in order to execute a particular action.

```js
res.json({
          message: "POST created...",
          authData
        });
```


## 2. User-specific Interactions Logging and Retrieval

### GET `/interaction/:username`
Verify JWT token retrieved from Request Cookies and query parameter of `username` to get user interactions.


### POST `/interaction/:username/new`
Verify JWT token retrieved from Request Cookies and query parameter of `username` to add new interaction record to that user. 


### GET `/interaction`
Verify JWT token retrieved from Request Cookies in order to 