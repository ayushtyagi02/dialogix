import React from 'react'
import { auth, provider } from "../firebase-config.js"
import { signInWithPopup } from 'firebase/auth'
import "../styles/Auth.css" 
import Cookies from 'universal-cookie'
const cookies = new Cookies()


export const Auth = (props) => {
    const { setIsAuth } = props;
    async function signInWithGoogle() {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true)
        }
        catch (e) {
            console.error(e);
        }
    }
    return (
        <div className='fixed w-full'>
            <h2 className='mt-[15vw]'>Dialogix</h2>
            <div className=' auth flex flex-col gap-10 p-8 drop-shadow-md bg-slate-100 w-3/12 mx-auto ' >
            <p className='text-slate-500'>Sign in with Google to continue </p>
            <div className='h-[3px] bg-gray-200 w-4/12 mx-auto rounded-md'></div>
            <button className='bg-blue-700 w-8/12 mx-auto text-white rounded-md p-3 font-semibold'  onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
        </div>
        
    )
}
