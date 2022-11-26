import express, { Router } from "express";
import { getExistingUser, createNewUser } from "../services/user.js";
import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

const router = Router();

// Handling login request
router.post('/login', async (req, res, next) => {
    let { username, email, password } = req.body;
    let existUser;
    try {
        existUser = getExistingUser(username);
    } catch {
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }
    if (!existUser || existUser.password != password) {
        const error = Error("Wrong username or password, please check again!");
        return next(error);
    }
    let token;
    try {
        //Creating jwt token
        token = sign(
          { username: existUser.username, email: existUser.email },
          "secretkeyappearshere",
          { expiresIn: "1h" }
        );
      } catch (err) {
        console.log(err);
        const error = new Error("Error! Something went wrong.");
        return next(error);
      }

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
});

// Handling signout request
router.post('/logout', async (req, res, next) => {
  res
  .status(200)
  .cookie('token', null, {httpOnly: true})
  .json({
    success: true
  });
});

// Handling signup request
router.post("/signup", async (req, res, next) => {
    const { username, email, password } = req.body;
    const newUser = {
      username: username,
      email: email,
      password: password,
    };
   
    let result;
    try {
      result = createNewUser(newUser);
    } catch (e) {
      const error = new Error("Error! Something went wrong." + e);
      return next(error);
    }
    let token;
    try {
      token = jwt.sign(
        { username: newUser.username, email: newUser.email },
        "secretkeyappearshere",
        { expiresIn: "1h" }
      );
    } catch (err) {
      const error = new Error("Error! Something went wrong.");
      return next(error);
    }
    res
      .status(201)
      .cookie('token', token, {httpOnly: true})
      .json({
        success: true,
        data: { username: newUser.username,
            email: newUser.email, token: token },
      });
  });
   
export const verifyToken = (req, res, next) => {
    if (typeof req.cookies.token !== "undefined") {
        req.token = req.cookies.token;
        next();
    } else {
        res.sendStatus(403);
      }
  };

router.post("/postaction", verifyToken, (req, res) => {
    verify(req.token, "secretkeyappearshere", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          message: "POST created...",
          authData
        });
      }
    });
  });


export default router;