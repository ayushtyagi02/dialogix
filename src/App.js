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
        <Auth setIsAuth={setIsAuth}/>
      </div>
    );
  }
  return (
    <>
      {room ? (
        <Chat room={room}/>
      ) : (
        <div className='room'>
          <label> Enter room name</label>
          <input ref={roomInputRef}></input>
          <button onClick={()=>setRoom(roomInputRef.current.value)}>Enter Chat</button>
        </div>)}
        <div className="sign-out">
          <button onClick={signUserOut}>
                 Sign Out
          </button>
        </div>
    </>
  )
}


export default App;
