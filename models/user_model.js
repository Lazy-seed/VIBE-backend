import mongoose from "mongoose";

const user = new mongoose.Schema({
    fname: {
        type: String
    },
    lname: {
        type: String,
        default: ''
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    mobile: {
        type: Number,
        default: 0
    },

    tokens: [{
        token: {
            type: String
        }
    }
    ]
})


const userSchema = mongoose.model("user", user);
export default userSchema;
