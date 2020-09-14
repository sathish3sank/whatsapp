import React, { SyntheticEvent, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../contexts/contactContext";
import { useConversations } from "../contexts/conversation";

export type NewConversationModalPropsT = {
  closeModal: Function;
};

export default function NewConversationModal(
  props: NewConversationModalPropsT
) {
  const initialState: string[] = [];
  const [selectedContactId, setSelectedContactId] = useState(initialState);
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (createConversation) {
      createConversation(selectedContactId);
    }
    props.closeModal();
  };
  const getCheckboxValue = (id: string): any => selectedContactId.includes(id);

  const handleContactChange = (id: string) => {
    setSelectedContactId((prevSelectedContactIds) => {
      if (prevSelectedContactIds.includes(id)) {
        return prevSelectedContactIds.filter((prevId) => id !== prevId);
      } else {
        return [...prevSelectedContactIds, id];
      }
    });
  };

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts ? (
            contacts.map((contact: any) => (
              <Form.Group controlId={contact.id} key={contact.name}>
                <Form.Check
                  type="checkbox"
                  label={contact.name}
                  value={() => getCheckboxValue(contact.id)}
                  onChange={() => handleContactChange(contact.id)}
                />
              </Form.Group>
            ))
          ) : (
            <div></div>
          )}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}

/**
 * <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          {contacts ? (
            contacts.map((contact: any) => (
              <Form.Group controlId={contact.id} key={contact.name}>
                <Form.Check
                  type="checkbox"
                  label={contact.name}
                  value={getCheckboxValue(contact.id)}
                  onChange={() => handleContactChange(contact.id)}
                />
              </Form.Group>
            ))
          ) : (
            <div></div>
          )}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
 */
