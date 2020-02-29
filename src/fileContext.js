import React, { useContext } from "react";

const callFileName = async () => {
  return await fetch("http://localhost:9000/getAllFileName", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
};

const fileContext = async () => {
  callFileName();
};

export default React.createContext(defaultFile);
