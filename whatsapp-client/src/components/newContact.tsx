import React, { useRef, SyntheticEvent } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useContacts } from "../contexts/contactContext";
//import { useContacts } from "../contexts/contactContext";
export type NewContactModalPropsT = {
  closeModal: Function;
};

export default function NewContactModal(props: NewContactModalPropsT) {
  const idRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { contacts, createContact } = useContacts();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (createContact) {
      createContact(idRef.current.value, nameRef.current.value);
    }
    props.closeModal();
  };
  return (
    <>
      <Modal.Header closeButton>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group>
            <Form.Label>Id :</Form.Label>
            <Form.Control type="text" ref={idRef} required></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Name :</Form.Label>
            <Form.Control type="text" ref={nameRef} required></Form.Control>
          </Form.Group>
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}
