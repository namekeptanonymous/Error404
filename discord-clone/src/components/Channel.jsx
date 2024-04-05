import { HashtagIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { setChannelInfo } from "../features/channelSlice";

function Channel({ id, channelName }) {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const setChannel = () => {
    dispatch(
      setChannelInfo({
        channelId: id,
        channelName: channelName,
      })
    );
    navigate(`/channels/${id}`); // Use navigate to change the route
  };

  return (
    <div className="font-medium flex items-center cursor-pointer text-discord_channel hover:bg-discord_channelHoverBg p-1 rounded-md hover:text-white" onClick={setChannel}>
      <HashtagIcon className="h-5 mr-2" />
      {channelName}
    </div>
  );
}

export default Channel;