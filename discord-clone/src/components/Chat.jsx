import { HashtagIcon, UsersIcon, MagnifyingGlassIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useSelector }from "react-redux";
import { selectChannelId, selectChannelName } from "../features/channelSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useRef, useState } from "react";
import { collection, addDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from './Message.jsx'

function Chat() {
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [user] = useAuthState(auth);
    const inputRef = useRef("");
    const chatRef = useRef(null);
    const [messages] = useCollection(
        channelId &&
        query(
            collection(db, "channels", channelId, "messages"),
            orderBy("timestamp", "asc")
          )
      );

    const[users]=useCollection(collection(db, "users"));
    const[admins]=useCollection(collection(db, "admins"));
    const scrollToBottom = () => {
        chatRef.current.scrollIntoView({
            behavior: "smooth", 
            block: "start",
        });
    };

    const sendMessage = (e) => {
        e.preventDefault();
        if (inputRef.current.value !== "") {
            addDoc(collection(db, "channels", channelId, "messages"), {
                timestamp: serverTimestamp(),
                message: inputRef.current.value,
                name: user?.displayName,
                photoURL: user?.photoURL,
                email: user?.email,
              });
        }
        inputRef.current.value="";
        scrollToBottom();
    };

    // Add a state variable for the panel visibility
    const [isPanelOpen, setPanelOpen] = useState(false);

    // Function to toggle the panel
    const togglePanel = () => {
        setPanelOpen(!isPanelOpen);
    };

    return (
        <div className = "flex flex-col h-screen">
            <header className = "flex items-center justify-between space-x-5 border-b border-gray-800 p-4 -mt-1">
                <div className="flex items-center space-x-1">
                    <HashtagIcon className = "h-6 text-discord_chatHeader"/>
                    <h4 className = "text-white font-semibold"> {channelName} </h4>
                </div>
                <div className="flex space-x-3">
                    {channelId && 
                        <UsersIcon className="icon" onClick={togglePanel} />
                    }
                    <div className="flex bg-discord_chatHeaderInputBg text-xs p-1 rounded-md">
                        <input type="text" placeholder="Search" className="bg-transparent focus:outline-none text-white pl-1 placeholder-discord_chatHeader" />
                        <MagnifyingGlassIcon className="h-5 text-discord_chatHeader mr-1" />
                    </div>
                </div>
            </header>
            <main className="flex-grow overflow-y-scroll scrollbar-hide">
                {messages?.docs.map((doc) => {
                    const {message, timestamp, name, photoURL, email} = doc.data();
                    return (
                        <Message 
                            key={doc.id}
                            id={doc.id}
                            message={message}
                            timestamp={timestamp}
                            name={name}
                            email={email}
                            photoURL={photoURL}
                        />
                    );
                })}
                <div ref={chatRef} className="pb-16"/>
            </main>
            <div className="flex items-center p-2.5 bg-discord_chatInputBg mx-5 mb-7 rounded-lg">
                <form className="flex flex-grow">
                    <input
                        type="text"
                        disabled={!channelId}
                        placeholder={
                            channelId ? `Message #${channelName}` : "Select a channel"
                        }
                        className="bg-transparent focus:outline-none text-discord_chatInputText w-full placeholder-discord_chatInput text-sm"
                        ref={inputRef}
                    />
                    <button hidden type="submit" onClick={sendMessage}>Send</button>
                    <PaperAirplaneIcon className="icon cursor-pointer" onClick={sendMessage} />
                </form>
            </div>
            {isPanelOpen && channelId && (
                <div className="absolute space-y-2 p-4 mb-4 bg-discord_channelsBg text-white right-0 top-14 h-screen w-64">
                    <span className="text-discord_channel uppercase text-sm font-bold">Admins</span>
                    {admins?.docs.map((doc) => {
                        const {email, name, photoURL, uid} = doc.data();
                        return (
                            <div className="flex items-center font-medium hover:bg-discord_channelHoverBg rounded-md p-1">
                                <img src={photoURL} alt="" className="h-10 rounded-full cursor-pointer mr-3 hover:shadow-2xl" referrerPolicy="no-referrer"/>
                                <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">{name}</p>
                            </div>
                        );
                    })}
                    <br/>
                    <span className="text-discord_channel uppercase text-sm font-bold">Members</span>
                    {users?.docs.map((doc) => {
                        const {email, name, photoURL, uid} = doc.data();
                        return (
                            <div className="flex items-center font-medium hover:bg-discord_channelHoverBg rounded-md p-1">
                                <img src={photoURL} alt="" className="h-10 rounded-full cursor-pointer mr-3 hover:shadow-2xl" referrerPolicy="no-referrer"/>
                                {name}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    )
}

export default Chat;