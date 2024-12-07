import { useState, ChangeEvent } from 'react';

interface PopupProps {
  currentState: string,
  onClose: () => void
}


const Popup = ({currentState, onClose} : PopupProps) => {
  const [text, setText] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return(
      <div className={`fixed inset-0 flex items-center justify-center bg-black/50 transition-opacity ` + currentState}>
        <div className="w-full max-w-xl">
          <form className="bg-white items-center justify-center shadow-md rounded px-8 pt-6 pb-8 mx-5">
            
            <div className="">
              <p className="text-xl font-bold">Username</p>
              <input type="text" placeholder="Username" className="bg-slate-100 p-2 rounded-lg"></input>
            </div>

            <div className="mt-5">
              <p className="text-xl font-bold">Comment</p>
              <input type="text" maxLength={300} placeholder="Your comment" onChange={handleChange} className="bg-slate-100 p-2 w-full rounded-lg"></input>
              <p>Characters remaining: {300 - text.length}</p>
            </div>

            <button onClick={onClose} className="bg-black px-4 py-2 mt-5 rounded-lg text-white text-xl font-bold">Done</button>
          </form>
        </div>
      </div>
  )
}

export default Popup