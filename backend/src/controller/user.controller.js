import { User } from "../model/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

const accessTokenSecret = "abhishek";
const refreshTokenSecret = "abhiRefresh";

export const verifyPassowordAndGenerateToken = async(email, password)=>{
  const user =await User.findOne({email});
  if(!user)
   throw new Error ("User not exists");
  
  const match = await bcrypt.compare( password, user.password);
  if(!match)
    throw new Error ("password not match");

  const payload = {id: user._id, name: user.name};
  const accessToken =  jwt.sign(payload,accessTokenSecret,{expiresIn: '15m'});
  const refreshToken = jwt.sign(payload, refreshTokenSecret, {expiresIn: '7d'});
  return {accessToken, refreshToken};
}

export {accessTokenSecret};