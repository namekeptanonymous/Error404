import React from 'react'
import './chatheader.css'

export const ChatHeader = () => {
  return (
    <div className="chatheader">
    <div className="chatheaderleft">
    <h3>
        <span className="chatheaderhash">
        #
        </span>
        Test Channel Name
    </h3>

    </div>

    <div className="chatheaderright">
        <img src="" alt="Members List" />

        <div className="chatheadersearch">
            <input placeholder='Search' />
            <img src="" alt="Search icon" />
        </div>

        </div>
    </div>
  )

}
