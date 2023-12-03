import React, { useEffect } from 'react'
import { useState } from 'react'
import { addDoc, collection, query,where,orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore'
import {db, auth} from '../firebase-config'
import '../styles/Chat.css'
export const Chat = (props) => {
  const {room}=props;
const [newMessage,setNewMessage]=useState("");
const [messages,setMessages]=useState([])
const messageRef=collection(db,"messages")
useEffect(()=>{
  const queryMessages=query(messageRef,where("room","==", room),
  orderBy("createdAt"));
  const unsubscribe=onSnapshot(queryMessages,(snapshot)=>{
    let messages= [];
    snapshot.forEach((doc)=>{
      messages.push({...doc.data(),id:doc.id}) //syntax

    });
    setMessages(messages);
  })
  return ()=> unsubscribe();
},[])
  const handleSubmit=async (e)=>{
        e.preventDefault()
        if(newMessage==="") return;
        await addDoc(messageRef, {
          text: newMessage,
          createdAt: serverTimestamp() ,
          user: auth.currentUser.displayName,
          room
        });
        setNewMessage("")
    }
  return (
    <div className='Chat'>
      <div className='chat-app'>
    <div className="header border-2">
      <h1 >Welcome to {room.toUpperCase()}</h1>
      </div> 
      
  <div className='mt-10'> {messages.map((message)=><div className="message" key ={message.id}>
   <span className="user ">{message.user}</span>
   {message.text}
   
  </div>)}</div>
  
  <form onSubmit={handleSubmit} className='new-message-form'>
      
    <input className="new-message-input border-1 w-10/12 rounded-md"
      placeholder="Type your messsage here.."
      onChange={(e)=>setNewMessage(e.target.value)}
      value={newMessage}/>
      <button type="submit" className="send-button ml-2 w-3/12 rounded-md">
          Send
      </button>
      </form>
  </div></div>
    
  )
}
