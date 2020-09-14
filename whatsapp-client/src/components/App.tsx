import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Login from "./login";
import Dashboard from "./dashboard";
import { ContactsProvider } from "../contexts/contactContext";
import {
  ConversationsProvider,
  useConversations,
} from "../contexts/conversation";
import { SocketProvider } from "../contexts/socketProvider";

function App() {
  const [id, setId] = useLocalStorage("id");
  const { conversations } = useConversations();
  console.log(conversations);
  const dashboard = (
    <SocketProvider id ={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );
  console.info(dashboard);
  return id ? dashboard : <Login onIdSubmit={setId} />;
}

export default App;
