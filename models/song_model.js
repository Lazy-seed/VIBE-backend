import mongoose from 'mongoose';



const song = mongoose.Schema({
    name:{
        type: String,
        default: ''
    },
    url:{
        type: String,
        default: ''
    },
    img:{
        type: String,
        default: ''
    },
    artist:{
        type: String,
        default: ''
    },
    catg:{
        type: String,
        default: 'mood'
    },
    playlist_name:{
        type: String,
        default: ''
    },
    playlist_ID:{
        type: String,
        default: ''
    },
    date:{
        type: Date,
        default: Date.now()
    },
})


const songSchema =mongoose.model("songs",song);
export default songSchema;




