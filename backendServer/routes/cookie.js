import express, { Router } from "express";
import { getRandomCookie, postNewCookie } from "../services/cookie.js";
import { isAdmin } from "../services/user.js"; 
import { verifyToken } from "./user.js";
import jwt from 'jsonwebtoken';
const { verify } = jwt;

const router = Router();

// GET `/cookie/:username`
router.get('/:username', verifyToken, async (req, res, next) => {
    verify(req.token, "secretkeyappearshere", (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
            const {username} = req.params;
            if (authData.username !== username){
                res
                    .status(401)
                    .json({
                    success: false,
                    error: 'Attempting to impersonate, make sure the user in URL is the one logged in!',
                    });
                return;
            }
            let cookieData;
            try {
                cookieData = getRandomCookie(username);
            } catch (e) {
                const error = new Error(e);
                return next(error);
            }
        
            res
                .status(200)
                .cookie(cookieData[0].cookie_key, cookieData[0].cookie_value)
                .json({
                success: true,
                data: cookieData
                });
            }
      });

  });

// POST `/cookie/:username/new`
router.post('/:username/new', verifyToken, async (req, res, next) => {
    verify(req.token, "secretkeyappearshere", (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
            const {username} = req.params;
            if (authData.username !== username){
                res
                    .status(401)
                    .json({
                    success: false,
                    error: 'Attempting to impersonate, make sure the user in URL is the one logged in!',
                    });
                return;
            }
            const {cookie_key, cookie_value} = req.body;
            const newCookie = {
                cookie_key: cookie_key,
                cookie_value: cookie_value,
                createdby: username
              };
            if (isAdmin(username)){
                let cookieData;
                try {
                    cookieData = postNewCookie(newCookie);
                } catch (e) {
                    console.log(e);
                    const error = new Error("Error! Something went wrong.");
                    return next(error);
                }
            
                res
                    .status(200)
                    .json({
                    success: true,
                    data: cookieData
                    });
            } else {
                res
                    .status(401)
                    .json({
                    success: false,
                    error: 'Only Admin Users can Add Cookies',
                    });
            }
            
            }
      });

  });

export default router;