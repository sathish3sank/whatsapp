import { useEffect, useState } from "react";

// const PREFIX = "whatsapp-client-";

// const useContacts = (key?: any, initialValue?: any) => {
//   const prefixedKey = PREFIX + key;
//   const [contacts, setContacts] = useState(() => {
//     const jsonValue = localStorage.getItem(prefixedKey);
//     console.log(prefixedKey, jsonValue);
//     if (jsonValue != null) return JSON.parse(jsonValue);
//     if (typeof initialValue == "function") {
//       return initialValue();
//     } else {
//       return initialValue;
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem(prefixedKey, JSON.stringify(contacts));
//   }, [prefixedKey, contacts]);

//   return [contacts, setContacts];
// };

// export default useContacts;
