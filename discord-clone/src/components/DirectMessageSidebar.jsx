import React from 'react';
import DirectMessageNavbar from './DirectMessageNavbar';
import DirectMessageSearch from './DirectMessageSearch';
const DirectMessageSidebar = () => {

    return (
        <div className = "sidebar">
            <DirectMessageNavbar/>
            <DirectMessageSearch/>
        </div>
    )
}

export default DirectMessageSidebar;