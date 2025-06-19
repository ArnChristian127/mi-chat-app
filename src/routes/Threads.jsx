import Navbar from "../components/Navbar"
import MobileNavbar from "../components/MobileNavbar"
import ThreadSender from "../components/ThreadSender";
import ThreadRemove from "../components/ThreadRemove";
import ThreadComments from "../components/ThreadComments";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
export default function Threads() {
    const navigate = useNavigate();
    const [isPost, setPost] = useState(false);
    const [isUpload, setUpload] = useState([]);
    const [userData, setUserData] = useState(null);
    const [isRemovePost, setRemovePost] = useState(false);
    const [getPostId, setPostId] = useState(null);
    const [isComments, setComments] = useState(false);
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
    useEffect(() => {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const posts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUpload(posts);
        });
        return () => unsubscribe();
    }, []);
    return (
        <>
            {isPost && <ThreadSender show={isPost} onClose={() => setPost(false)} user={userData}/>}
            {isRemovePost && <ThreadRemove show={isRemovePost} onClose={() => setRemovePost(false)} id={getPostId}/>}
            {isComments && <ThreadComments show={isComments} onClose={() => setComments(false)} id={getPostId} user={userData}/>}
            <div className="min-h-screen bg-pink-200">
                <div className="grid md:grid-cols-4 lg:grid-cols-4">
                    <Navbar/>
                    <div className="col-span-3 flex flex-col h-screen">
                        <div className="bg-pink-400 px-6 py-3 text-white">
                            <div className="container mx-auto flex justify-between items-center">
                                <h1 className="font-bold text-xl">Threads</h1>
                                {userData && (
                                    <div className="bg-white px-1 py-1 hover:bg-gray-100 text-black rounded-lg flex items-center gap-2 text-plain sm:text-sm md:text-md lg:text-lg">
                                        <span className="bg-pink-300 text-white font-bold rounded-full w-6 h-6 items-center justify-center flex select-none">
                                            {userData.username?.charAt(0).toUpperCase()}
                                        </span>
                                        <span className="select-none">{userData.username}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-3 scrollbar-custom">
                            {userData && (
                                <button className="bg-white p-3 hover:bg-gray-100 text-black rounded-2xl flex items-center gap-2 text-plain sm:text-sm md:text-md lg:text-lg shadow-lg w-full" onClick={() => setPost(true)}>
                                    <span className="bg-pink-300 text-white font-bold rounded-full w-8 h-8 items-center justify-center flex select-none">
                                        {userData.username?.charAt(0).toUpperCase()}
                                    </span>
                                    <span className="flex items-center justify-between w-full">
                                        <p className="ml-3 text-gray-400">What's in your mind?</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-plus-square-fill text-pink-300 mr-3" viewBox="0 0 16 16">
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
                                        </svg>
                                    </span>
                                </button>
                            )}
                            {isUpload.map((post) => (
                                <div key={post.id} className="bg-white p-4 rounded-xl shadow-md">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="bg-pink-300 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
                                            {post.username?.charAt(0).toUpperCase() || "?"}
                                        </span>
                                        <span className="font-medium text-gray-800">{post.username || "Unknown"}</span>
                                        {post.createdAt?.toDate && (
                                            <span className="text-gray-400 text-sm ml-auto">
                                                {new Date(post.createdAt.toDate()).toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-700 whitespace-pre-wrap my-2">{post.content}</p>
                                    <hr className="border-t border-gray-300 my-4" />
                                    <>
                                        <div className="flex gap-2">
                                            {post.postId === userData?.uid ? (
                                                <button className="bg-pink-300 text-white mt-2 w-full rounded-lg p-1 hover:bg-pink-400 text-base sm:text-sm md:text-md lg:text-lg"
                                                    onClick={() => {
                                                        setRemovePost(true)
                                                        setPostId(post.id)
                                                    }}>
                                                    Delete
                                                </button>
                                            ) : null}
                                            <button className="bg-pink-300 text-white mt-2 w-full rounded-lg p-1 hover:bg-pink-400 text-base sm:text-sm md:text-md lg:text-lg" onClick={() => {
                                                setComments(true)
                                                setPostId(post.id)
                                            }}>
                                                Comments
                                            </button>
                                        </div>
                                    </>
                                </div>
                            ))}
                        </div>
                        <MobileNavbar/>
                    </div>
                </div>
            </div>
        </>
    )
}
