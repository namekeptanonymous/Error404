/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          discord_blue: "#295DE7",
          discord_blurple: "#7289da",
          discord_purple: "#5865f2",
          discord_green: "#3ba55c",
          discord_serverBg: "#36393f",
          discord_serversBg: "#202225",
          discord_channelsBg: "#2f3136",
          discord_serverNameHoverBg:"#34373c",
          discord_channel:"#8e9297",
          discord_channelHoverBg:"#3a3c43",
          discord_userSectionText: "#b9bbbe",
          discord_iconHoverBg: "#3a3c43",
          discord_userSectionBg: "#292b2f",
          discord_iconHover: "#dcddde",
          discord_chatBg: "#36393f",
          discord_chatHeader : "#72767d",
          discord_chatHeaderInputBg: "#202225",
          discord_chatInputBg: "#40444B",
          discord_chatInputText: "#dcddde",
          discord_chatInput : "#72767d",
          discord_messageBg:"#32353b",
          discord_messageTimestamp:"#72767d",
          discord_message: "#dcddde",
          discord_deleteIcon:"#ed4245",
        },
        height:{ 
          "83vh": "83vh"
        },
        borderRadius:["hover", "focus"],

    },
     variants:{
      extend:{},
     }
     }
  }