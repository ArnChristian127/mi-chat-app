import { auth} from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function Logout({ show, onClose }) {
    const navigate = useNavigate();
    const logout = () => {
        signOut(auth);
        navigate("/");
    };
    if (!show) return null;
    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60 px-6">
                <div className="bg-white p-3 flex justify-center items-center flex-col rounded-lg">
                    <h1 className="text-md md:text-lg lg:text-xl text-pink-300">Are you going to logout now?</h1>
                    <img src="assets/cutie-3.png" alt="cutie-3" className="w-full h-auto max-w-[100px]"/> 
                    <button className="bg-pink-300 text-white mt-2 w-full rounded-lg p-1 hover:bg-pink-400 text-base sm:text-sm md:text-md lg:text-lg" onClick={logout}>
                        Yes
                    </button>
                    <button className="bg-pink-300 text-white mt-2 w-full rounded-lg p-1 hover:bg-pink-400 text-base sm:text-sm md:text-md lg:text-lg" onClick={onClose}>
                        No
                    </button>
                </div>
            </div>
        </>
    );
}