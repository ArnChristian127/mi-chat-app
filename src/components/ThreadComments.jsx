import { useState, useEffect } from "react";
import { addDoc, collection, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
export default function ThreadComments({show, onClose, id, user}) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    useEffect(() => {
        const q = query(
            collection(db, "posts", id, "comments"),
            orderBy("createdAt", "asc")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedComments = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setComments(fetchedComments);
        });
        return () => unsubscribe();
    }, [id]);
    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        await addDoc(collection(db, "posts", id, "comments"), {
            username: user.username,
            userId: user.uid,
            content: newComment.trim(),
            createdAt: serverTimestamp()
        });
        setNewComment("");
    };
    if (!show) return null;
    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60 px-6">
                <div className="bg-white p-3 flex justify-center items-center flex-col rounded-lg w-100">
                    <h1 className="text-md md:text-lg lg:text-xl text-pink-300 font-bold">Comments</h1>
                    <hr className="border-t border-gray-300 my-4 w-full"/>
                    <div className="h-70 overflow-y-auto space-y-3 scrollbar-custom w-full">
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment.id} className="bg-gray-100 p-2 rounded-lg">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="bg-pink-300 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm">
                                            {comment.username?.charAt(0).toUpperCase() || "?"}
                                        </span>
                                        <span className="text-sm font-medium">{comment.username || "Unknown"}</span>
                                        {comment.createdAt?.toDate && (
                                            <span className="ml-auto text-xs text-gray-400">
                                                {new Date(comment.createdAt.toDate()).toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-800 whitespace-pre-wrap">{comment.content}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-sm text-gray-400">No comments yet.</p>
                        )}
                    </div>
                    <div className="flex w-full items-center">
                        <textarea
                            className="outline-none p-2 border-gray-400 border-1 rounded-lg w-full"
                            placeholder="Add comment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button onClick={handleAddComment} className="ml-2 text-white font-bold px-4 py-2 rounded-lg bg-pink-300 hover:bg-pink-400 flex items-center gap-1">
                            Send
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
                            </svg>
                        </button>
                    </div>
                    <button className="bg-pink-300 text-white mt-2 w-full rounded-lg p-1 hover:bg-pink-400 text-base sm:text-sm md:text-md lg:text-lg" onClick={onClose}>
                        Back
                    </button>
                </div>
            </div>
        </>
    )
}