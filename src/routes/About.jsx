import MobileNavbar from "../components/MobileNavbar";
import Navbar from "../components/Navbar";

export default function About() {
    return (
        <div className="min-h-screen bg-pink-200">
            <div className="grid md:grid-cols-4 lg:grid-cols-4">
                <Navbar/>
                 <div className="col-span-3 flex flex-col h-screen">
                    <div className="bg-pink-400 px-6 py-4 text-white">
                        <div className="container mx-auto flex justify-between items-center">
                            <h1 className="font-bold text-xl">About</h1>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3 scrollbar-custom py-5">
                        <div className="container mx-auto px-6 py-5">
                            <div className="flex flex-col items-center justify-center">
                                <h1 className="font-bold text-4xl text-gray-400">
                                    {`Mi-`}<span className="text-pink-300">Chat</span>
                                </h1>
                                <img src="assets/cutie-1.png" className="w-full h-auto max-w-[300px] mx-auto mt-4" alt="cutie-1"/>
                            </div>
                            <div className="mt-6 text-gray-800">
                                <h2 className="text-3xl font-bold mb-3 text-gray-600">Project Overview</h2>
                                <p className="text-lg mb-4">
                                    Mi-Chat is a simple chat application built with React, Firebase, and Tailwind CSS.
                                    It allows users to create threads, send messages, and interact with each other in real-time.
                                </p>
                                <div className="mb-4 flex flex-col items-start gap-2">
                                    <p className="text-lg">
                                        This project is open-source and available on GitHub.
                                        Feel free to contribute or use it as a reference for your own projects.
                                    </p>
                                    <a className="bg-pink-300 hover:bg-pink-400 p-2 rounded-lg text-white font-bold" href="#">
                                        View Source Code
                                    </a>
                                </div>
                                <h2 className="text-3xl font-bold mb-3 text-gray-600">Developer of this Project</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                                    <div className="bg-pink-300 rounded-lg p-3 flex items-center gap-2 shadow-lg">
                                        <img src="assets/arn-pogi.png" alt="arn-pogi" className="w-full h-auto max-w-[100px] rounded-full"/>
                                        <div className="mb-5">
                                            <h1 className="text-2xl font-bold text-gray-600">Arn Christian S. Rosales</h1>
                                            <p>Junior Developer</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <MobileNavbar/>
                </div>
            </div>
        </div>
    )
}