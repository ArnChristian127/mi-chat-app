import { useState } from "react"
import Logout from "./Logout"
import { useNavigate } from "react-router-dom"
export default function Navbar() {
    const [isLogout, setLogout] = useState(false);
    const navigate = useNavigate();
    return (
        <>
            {isLogout && (
                <Logout show={isLogout} onClose={() => setLogout(false)}/>
            )}
            <nav className="bg-white h-screen w-full px-6 py-4 hidden md:block">
                <div className="container mx-auto flex justify-between flex-col h-full">
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-gray-400">
                                {`Mi-`}<span className="text-pink-300">Chat</span>
                            </h1>
                            <img src="assets/cutie-1.png" className="w-full h-auto max-w-[60px]" alt="cutie-1"/>
                        </div>
                        <hr className="border-t border-gray-300 my-3" />
                        <button className="bg-pink-300 p-2 rounded-lg text-white hover:bg-pink-400 flex items-center gap-5" onClick={() => navigate("/threads")}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-threads" viewBox="0 0 16 16">
                                <path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161"/>
                            </svg>
                            Thread
                        </button>
                        <button className="bg-pink-300 p-2 rounded-lg text-white hover:bg-pink-400 mt-2 flex items-center gap-5" onClick={() => navigate("/chatroom")}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="25" height="25">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.28-.97L3 20l1.28-3.72A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                            </svg>
                            Chatroom
                        </button>
                        <button className="bg-pink-300 p-2 rounded-lg text-white hover:bg-pink-400 mt-2 flex items-center gap-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-patch-question-fill" viewBox="0 0 16 16">
                                <path d="M5.933.87a2.89 2.89 0 0 1 4.134 0l.622.638.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01zM7.002 11a1 1 0 1 0 2 0 1 1 0 0 0-2 0m1.602-2.027c.04-.534.198-.815.846-1.26.674-.475 1.05-1.09 1.05-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.7 1.7 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745.336 0 .504-.24.554-.627"/>
                            </svg>
                            About
                        </button>
                    </div>
                    <div className="flex flex-col">
                        <hr className="border-t border-gray-300 my-3" />
                        <button className="bg-pink-300 p-2 rounded-lg text-white hover:bg-pink-400 flex items-center gap-5" onClick={() => setLogout(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-bar-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8m-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5"/>
                            </svg>
                            Logout
                        </button>
                        <h1 className="text-base text-gray-500 mt-2">&copy;{new Date().getFullYear()} ArnDev. All rights reserved.</h1>
                    </div>
                </div>
            </nav>
        </>
    )
}