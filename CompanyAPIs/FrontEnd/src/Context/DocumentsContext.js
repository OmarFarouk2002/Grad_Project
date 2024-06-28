import axios from "axios";
import { createContext } from "react";

export const documentContext = createContext();

export default function DocumentContextProvider({ children }) {
  function addEditNewDocument(values) {
    return axios
      .post(
        `https://companygradution.runasp.net/api/Documents/AddEdit_Document`,
        values
      )
      .then((data) => data)
      .catch((error) => error);
  }

  function deleteDocument(values) {
    return axios
      .post(
        `https://companygradution.runasp.net/api/Documents/Deletedocument/${values}`,
        values
      )
      .then((data) => data)
      .catch((error) => error);
  }

  return (
    <documentContext.Provider
      value={{
        addEditNewDocument,
        // editDocument,
        deleteDocument,
      }}
    >
      {children}
    </documentContext.Provider>
  );
}
