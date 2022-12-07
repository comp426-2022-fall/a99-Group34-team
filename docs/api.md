
- [API](#api)
  - [0. API root endpoint at `http://HOST/app/`](#0-api-root-endpoint-at-httphostapp)
    - [GET `/`](#get-)
  - [1. Authentication with JWT Token as HTTP-Only Cookie](#1-authentication-with-jwt-token-as-http-only-cookie)
    - [POST `/user/login`](#post-userlogin)
    - [POST `/user/logout`](#post-userlogout)
    - [POST `/user/signup`](#post-usersignup)
    - [PATCH `/user/changeUsername`](#patch-userchangeusername)
    - [PATCH `/user/changeEmail`](#patch-userchangeemail)
    - [PATCH `/user/changePassword`](#patch-userchangepassword)
    - [DELETE `/user/deleteUser`](#delete-userdeleteuser)
    - [POST `/user/postaction` (Deprecated after Testing)](#post-userpostaction-deprecated-after-testing)
  - [2. User-specific Interactions Logging and Retrieval](#2-user-specific-interactions-logging-and-retrieval)
    - [GET `/interaction/:username`](#get-interactionusername)
    - [POST `/interaction/:username/new` (Deprecated)](#post-interactionusernamenew-deprecated)
    - [GET `/interaction` (Deprecated)](#get-interaction-deprecated)
  - [3. Get Random Cookie and Create New Cookie](#3-get-random-cookie-and-create-new-cookie)
    - [GET `/cookie/:username`](#get-cookieusername)
    - [POST `/cookie/:username/new`](#post-cookieusernamenew)
  - [4. Admin Operations](#4-admin-operations)
    - [GET `/admin/allUsers`](#get-adminallusers)
    - [PATCH `/admin/changeRole/:username`](#patch-adminchangeroleusername)

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


### PATCH `/user/changeUsername`
Verify JWT token and existing credentials associated with user before updating the username. A new JWT token is assigned.

```js
res
    .status(201)
    .cookie('token', token, {httpOnly: true})
    .json({
      success: true,
      data: { username: updatedUser.new_username,
          email: updatedUser.email, token: token },
    });
```

### PATCH `/user/changeEmail`
Verify JWT token and existing credentials associated with user before updating the email. A new JWT token is assigned.

```js
res
    .status(201)
    .cookie('token', token, {httpOnly: true})
    .json({
      success: true,
      data: { username: updatedUser.username,
          email: updatedUser.new_email, token: token },
    });
```


### PATCH `/user/changePassword`
Verify JWT token and existing credentials associated with user before updating the password. A new JWT token is assigned.

```js
res
    .status(201)
    .cookie('token', token, {httpOnly: true})
    .json({
      success: true,
      data: { username: updatedUser.username,
          email: updatedUser.email, token: token },
    });
```

### DELETE `/user/deleteUser`
Verify JWT token and existing credentials associated with user before deleting the user. Invalidate pre-existing JWT token.

```js
res
    .status(201)
    .cookie('token', null, {httpOnly: true})
    .json({
      success: true,
      data: { username: deleteUser.username,
          email: deleteUser.email},
    });
```

### POST `/user/postaction` (Deprecated after Testing)
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


### POST `/interaction/:username/new` (Deprecated)
Verify JWT token retrieved from Request Cookies and query parameter of `username` to add new interaction record to that user. 


### GET `/interaction` (Deprecated)
Verify JWT token retrieved from Request Cookies in order to 

## 3. Get Random Cookie and Create New Cookie

### GET `/cookie/:username`
Send back a browser cookie and log in Interaction Table the activity by `username`.


### POST `/cookie/:username/new`
Verify Admin user role, and log in Cookie Table the new cookie created by `username`.


## 4. Admin Operations

### GET `/admin/allUsers`
Verify Admin user role, and send back a list of Registered, __non-admin__ users.

### PATCH `/admin/changeRole/:username`
Verify Admin user role, and update the role for user with `username`.