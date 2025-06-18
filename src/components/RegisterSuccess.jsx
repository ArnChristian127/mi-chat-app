export default function RegisterSuccess({ show, onClose }) {
    if (show) return null
    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60 px-6">
                <div className="bg-white p-3 flex justify-center items-center flex-col rounded-lg">
                    <h1 className="text-md md:text-lg lg:text-xl text-pink-300">Register Success! Click Ok</h1>
                    <img src="assets/cutie-4.png" alt="cutie-4" className="w-full h-auto max-w-[100px]"/> 
                    <button className="bg-pink-300 text-white mt-2 w-full rounded-lg p-1 hover:bg-pink-400 text-base sm:text-sm md:text-md lg:text-lg" onClick={onClose}>
                        Ok
                    </button>
                </div>
            </div>
        </>
    )
}