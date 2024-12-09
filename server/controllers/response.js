import dailyEntry from "../models/dailySong.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
/* 
  This function will fetch the current day the user specifies. Since we fetch this function when the application loads
  we will create a new entry in out mongoDB collection if there is not already one for the current day as well.
*/
const getCurrentEntry = async (req, res) => {
  try {
  
    const todayDate = new Date().toISOString().split("T")[0];
    const currentDate = req.params.date;

    const currentDoc = await dailyEntry.findOne({ date: currentDate })

    /* 
      This statement will create the current day object in the mongoDB collection, otherwise if we query like
      the day before and there is no object in the collection we should send a 404 to the frontend since there was no
      doc created for that day
    */
    if (currentDoc === null){
      if (currentDate === todayDate){
        const threeNewSongs = await fetchThreeSongs();

        const newEntry = new dailyEntry({
          date: todayDate,
          songs: [
            {
              name: threeNewSongs[0].songTitle, 
              artist: threeNewSongs[0].songArtist, 
              link: threeNewSongs[0].songLyric, 
              imageLink: threeNewSongs[0].songImgUrl,
            },
            {
              name: threeNewSongs[1].songTitle, 
              artist: threeNewSongs[1].songArtist, 
              link: threeNewSongs[1].songLyric, 
              imageLink: threeNewSongs[1].songImgUrl,
            },
            {
              name: threeNewSongs[2].songTitle, 
              artist: threeNewSongs[2].songArtist, 
              link: threeNewSongs[2].songLyric, 
              imageLink: threeNewSongs[2].songImgUrl,
            }
          ],
          comments: [],
        });
  
        await newEntry.save();
  
        res.status(200).json(newEntry);
      } else {
        res.status(404).json();
      }
    }

    res.status(200).json(currentDoc);

  } catch (error) {
    
  }
}

const pushComment = async (req, res) => {
  try {
    const todayDate = new Date().toISOString().split("T")[0];

    const currentDoc = await dailyEntry.findOne({ date: currentDate })

    const username = req.body.username;
    const comment = req.body.comment;
    const songChoice = req.body.songChoice;

  } catch (error) {
    
  }
}

/* 
  This function queries the Genius API to get three random songs that we can use for our mongoDB entry.
  Where we need to also pass in the token given by the API to authorize our request.
*/
const fetchThreeSongs = async () => {
  const songs = [];
  const token = process.env.GENIUS_TOKEN;
  
  while (songs.length < 3){
    try {
      const randomSongID = Math.floor(Math.random() * 300000);
      const responseData = await axios.get(`https://api.genius.com/songs/${randomSongID}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const currentSong = responseData.data.response.song;

      let songDataJson = {
        songTitle: currentSong.title,
        songArtist: currentSong.primary_artist_names,
        songLyric: currentSong.url,
        songImgUrl: currentSong.song_art_image_thumbnail_url
      }

      songs.push(songDataJson);
      
    } catch (error) {
      
    }
  }

  return songs;
}

export { getCurrentEntry, pushComment};