import chatterboxImage from '../images/chatterbox.png';

function Header() {
    // all img src will have the links to discord icons
    return (
        <header className="flex items-center justify-between py-4 px-6 bg-discord_blue">
            <a href="/">
                <img src={chatterboxImage} className="w-40 h-12 object-contain" alt="" />
            </a>
            <div className="hidden lg:flex  space-x-6 text-white">
                <a className="link"> Download </a>
                <a className="link"> Why ChatterBox? </a>
                <a className="link"> Premium </a>
                <a className="link"> Safety </a>
                <a className="link"> Support </a>
            </div>
            <div className="flex space-x-4">
                <button className="bg-white p-2 rounded-full text-xs md:text-sm px-4 focus:outline-none hover:shadow-2xl hover:text-discord_blurple transition duration-200 ease-in-out whitespace-nowrap font-medium">
                Login
                </button>

            </div>

        </header>
    );
}

export default Header