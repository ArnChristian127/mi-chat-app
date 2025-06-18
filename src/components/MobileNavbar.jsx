export default function MobileNavbar() {
    return (
        <>
            <nav className="bg-white px-6 py-4 md:hidden">
                <div className="container mx-auto flex justify-center items-center">
                    <button>Thread</button>
                    <button>About</button>
                    <button>Logout</button>
                </div>
            </nav>
        </>
    )
}