import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import DirectMessageMessage from "./DirectMessageMessage";

const DirectMessageMessages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages);

  return (
    <div className="messages">
      {messages.map((m) => {
        // Ensure that m.text is a string
        if (typeof m.text === "string") {
          return <DirectMessageMessage message={m} key={m.id} />;
        } else {
          // Handle the case where m.text is not a string
          console.error("Message text is not a string:", m);
          return null; // or some fallback UI
        }
      })}
    </div>
  );
};

export default DirectMessageMessages;
