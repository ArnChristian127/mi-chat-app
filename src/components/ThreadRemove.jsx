import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
export default function RegisterSuccess({ show, onClose, id }) {
    if (!show) return null
    const handleDeletePost = async (postId) => {
        try {
            await deleteDoc(doc(db, "posts", postId));
            onClose();
        } catch (err) {
            console.error("Error deleting post:", err);
        }
    };
    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60 px-6">
                <div className="bg-white p-3 flex justify-center items-center flex-col rounded-lg">
                    <h1 className="text-md md:text-lg lg:text-xl text-pink-300">Are you sure to remove this post?</h1>
                    <img src="assets/cutie-4.png" alt="cutie-4" className="w-full h-auto max-w-[100px]"/> 
                    <button className="bg-pink-300 text-white mt-2 w-full rounded-lg p-1 hover:bg-pink-400 text-base sm:text-sm md:text-md lg:text-lg" onClick={() => handleDeletePost(id)}>
                        Remove
                    </button>
                    <button className="bg-pink-300 text-white mt-2 w-full rounded-lg p-1 hover:bg-pink-400 text-base sm:text-sm md:text-md lg:text-lg" onClick={onClose}>
                        Back
                    </button>
                </div>
            </div>
        </>
    )
}