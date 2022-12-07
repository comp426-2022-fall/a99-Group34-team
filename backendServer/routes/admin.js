import express, { Router } from "express";
import { getAllExistingUsers, changeUserRole } from "../services/user.js";
import jwt from 'jsonwebtoken';
import { verifyToken } from "./user.js";
const { verify } = jwt;

const router = Router();

// Handling get All Existing Users request
router.get('/allUsers', verifyToken, async (req, res, next) => {
    verify(req.token, "secretkeyappearshere", (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
            let result;
            try {
                result = getAllExistingUsers(authData.username);
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
                .status(200)
                .json({
                success: true,
                data: result
                });
        }
    })

    
  });

// Handling changeUserRole request
router.patch("/changeRole/:username", verifyToken, async (req, res, next) => {
    verify(req.token, "secretkeyappearshere", (err, authData) => {
         if (err) {
           res.sendStatus(403);
         } else {
           const { username } = req.params;
           const { new_role } = req.body;

           let result;
           try {
             result = changeUserRole(authData.username, username, new_role);
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
             .json({
               success: true,
               data: `Successfully Update user role for ${username}`,
             });
  
         }
     })
  });

export default router;