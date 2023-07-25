import express from 'express';
import { login, logout, register, userInfo, userUpdate } from '../controller/user_controller.js';
import { Auth } from '../middleware/auth.js';
import { addsong, allsongs, chngCatg, getOneSong,SearchSong,SongsByCtg } from '../controller/song_controller.js';


const route=express.Router();


//  songs
route.post('/addSong',addsong)
route.get('/allSongs',allsongs)
route.get('/SongsByCtg/:catg/:playlist',SongsByCtg)
route.get('/getOneSong/:song_id',getOneSong)
route.get('/searchSong/:srch',SearchSong)



// user
route.post('/register',register);
route.post('/login',login);
route.get('/userInfo',Auth,userInfo);
route.put('/userUpdate',Auth,userUpdate);
route.get('/logout',Auth,logout)



route.get('/chngCatg',chngCatg)



export default route;




