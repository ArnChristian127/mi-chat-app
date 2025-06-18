import Navbar from "../components/Navbar";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MobileNavbar from "../components/MobileNavbar";

export default function Chatroom() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
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
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribeMessages = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
      scrollToBottom();
    });
    return () => unsubscribeMessages();
  }, []);
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    await addDoc(collection(db, "messages"), {
      text: newMessage.trim(),
      senderId: userData.uid,
      username: userData.username,
      timestamp: serverTimestamp()
    });
    setNewMessage("");
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="min-h-screen bg-pink-200">
      <div className="grid md:grid-cols-4 lg:grid-cols-4">
        <Navbar />
        <div className="col-span-3 flex flex-col h-screen">
          <div className="bg-pink-400 px-6 py-3 text-white">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="font-bold text-xl">Global Chat</h1>
              {userData && (
                <div className="bg-white px-2 py-2 hover:bg-gray-100 text-black rounded-lg flex items-center gap-2 text-plain sm:text-sm md:text-md lg:text-lg">
                  <span className="bg-pink-300 text-white font-bold rounded-full w-6 h-6 items-center justify-center flex select-none">
                    {userData.username?.charAt(0)}
                  </span>
                  <span className="select-none">{userData.username}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-3 scrollbar-custom">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.senderId === userData?.uid ? "justify-end items-end" : "justify-start items-start"}`}>
                <div className="flex items-center gap-2">
                    <span className="bg-white text-pink-300 font-bold w-8 h-8 rounded-full flex justify-center items-center">
                        {msg.username?.charAt(0).toUpperCase()}
                    </span>
                    <span>{msg.username}</span>
                </div>
                <div className={`px-4 py-1 rounded-lg max-w-xs break-words mt-2 ${
                        msg.senderId === userData?.uid
                        ? "bg-pink-500 text-white rounded-br-none"
                        : "bg-white text-black rounded-bl-none"
                    }`}>
                  {msg.text}
                </div>
                <span>
                    {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }) : ""}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="flex items-center p-3 bg-pink-300 rounded-t-2xl shadow-xl">
            <input
              className="outline-none w-full p-2 rounded-lg bg-white"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit" className="ml-4 bg-white text-pink-400 font-bold px-4 py-2 rounded-lg hover:bg-pink-100">
              Send
            </button>
          </form>
          <MobileNavbar/>
        </div>
      </div>
    </div>
  );
}
