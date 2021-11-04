import { createContext } from 'react';

//credentails context
export const CredentialsContext = createContext({
  storedCredentials: {},
  setStoredCredentials: () => {},
});
