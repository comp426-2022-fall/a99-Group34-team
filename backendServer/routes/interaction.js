import express, { Router } from "express";
import { getUserInteractions, postUserInteractions } from "../services/interaction.js"; 
import { verifyToken } from "./user.js";
import jwt from 'jsonwebtoken';
const { verify } = jwt;

const router = Router();

// GET `/interaction/:username`
router.get('/:username', verifyToken, async (req, res, next) => {
    verify(req.token, "secretkeyappearshere", (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
            const {username} = req.params;
            let interactionsData;
            try {
                interactionsData = getUserInteractions(username);
            } catch {
                const error = new Error("Error! Something went wrong.");
                return next(error);
            }
        
            res
                .status(200)
                .json({
                success: true,
                data: interactionsData
                });
            }
      });

  });


// POST `/interaction/:username/new`
router.post('/:username/new', verifyToken, async (req, res, next) => {
    verify(req.token, "secretkeyappearshere", (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
            const {username} = req.params;
            const {crud_type, url} = req.body;
            const newInteraction = {
                username: username,
                crud_type: crud_type,
                url: url
              };
            let interactionsData;
            try {
                interactionsData = postUserInteractions(newInteraction);
            } catch (e) {
                console.log(e);
                const error = new Error("Error! Something went wrong.");
                return next(error);
            }
        
            res
                .status(200)
                .json({
                success: true,
                data: interactionsData
                });
            }
      });

  });

export default router;