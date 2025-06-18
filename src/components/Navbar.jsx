import { auth } from "../firebase";
import { signOut} from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
    const navigate = useNavigate();
    const logout = () => {
        signOut(auth);
        navigate("/");
    };
    return (
        <>
            <nav className="bg-white h-screen w-full px-6 py-4 hidden md:block">
                <div className="container mx-auto flex justify-between flex-col h-full">
                    <div className="flex flex-col">
                        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
                            {`Mi-`}<span className="text-pink-300">Chat</span>
                        </h1>
                        <hr className="border-t border-gray-300 my-3" />
                        <button className="bg-pink-300 p-1 rounded-lg text-white hover:bg-pink-400">Thread</button>
                        <button className="bg-pink-300 p-1 rounded-lg text-white hover:bg-pink-400 mt-2">About</button>
                    </div>
                    <div className="flex flex-col">
                        <hr className="border-t border-gray-300 my-3" />
                        <button className="bg-pink-300 p-1 rounded-lg text-white hover:bg-pink-400" onClick={logout}>Logout</button>
                    </div>
                </div>
            </nav>
        </>
    )
}