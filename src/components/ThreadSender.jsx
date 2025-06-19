import { useState, useEffect } from "react"
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, addDoc, serverTimestamp, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
export default function ThreadSender({show, onClose, user}) {
    const navigate = useNavigate();
    const [isInput, setInput] = useState("")
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
          if (user) {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              setUserData({ ...userSnap.data(), uid: user.uid });
            }
          } else {
            navigate("/");
          }
        });
        return () => unsubscribeAuth();
    }, [navigate]);
    const handlerPost = async (e) => {
        e.preventDefault()
        await addDoc(collection(db, "posts"), {
            postId: userData.uid,
            content: isInput,
            username: userData.username,
            createdAt: serverTimestamp(),
        });
        onClose()
    }
    if (!show) return null
    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60 px-6">
                <div className="bg-white p-3 flex justify-center items-center flex-col rounded-lg w-100">
                    <h1 className="text-xl md:text-2xl lg:text-3xl text-pink-300 font-bold">Create post</h1>
                    <hr className="border-t border-gray-300 my-4 w-full" />
                    <form className="w-full" onSubmit={handlerPost}>
                        <textarea
                            className="w-full outline-none p-2 text-xl"
                            placeholder={`What's on your mind${user?.username ? `, ${user.username}` : ""}?`}
                            value={isInput}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button className="bg-pink-300 text-white mt-2 w-full rounded-lg p-1 hover:bg-pink-400 text-base sm:text-sm md:text-md lg:text-lg">
                            Post
                        </button>
                        <button className="bg-pink-300 text-white mt-2 w-full rounded-lg p-1 hover:bg-pink-400 text-base sm:text-sm md:text-md lg:text-lg" onClick={onClose}>
                            Back
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}