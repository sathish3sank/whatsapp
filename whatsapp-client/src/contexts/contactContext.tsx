import React, { useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export type ContactsProviderT = {
  children: any;
};

export type ContactsT = {
  id: string;
  name: string;
};

export interface ContactContextT {
  contacts?: any;
  createContact?: (id: string, name: string, state: any) => void;
  state?: any;
}

export type ContactContext = {
  contacts: Array<any>;
  createContact: (id: string, name: string) => void;
};

export const ContactContext = React.createContext<Partial<ContactContext>>({});

export const useContacts = () => useContext(ContactContext);

export const ContactsProvider = ({ children }: any): JSX.Element => {
  console.log(children);
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const createContact = (id: string, name: string) => {
    setContacts((prevContacts: ContactsT[]) => [...prevContacts, { id, name }]);
  };

  return (
    <ContactContext.Provider
      value={{ contacts, createContact }}
    >
      {children}
    </ContactContext.Provider>
  );
};
