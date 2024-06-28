import axios from "axios";
import { createContext } from "react";

export const operationContext = createContext();

export default function OperationContextProvider({ children }) {
  function addNewOperation(values) {
    return axios
      .post(
        "https://companygradution.runasp.net/api/Operations/AddEdit_Operation",
        values
      )
      .then((data) => data)
      .catch((error) => error);
  }

  function editOperation(values) {
    return axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((data) => data)
      .catch((error) => error);
  }
  function deleteOperation(values) {
    return axios
      .post(
        `https://companygradution.runasp.net/api/Operations/DeleteOperation/${values}`,
        values
      )
      .then((data) => data)
      .catch((error) => error);
  }

  function getAllOperations(values) {
    return axios
      .get(`https://companygradution.runasp.net/api/Operations/UserOperation/${values}`)
      .then((data) => data)
      .catch((error) => error);
  }
  function getSingleOperation(values) {
    return axios
      .get(
        `https://companygradution.runasp.net/api/Operations/Operation/${values}`
      )
      .then((data) => data)
      .catch((error) => error);
  }

  return (
    <operationContext.Provider
      value={{
        addNewOperation,
        editOperation,
        getSingleOperation,
        getAllOperations,
        deleteOperation,
      }}
    >
      {children}
    </operationContext.Provider>
  );
}
