import { useState } from 'react'
import { auth, db } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { firebaseAuthException } from '../firebase-utility'
import { useNavigate } from 'react-router-dom'
export default function Authentication() {
    const [isRegisterForm, setRegisterForm] = useState(false)
    const [isUsername, setUsername] = useState("")
    const [isGmail, setGmail] = useState("")
    const [isPassword, setPassword] = useState("")
    const [isError, setError] = useState(null);
    const navigate = useNavigate();
    const handlerForm = async (e) => {
        e.preventDefault();
        try {
            if (isRegisterForm) {
                const useCredential = await createUserWithEmailAndPassword(auth, isGmail, isPassword)
                const user = useCredential.user
                await setDoc(doc(db, "users", user.uid), {
                    username: isUsername,
                    email: isGmail,
                    createdAt: new Date()
                });
            }
            else {
                await signInWithEmailAndPassword(auth, isGmail, isPassword)
                navigate("/chatroom")
            }
        }
        catch (err) {
            setError(
                <p className="text-red-400 my-2">{firebaseAuthException(err.code)}</p>
            )
        }
    }
    return (
        <>
            <div className="bg-pink-200 min-h-screen flex flex-wrap justify-center items-center px-6 py-6 gap-10">
                <img src="assets/cutie-1.png" alt="cutie-1" className="w-100 h-auto"/>
                <div className="bg-white shadow-xl p-3 rounded-lg flex flex-col w-80 text-base sm:text-sm md:text-md lg:text-lg">
                    <h1 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-pink-300">
                        {isRegisterForm ? `Sign Up` : `Sign In`}
                    </h1>
                    <form onSubmit={handlerForm}>
                        {isRegisterForm && (
                            <input
                                className="outline-none border border-gray-300 mt-2 p-2 rounded-lg w-full"
                                placeholder="Username"
                                type="text"
                                value={isUsername}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        )}
                        <input
                            className="outline-none border border-gray-300 mt-2 p-2 rounded-lg w-full"
                            placeholder="Gmail"
                            type="email"
                            value={isGmail}
                            onChange={(e) => setGmail(e.target.value)}
                        />
                        <input
                            className="outline-none border border-gray-300 mt-2 p-2 rounded-lg w-full"
                            placeholder="Password"
                            type="password"
                            value={isPassword}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {isError}
                        <button className="bg-pink-300 hover:bg-pink-400 p-2 rounded-lg mt-2 w-full text-white">
                            {isRegisterForm ? `Register` : `Login`}
                        </button>
                    </form>
                    {isRegisterForm ? (
                        <button className="bg-pink-300 hover:bg-pink-400 p-2 rounded-lg mt-2 w-full text-white"
                            onClick={() => {
                                setRegisterForm(!isRegisterForm)
                                setGmail("")
                                setPassword("")
                            }}>
                            Back
                        </button>
                    ) :
                    (
                        <>
                            <hr className="border-t border-gray-300 my-4" />
                            <p className="text-center">
                                Don't have account? <button className="font-bold text-pink-300 hover:text-pink-400"
                                onClick={() => {
                                        setRegisterForm(!isRegisterForm)
                                        setError(null)
                                        setGmail("")
                                        setPassword("")
                                    }}>
                                    Sign Up
                                </button>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}