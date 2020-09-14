import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Conversations from "./conversations";
import Contacts from "./contacts";
import NewContactModal from "./newContact";
import NewConversationModal from "./newConversation";

export type SidebarPropsT = {
  id: string;
};

const Convo_key = "convo";
const Contacts_key = "contacts";

const Sidebar = (props: SidebarPropsT) => {
  const [activeKey, setActiveKey] = useState(Convo_key);
  const [modalOpen, setModalOpen] = useState(false);
  const ConvoOrContact = activeKey === Convo_key;
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container
        activeKey={activeKey}
        onSelect={(e: any) => setActiveKey(e)}
      >
        <Nav variant="tabs" className="justify-content">
          <Nav.Item>
            <Nav.Link eventKey={Convo_key}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={Contacts_key}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={Convo_key}>
            <Conversations />
          </Tab.Pane>
          <Tab.Pane eventKey={Contacts_key}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small">
          Your id : <span className="text-muted">{props.id}</span>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          className="btn btn-primary rounded-0"
          style={{ backgroundColor: "#25D366", border: "#25D366" }}
        >
          New {ConvoOrContact ? "Conversation" : "Contact"}
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={closeModal}>
        {ConvoOrContact ? (
          <NewConversationModal closeModal={closeModal} />
        ) : (
          <NewContactModal closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
};

export default Sidebar;
