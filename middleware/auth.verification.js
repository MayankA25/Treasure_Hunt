import jwt from "jsonwebtoken"
import User from "../Schemas/User.js";
export const verifyToken = async (req, res, next)=>{
    const refreshToken = req.session.refreshToken

    if(!refreshToken) return res.status(401).json({ msg:"Unauthorized" })
    
    const verifiedObj = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const userId = verifiedObj.userId;
    const foundUser = await User.findById(userId);
    if(!foundUser) return res.status(401).json({ msg: "Unauthorized - User Not Found" });
    req.user = foundUser;
    next()
}