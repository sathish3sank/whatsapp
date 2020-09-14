import React, { SyntheticEvent, useState, useCallback } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { useConversations } from "../contexts/conversation";

export default function OpenConversation() {
  const [text, setText] = useState("");
  const { selectedConversation, sendMessage } = useConversations();
  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (sendMessage) {
      sendMessage(
        selectedConversation.recipients.map((r: any) => r.id),
        text
      );
    }
    setText("");
  };
  return (
    <div className="d-flex flex-column flew-grow-1" style = {{width : "80%"}}>
      <div className="flex-grow-1 overflow-auto">
        <div className="h-100 d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation.messages.map((message: any, index: number) => {
            const lastMessage =
              selectedConversation.messages.length - 1 === index;
            return (
              <div
                ref={lastMessage ? setRef : null}
                key={index}
                className={`my-1 d-flex flex-column ${
                  message.fromMe ? "align-self-end" : ""
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.fromMe ? "bg-primary text-white" : "border"
                  }`}
                >
                  {message.text}
                </div>
                <div
                  className={`text-muted small ${
                    message.fromMe ? "text-right" : ""
                  }`}
                >
                  {message.fromMe ? "You" : message.senderName}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup style={{ width: "100%" }}>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={(e: any) => {
                setText(e.target.value);
              }}
              style={{ height: "60px", resize: "none" }}
            />
            <InputGroup.Append>
              <Button type="submit">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}
