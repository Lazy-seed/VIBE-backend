import userSchema from "../models/user_model.js";
import jwt from 'jsonwebtoken';


//  register user
export const register = async (req, res) => {
    const data = req.body;
    const email = data.email;

    const isExist = await userSchema.findOne({ email })
    if (isExist) {
        return res.status(400).json({
            success: false,
            msg: "user exist",
        })
    }

    // create new user
    const result = await userSchema.create(data)

    if (result) {

        res.status(200).json({
            success: true,
            msg: "user added",
            result
        })
    }
    else {
        res.status(400).json({
            success: false,
            msg: "user not added",

        })
    }
}




// login


export const login = async (req, res) => {
    const { email, password } = req.body
    const result = await userSchema.findOne({ email: email })

    if (result) {
        // const token =await  result.generateAuthToken()

        const token = jwt.sign({ _id: result._id }, 'HellThisIsMyPrivateKey');
        const tokenAdd = await userSchema.findByIdAndUpdate({ _id: result._id }, { $push: { tokens: { token: token } } })
        const updated_user = await tokenAdd.save();
        res.cookie("jwtoken", token, { expires: new Date(Date.now() + 100000000), httpOnly: true, })

        if (result.password === password) {
            res.status(200).json({
                success: true,
                msg: "logged in",
                updated_user,
                token: token
            })
        } else {
            res.status(200).json({
                success: false,
                msg: "invalid credentials",

            })
        }
    }
    else {
        res.status(400).json({
            success: false,
            msg: "user not exist",

        })
    }
}


// user update

export const userUpdate = async (req, res) => {
    const data = req.body;

    const userID = req.userID

    const uptUser = await userSchema.findByIdAndUpdate({ _id: userID }, { $set:  data  })

    res.status(200).json({
        success: true,
        msg: "user update",
        uptUser
    })

}




// user info

export const userInfo = async (req, res) => {
    // console.log(req.rootuser);

    const userInfo = req.rootuser
    res.status(200).json({
        success: true,
        msg: "user info",
        userInfo
    })
}


// logout user

export const logout = async (req, res) => {

    const Rtoken = req.token
    const userInfo = req.rootuser;

    // const tokenAdd = await userSchema.findByIdAndUpdate({ _id: userInfo._id }, { $pull: { tokens: { token: Rtoken } } })

    // logout from all
    const remToken = await userSchema.findOneAndUpdate({ _id: userInfo._id }, { $set: { tokens: [] } })
    console.log(userInfo._id);


    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('user logout')

}