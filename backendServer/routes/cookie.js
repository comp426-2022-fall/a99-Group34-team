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
            } catch (e) {
                const error = new Error(e);
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

// POST `/cookie/:username/new`
router.post('/:username/new', verifyToken, async (req, res, next) => {
    verify(req.token, "secretkeyappearshere", (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
            const {username} = req.params;
            const {cookie_key, cookie_value} = req.body;
            const newCookie = {
                cookie_key: cookie_key,
                cookie_value: cookie_value,
                createdby: username
              };
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
            }
      });

  });

export default router;