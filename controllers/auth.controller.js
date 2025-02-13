import User from "../Schemas/User.js";
import {
  getPassword,
  getTeamName,
  updatePlayers,
} from "../utils/credentials.js";
import { players } from "../utils/temp.js";
import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"

dotenv.config();




export const storeUsers = async (req, res) => {
  updatePlayers();
  try {
    for (let i = 0; i < players.length; i++) {
      const newUser = await User.create({
        teamName: players[i].teamName,
        secretPasscode: players[i].secretPasscode,
      });
      const savedUser = await newUser.save();
      console.log(savedUser);
    }
    return res.status(200).json({ msg: "Users saved successfully" });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ msg: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
    console.log(req.session)
    if(req.session.refreshToken && req.session.userId){
        const payload = {
            userId: req.session.userId
        }
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1m" });

        return res.status(200).json({ accessToken })
    }
  const {
    body: { teamName, secretPasscode },
  } = req;
  let foundUser;
  try {
    foundUser = await User.findOne({ teamName });
    if (!foundUser) return res.status(401).json({ msg: "User Not Found" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
  if (foundUser.secretPasscode !== secretPasscode) {
    return res.status(401).json({ msg: "Passwords did not match" });
  }

  const payload = {
    userId: foundUser._id
  }
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1m" });
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5m" });

  req.session.refreshToken = refreshToken;
  req.session.userId = foundUser._id
  return res.status(200).json({ accessToken });
};


export const check = async (req, res)=>{
    return res.status(200).json({ user: req.user })
}