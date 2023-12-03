import logo from './logo.svg';
import './App.css';
import { Auth } from './components/Auth';
import { useState,useRef } from 'react';
import {signOut} from "firebase/auth"
import {auth} from "./firebase-config"
import Cookies from 'universal-cookie'
import { Chat } from './components/Chat';
const cookies =new Cookies()  
function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null);

  async function signUserOut(){
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false)
    setRoom(null);
  }
  const roomInputRef=useRef(null);
  if (!isAuth) {
    return (
      <div className="App">
        <div className=''>
          
         <Auth setIsAuth={setIsAuth}/>
      </div>
       
      </div>
    );
  }
  console.log(auth)
  return (
    <>
      {room ? (
        <Chat room={room}/>
      ) : (
        <div className='Chat fixed w-full'>
          <h2 className='mt-[12vw]'>Dialogix</h2>
          {/* <h1 className='text-2xl text-white mt-[1vw]'> Hi, {auth.currentUser.displayName} :)</h1> */}
          
          <div className='mt-[3vw] flex flex-col gap-10 p-8 drop-shadow-md bg-slate-100 max-h-[30rem] w-3/12 mx-auto rounded-md'>
          <label className='text-xl font-bold mx-auto '> Enter room name</label>
          <div className='h-[3px] bg-gray-200 w-4/12 mx-auto rounded-md'></div>
          <input className='w-8/12 mx-auto h-10 rounded-md border-2 p-2' placeholder='eg. chat' ref={roomInputRef}></input>
          <button className='bg-blue-700 w-8/12 mx-auto text-white rounded-md p-3 font-semibold' onClick={()=>setRoom(roomInputRef.current.value)}>Enter Chat</button>
        </div>
        </div>
        )}
        <div className="sign-out absolute flex items-baseline top-4 right-5">
          <p className='text-white p-3 text-lg font-semibold'>Going Already?</p>

          <button className=' bg-slate-300  p-3 font-semibold rounded-sm' onClick={signUserOut}>
                 Sign Out
          </button>
        </div>
    </>
  )
}


export default App;
