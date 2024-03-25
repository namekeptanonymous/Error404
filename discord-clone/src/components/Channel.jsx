import {HashtagIcon} from "@heroicons/react/outline";
function Channel({id,channelName}){
    const setChannel =() =>{};
    return(
        <div className= "font-medium flex items-center cursor-pointer hover:bg-discord_channelHoverBg p-1 rounded-md hover:text-white">
           <HashtagIcon className = "h-5 mr-2" onClick ={setChannel}/> {channelName}
        </div>
    )
}

export default Channel;