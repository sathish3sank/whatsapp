import React, { useContext, useState, useEffect, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useContacts } from "./contactContext";
import { useSocket } from "./socketProvider";

export type ConversationProviderT = {
  children: any;
};

export type ConversationT = {
  id: string;
  name: string;
};

export type ConversationContext = {
  conversations: Array<any>;
  createConversation: (recipients: string[]) => void;
  sendMessage: (recipients: any, text: any) => void;
  selectConversationIndex: any;
  selectedConversation: any;
};

export const ConversationContext = React.createContext<
  Partial<ConversationContext>
>({});

export const useConversations = () => useContext(ConversationContext);

export const ConversationsProvider = ({ id, children }: any): JSX.Element => {
  const [conversations, setConversations] = useLocalStorage("conversation", []);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts();
  const socket = useSocket();
  const createConversation = (recipients: string[]) => {
    setConversations((prevConversations: string[]) => [
      ...prevConversations,
      { recipients, messages: [] },
    ]);
  };

  const arrayEquality = (a: any[], b: any[]) => {
    if (a.length !== b.length) {
      return false;
    }
    a.sort();
    b.sort();
    return a.every((ele, index) => ele === b[index]);
  };

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }: any) => {
      setConversations((prevConversations: any) => {
        const newMessage = { sender, text };
        console.log(newMessage);
        let madeChange = false;
        const newConversation = prevConversations.map((conversation: any) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }
          return conversation;
        });

        if (madeChange) {
          return newConversation;
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket == null) return;

    socket.on("receive-message", addMessageToConversation);

    return () => socket.off("receive-message");
  }, [socket, addMessageToConversation]);

  const sendMessage = (recipients: any, text: any) => {
    socket.emit("send-message", { recipients, text });
    addMessageToConversation({ recipients, text, sender: id });
  };

  const formattedConversations = conversations.map(
    (conversation: any, index: number) => {
      const recipients = conversation.recipients.map((recipient: string) => {
        const contact = contacts?.find(
          (contact: any) => recipient === contact.id
        );
        const name = (contact && contact.name) || recipient;
        return { id: recipient, name };
      });
      const messages = conversation.messages.map((message: any) => {
        const contact = contacts?.find(
          (contact: any) => contact.id === message.sender
        );
        const name = (contact && contact.name) || message.sender;
        const fromMe = id === message.sender;
        console.log(message, name, fromMe);
        return { ...message, senderName: name, fromMe };
      });

      const selected = index === selectedConversationIndex;

      return { ...conversation, messages, recipients, selected };
    }
  );
  const value: ConversationContext = {
    conversations: formattedConversations,
    createConversation,
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    selectedConversation: formattedConversations[selectedConversationIndex],
  };
  return (
    <ConversationContext.Provider value={value}>
      {children}
    </ConversationContext.Provider>
  );
};
