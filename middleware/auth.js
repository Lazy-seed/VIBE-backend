import jwt from 'jsonwebtoken'
import userSchema from '../models/user_model.js'

export const Auth = async (req, res, next) => {

    try {

        console.log("auth run");

        const token = req.cookies.jwtoken;

        // console.log(token);
        
        const verfiyToken = jwt.verify(token, 'HellThisIsMyPrivateKey');
        const rootuser = await userSchema.findOne({ _id: verfiyToken._id });

        if (!rootuser) { throw new Error('user not foind') };
        // console.log(rootuser);
        req.token = token
        req.rootuser = rootuser
        req.userID = rootuser._id
        next()

    } catch (error) {
        // console.log(error);
        console.log("user not loggein");
        res.status(200).json({
            success:false,
            msg:"user not loggin"

        })
    }
}