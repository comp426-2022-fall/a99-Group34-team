import express, { Router } from "express";
import { getRandomCookie, postNewCookie } from "../services/cookie.js"; 
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
            let cookieData;
            try {
                cookieData = getRandomCookie(username);
            } catch {
                const error = new Error("Error! Something went wrong.");
                return next(error);
            }
        
            res
                .status(200)
                .cookie(cookieData.cookie_key, cookieData.cookie_value)
                .json({
                success: true,
                data: cookieData
                });
            }
      });

  });

export default router;