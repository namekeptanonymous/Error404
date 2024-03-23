import { Bars3Icon } from '@heroicons/react/24/outline';
import chatterboxImage from '../images/chatterbox.png';
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from '../firebase';

function Header() {
    const [user] = useAuthState(auth);
    const navigate = useNavigate(); // useHistory() no longer exists in v6 of react-router-dom

    const signIn = (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
            .then(() => navigate("/channels"))
            .catch((error)=>alert(error.message));
    };

    return (
        <header className="flex items-center justify-between py-4 px-6 bg-discord_blue">
            <a href="/">
                <img src={chatterboxImage} className="w-12 h-12 object-contain" alt="ChatterBox Logo" />
            </a>
            <div className="hidden lg:flex  space-x-6 text-white">
                <a className="link"> Download </a>
                <a className="link"> Why ChatterBox? </a>
                <a className="link"> Premium </a>
                <a className="link"> Safety </a>
                <a className="link"> Support </a>
            </div>
            <div className="flex space-x-4">
                <button className="bg-white p-2 rounded-full text-xs md:text-sm px-4
                focus:outline-none hover:shadow-2xl hover:text-discord_blurple
                transition duration-200 ease-in-out whitespace-nowrap font-medium"
                onClick={!user ? signIn : () => navigate("/channels")}>
                    {!user ? "Login" : "Open ChatterBox"}
                </button>
                <Bars3Icon className="h-9 text-white cursor-pointer lg:hidden"/>
            

            </div>

        </header>
    );
}

export default Header