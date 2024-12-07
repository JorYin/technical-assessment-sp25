import { useState, useEffect} from "react";
import axios from "axios";

import MusicCard from "./components/musicCard"
import Comment from "./components/comments"
import Popup from "./components/popup"


function App() {

  const todayDate = new Date().toISOString().split("T")[0];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentSongs, setSongs] = useState([]);
  const [currentComments, setComments] = useState([]);

  const formatDateUTC = (date: Date) => {
    return date.toISOString().split('T')[0];
  }

  const previousDate = () => {
    const prevDate = currentDate.setUTCDate(currentDate.getUTCDate() - 1);
    const updatedUTCDate = new Date(prevDate)
    setCurrentDate(updatedUTCDate)
  }
  
  const nextDate = () => {
    const nextDate = currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    const updatedUTCDate = new Date(nextDate)
    setCurrentDate(updatedUTCDate)
  }

  const handleOpen = () => {
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const getCurrentDate = async () => {
    const currentDateCalled = formatDateUTC(currentDate);
    const dataResponse = await axios.get(`http://localhost:3000/api/currentDate/${currentDateCalled}`)
    console.log(dataResponse)
  }

  /*
  useEffect(() => {
    getCurrentDate();
  }, [currentDate])
  */

  return (
    <div>
      <div className="bg-[#ffff64] py-10"></div>

      <div className="w-full max-w-7xl mx-auto mt-10">
        <div className="flex items-center justify-center lg:justify-end mx-5 p-4">
            <button className="rounded-lg px-4 py-2 bg-black text-white font-bold" onClick={getCurrentDate}>Previous</button>
            <p className="mx-5 text-center font-bold">{formatDateUTC(currentDate)}</p>
            <button className={`rounded-lg px-4 py-2 bg-black text-white font-bold ${todayDate === formatDateUTC(currentDate) ? "hidden" : "block"} `} onClick={nextDate}>Next</button>
        </div>
      </div>

      <section className="w-full max-w-7xl mx-auto mt-10">
        <div className="mx-5 grid grid-cols-1 lg:grid-cols-3 gap-8 place-items-center">
          <MusicCard name="love" artist="Dean" link="https://genius.com/Dean-love-lyrics" imageLink="https://t2.genius.com/unsafe/504x504/https%3A%2F%2Fimages.genius.com%2F65e0b88566fb526ae46af28d3e9c50cd.1000x1000x1.png"/>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto my-10">
        <Popup currentState={isModalOpen ? "block" : "hidden"} onClose={handleClose}/>
        <div className="bg-slate-50 p-4 mx-5 rounded-lg">
          <div className="flex justify-end">
            <button onClick={handleOpen} className={`rounded-lg p-4 bg-black text-white font-bold ${formatDateUTC(currentDate) != todayDate ? "hidden" : "block"}`}> Add comment</button>
          </div>
          <div>
            <Comment name="Blue" commentText="I love this song"/>
          </div>
        </div>
      </section>

      <footer className="bg-[#ffff64] py-20"></footer>
    </div>
  )
}

export default App
