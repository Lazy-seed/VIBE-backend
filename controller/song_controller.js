import songSchema from "../models/song_model.js";








export const addsong = async (req, res) => {
    const data = req.body;
    const result = await songSchema.create(data)

    if (result) {

        res.status(200).json({
            success: true,
            msg: "Song added",
            result
        })
    }
    else {
        res.status(400).json({
            success: false,
            msg: "Song not added",
            result
        })
    }


}



// get single song
export const getOneSong = async (req, res) => {
    const song_id = req.params.song_id.toLowerCase();


    try {

        const result = await songSchema.findOne({ _id: song_id })

        if (result) {
            res.status(200).json({
                success: true,
                msg: "song get",
                result
            })
        } else {
            res.status(400).json({
                success: false,
                msg: "fail song"
            })
        }


    } catch (error) {
        res.status(400).json({
            success: false,
            msg: "fail song",
            error
        })
    }
}



// all songs

export const allsongs = async (req, res) => {

    const result = await songSchema.find()
    if (result.length != 0) {
        res.status(200).json({
            success: true,
            msg: "get all songs",
            result
        })
    } else {
        res.status(400).json({
            success: false,
            msg: "fail to get all songs"
        })
    }


}


// all songs by catg

export const SongsByCtg = async (req, res) => {
    const catg = req.params.catg.toLowerCase();
    const playlist = req.params.playlist.toLowerCase();
    const result = await songSchema.find({ catg: catg, playlist_name: playlist })
    if (result.length != 0) {
        res.status(200).json({
            success: true,
            msg: "get catg songs",
            result
        })
    } else {
        res.status(400).json({
            success: false,
            msg: "fail to get catg songs"
        })
    }

}




// change catg

export const chngCatg = async (req, res) => {


    const result = await songSchema.updateMany({ catg: 'party' }, { catg: 'mood', playlist_name: 'party' })
    if (result.length != 0) {
        res.status(200).json({
            success: true,
            msg: "get catg songs",
            result
        })
    } else {
        res.status(400).json({
            success: false,
            msg: "fail to get catg songs"
        })
    }


}



//  song by name 

export const SearchSong = async (req, res) => {
    const srch = req.params.srch.toLowerCase();

    const result = await songSchema.find(
        {
            "$or": [
                { "playlist_name": { $regex: srch } },
                { "catg": { $regex: srch } },
                { "name": { $regex: srch } }
            ]
        }
    )

    if (result.length != 0) {
        res.status(200).json({
            success: true,
            msg: "get catg songs",
            result
        })
    } else {
        res.status(200).json({
            success: false,
            msg: "fail to get catg songs",
            result:''
            
        })
    }

}






