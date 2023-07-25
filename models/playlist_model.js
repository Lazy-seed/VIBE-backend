import mongoose from "mongoose";

const playlist = new mongoose.Schema({
    playlist_name: {
        type: String,
        default: '' 
    },
    catg: {
        type: String,
        default: '' 
    },
    img:{
        type:String,
        default: '' 
    },
    password: {
        type: String,
        default: '' 

    },
    created_by:{
        type: String,
        default: 'Admin' 
    }
})


const playlistSchema = mongoose.model("playlist", playlist);
export default playlistSchema;
