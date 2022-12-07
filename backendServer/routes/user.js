import express, { Router } from "express";
import { getExistingUser, createNewUser, updateUser, deleteAUser } from "../services/user.js";
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

// Handling changeUsername request
router.patch("/changeUsername", verifyToken, async (req, res, next) => {
   verify(req.token, "secretkeyappearshere", (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          const { old_username, new_username, email, password } = req.body;
          const updatedUser = {
            old_username: old_username,
            new_username: new_username,
            email: email,
            password: password,
          };
        
          let result;
          try {
            result = updateUser(updatedUser, 'username');
          } catch (e) {
            res
            .status(401)
            .json({
              success: false,
              error: e,
            });
            return;
          }
          let token;
          try {
            token = jwt.sign(
              { username: updatedUser.new_username, email: updatedUser.email },
              "secretkeyappearshere",
              { expiresIn: "1h" }
            );
          } catch (err) {
            res
            .sendStatus(401)
            .json({
              success: false,
              error: err,
            });
            return;
          }
          res
            .status(201)
            .cookie('token', token, {httpOnly: true})
            .json({
              success: true,
              data: { username: updatedUser.new_username,
                  email: updatedUser.email, token: token },
            });

        }
    })
});
 

// Handling changeEmail request
router.patch("/changeEmail", verifyToken, async (req, res, next) => {
  verify(req.token, "secretkeyappearshere", (err, authData) => {
       if (err) {
         res.sendStatus(403);
       } else {
         const { username, old_email, new_email, password } = req.body;
         const updatedUser = {
           username: username,
           old_email: old_email,
           new_email: new_email,
           password: password,
         };
       
         let result;
         try {
           result = updateUser(updatedUser, 'email');
         } catch (e) {
           res
           .status(401)
           .json({
             success: false,
             error: e,
           });
           return;
         }
         let token;
         try {
           token = jwt.sign(
             { username: updatedUser.username, email: updatedUser.new_email },
             "secretkeyappearshere",
             { expiresIn: "1h" }
           );
         } catch (err) {
           res
           .sendStatus(401)
           .json({
             success: false,
             error: err,
           });
           return;
         }
         res
           .status(201)
           .cookie('token', token, {httpOnly: true})
           .json({
             success: true,
             data: { username: updatedUser.username,
                 email: updatedUser.new_email, token: token },
           });

       }
   })
});

// Handling changePassword request
router.patch("/changePassword", verifyToken, async (req, res, next) => {
  verify(req.token, "secretkeyappearshere", (err, authData) => {
       if (err) {
         res.sendStatus(403);
       } else {
         const { username, email, old_password, new_password } = req.body;
         const updatedUser = {
           username: username,
           email: email,
           old_password: old_password,
           new_password: new_password
         };
       
         let result;
         try {
           result = updateUser(updatedUser, 'password');
         } catch (e) {
           res
           .status(401)
           .json({
             success: false,
             error: e,
           });
           return;
         }
         let token;
         try {
           token = jwt.sign(
             { username: updatedUser.username, email: updatedUser.email },
             "secretkeyappearshere",
             { expiresIn: "1h" }
           );
         } catch (err) {
           res
           .sendStatus(401)
           .json({
             success: false,
             error: err,
           });
           return;
         }
         res
           .status(201)
           .cookie('token', token, {httpOnly: true})
           .json({
             success: true,
             data: { username: updatedUser.username,
                 email: updatedUser.email, token: token },
           });

       }
   })
});

// TODO: Handling delete User request
router.delete("/deleteUser", verifyToken, async (req, res, next) => {
  verify(req.token, "secretkeyappearshere", (err, authData) => {
       if (err) {
         res.sendStatus(403);
       } else {
         const { username, email, password } = req.body;
         const deleteUser = {
           username: username,
           email: email,
           password: password
         };
       
         let result;
         try {
           result = deleteAUser(deleteUser);
         } catch (e) {
           res
           .status(401)
           .json({
             success: false,
             error: e,
           });
           return;
         }
         res
           .status(201)
           .cookie('token', null, {httpOnly: true})
           .json({
             success: true,
             data: { username: deleteUser.username,
                 email: deleteUser.email},
           });

       }
   })
});

export default router;