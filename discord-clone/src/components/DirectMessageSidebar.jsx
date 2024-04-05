import React from 'react';
import DirectMessageNavbar from './DirectMessageNavbar';
import DirectMessageSearch from './DirectMessageSearch';
import DirectMessageChats from './DirectMessageChats';
const DirectMessageSidebar = () => {

    return (
        <div className = "sidebar">
            <DirectMessageNavbar/>
            <DirectMessageSearch/>
            <DirectMessageChats/>
        </div>
    )
}

export default DirectMessageSidebar;