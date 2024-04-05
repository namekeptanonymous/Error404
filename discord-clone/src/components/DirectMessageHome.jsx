import React from 'react';
import "../styles.scss";
import DirectMessageSidebar from '../components/DirectMessageSidebar';
import DirectMessageChat from '../components/DirectMessageChat';
const DirectMessageHome = () => {

    return (
        <div className = "home">
            <div className= "container">
                <DirectMessageSidebar/>
                <DirectMessageChat/>
            </div>
            
        </div>
    )
}

export default DirectMessageHome;