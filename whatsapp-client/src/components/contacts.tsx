import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { ListGroup } from "react-bootstrap";
import { useContacts } from "../contexts/contactContext";

export default function Contacts() {
  const { contacts } = useContacts();
  return (
    contacts ? <ListGroup variant="flush">
      {contacts.map((e: any) => (
        <ListGroup.Item key={e.id}>{e.name}</ListGroup.Item>
      ))}
    </ListGroup> : <div></div> 
    
  );
}
