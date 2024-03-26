import { HashtagIcon } from "@heroicons/react/24/outline";
import { useSelector }from "react-redux";
import { selectChannelId, selectChannelName } from "../features/channelSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function Chat() {
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [user] = useAuthState(auth);
    return (
        <div className = "flex flex-col h-screen">
            <header className = "flex items-center justify-between space-x-5 border-b border-gray-800 p-4 -mt-1">
                <div>
                    <HashtagIcon className = "h-6 text-discord_chatHeaderIcon"/>
                    <h4 className = "text-white font-semibold"> {channelName} </h4>
                </div>
            </header>
        </div>
    )
}

export default Chat;