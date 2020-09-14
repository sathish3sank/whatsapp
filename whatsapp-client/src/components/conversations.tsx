import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../contexts/conversation";

export default function Conversations() {
  const { conversations,selectConversationIndex } = useConversations();
  return conversations ? (
    <ListGroup variant="flush">
      {conversations.map((conversation: any, index) => (
        <ListGroup.Item
          key={index}
          action
          onClick={() => selectConversationIndex(index)}
          active={conversation.selected}
        >
          {conversation.recipients.map((e: any) => e.name).join(",")}
        </ListGroup.Item>
      ))}
    </ListGroup>
  ) : (
    <div></div>
  );
}
