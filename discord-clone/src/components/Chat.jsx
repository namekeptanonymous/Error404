import React, { useRef, useEffect, useState } from 'react';
import { HashtagIcon, UsersIcon, MagnifyingGlassIcon, PaperAirplaneIcon, PlusIcon, TrashIcon, ShieldCheckIcon, ShieldExclamationIcon } from "@heroicons/react/24/solid";
import { useSelector }from "react-redux";
import { selectChannelId, selectChannelName } from "../features/channelSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, doc, setDoc, addDoc, deleteDoc, serverTimestamp, query, orderBy, getDocs, where } from "firebase/firestore";
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

    const [admins] = useCollection(collection(db, "channels", channelId || 'default', "admins"));
    const [adminEmailExists, setAdminEmailExists] = useState(false); // State to hold whether the admin email exists

    const checkAdminEmail = async (emailToFind) => {
      const q = query(
        collection(db, "channels",  channelId || 'default', "admins"),
        where("email", "==", emailToFind)
      );
    
      const querySnapshot = await getDocs(q);
    
      setAdminEmailExists(!querySnapshot.empty);
    };

    useEffect(() => {
        if (user) {
            setPanelOpen(false);
            checkAdminEmail(user?.email);
        }
    }, [channelId]);

    const[users]=useCollection(collection(db, "users"));

    const channelMembersCollection = collection(db, "channels", channelId || 'default', "channelUsers");
    const [channelMembers] = useCollection(channelId ? channelMembersCollection : null);
    
    const scrollToBottom = () => {
        chatRef.current.scrollIntoView({
            behavior: "smooth", 
            block: "start",
        });
    };

    const channelUserIds = channelMembers?.docs.map(doc => doc.id);
    const nonChannelMembers = channelUserIds && users?.docs.filter(doc => !channelUserIds.includes(doc.id));

    // Function to store/update user data in Firestore
    const storeUserInCollection = async (email, name, photoURL, uid, collection) => {
        const channelUserRef = doc(db, "channels", channelId, collection, uid);
        try {
            await setDoc(channelUserRef, {
                uid,
                email,
                name,
                photoURL
            }, { merge: true }); // Using merge to avoid overwriting existing data
            console.log("User added to channel");
        } catch (error) {
            console.error("Error storing user in channel: ", error);
        }
    };
    const removeUserFromCollection = async (uid, collection) => {
        const channelUserRef = doc(db, "channels", channelId, collection, uid);
        try {
          await deleteDoc(channelUserRef);
          console.log("User removed");
        } catch (error) {
          console.error("Error removing user: ", error);
        }
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

    const adminUserIds = admins?.docs.map(doc => doc.id);
    const nonAdminMembers = adminUserIds && channelMembers?.docs.filter(doc => !adminUserIds.includes(doc.id));

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
                <div className="absolute space-y-2 p-4 mb-4 bg-discord_channelsBg text-white right-0 top-14 w-72 overflow-auto scrollbar-hide h-[calc(100vh-3.5rem)]">
                    <span className="text-discord_channel uppercase text-sm font-bold">Admins</span>
                    {admins?.docs.map((doc) => {
                        const {email, name, photoURL, uid} = doc.data();
                        return (
                            <div className="flex items-center justify-between font-medium hover:bg-discord_channelHoverBg rounded-md p-1 group" key={doc.id}>
                                <span className="flex items-center">
                                    <img src={photoURL} alt="" className="h-10 rounded-full cursor-pointer mr-3 hover:shadow-2xl" referrerPolicy="no-referrer"/>
                                    {name}
                                </span>
                                {adminEmailExists && (user?.uid !== uid) &&
                                    <div className='flex items-center justify-between'>
                                        <div className="ml-auto p-1 rounded-sm cursor-pointer group-hover:bg-discord_deleteIcon group-hover:text-white opacity-0 group-hover:opacity-100 mr-1">
                                            <ShieldExclamationIcon
                                                className="h-5"
                                                onClick={() => {
                                                    removeUserFromCollection(uid, "admins");
                                                }}
                                            />
                                        </div>
                                        <div className="ml-auto p-1 rounded-sm cursor-pointer group-hover:bg-discord_deleteIcon group-hover:text-white opacity-0 group-hover:opacity-100">
                                            <TrashIcon
                                                className="h-5"
                                                onClick={() => {
                                                    removeUserFromCollection(uid, "channelUsers");
                                                    removeUserFromCollection(uid, "admins");
                                                }}
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                        );
                    })}
                    <br/>
                    <span className="text-discord_channel uppercase text-sm font-bold flex items-center justify-between">Members</span>
                    {nonAdminMembers?.map((doc) => {
                        const {email, name, photoURL, uid} = doc.data();
                        return (
                            <div className="flex items-center justify-between font-medium hover:bg-discord_channelHoverBg rounded-md p-1 group" key={doc.id}>
                                <span className="flex items-center">
                                    <img src={photoURL} alt="" className="h-10 rounded-full cursor-pointer mr-3 hover:shadow-2xl" referrerPolicy="no-referrer"/>
                                    {name}
                                </span>
                                {adminEmailExists && (user?.uid !== uid) &&
                                    <div className='flex items-center justify-between'>
                                        <div className="ml-auto p-1 rounded-sm cursor-pointer group-hover:bg-discord_green group-hover:text-white opacity-0 group-hover:opacity-100 mr-1">
                                            <ShieldCheckIcon
                                                className="h-5"
                                                onClick={() => {
                                                    storeUserInCollection(email, name, photoURL, uid, "admins");
                                                }}
                                            />
                                        </div>
                                        <div className="ml-auto p-1 rounded-sm cursor-pointer group-hover:bg-discord_deleteIcon group-hover:text-white opacity-0 group-hover:opacity-100">
                                            <TrashIcon
                                                className="h-5"
                                                onClick={() => {
                                                    removeUserFromCollection(uid, "channelUsers");
                                                }}
                                            />
                                        </div>
                                    </div>
                                }
                            </div>
                        );
                    })}
                    {nonAdminMembers.length==0 && (<div className="text-discord_channel text-center">No regular members found.</div>)}
                    <br/>
                    <span className="text-discord_channel uppercase text-sm font-bold flex items-center justify-between">Non-members</span>
                    {nonChannelMembers?.map((doc) => {
                        const {email, name, photoURL, uid} = doc.data();
                        return (
                            <div className="flex items-center justify-between font-medium hover:bg-discord_channelHoverBg rounded-md p-1 opacity-45" key={doc.id}>
                                <span className="flex items-center">
                                    <img src={photoURL} alt="" className="h-10 rounded-full cursor-pointer mr-3 hover:shadow-2xl" referrerPolicy="no-referrer"/>
                                    {name}
                                </span>
                                {adminEmailExists &&
                                    <PlusIcon 
                                        className="icon h-5"
                                        onClick={() => {
                                            storeUserInCollection(email, name, photoURL, uid, "channelUsers");
                                        }}
                                    />
                                }
                            </div>
                        );
                    })}
                    {nonChannelMembers.length==0 && (<div className="text-discord_channel text-center">No non-members found.</div>)}
                </div>
            )}
        </div>
    )
}

export default Chat;