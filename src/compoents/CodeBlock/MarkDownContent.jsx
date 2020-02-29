import React, { useEffect, useState } from "react";
import MarkDown from "./MarkDown";

export default function MarkDownContent(props) {
  const [data, setData] = useState({
    markDown: ""
  });

  useEffect(() => {
    // callAPIMDName(props.location.fileName, props.location.dirName);
    callAPIMDName(props.fileName);
  }, []);

  const callAPIMDName = fileName => {
    let dirName = fileName.substring(0, fileName.lastIndexOf("/"));
    fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
    fetch("http://localhost:9000/testAPI", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          fileName: fileName,
          dirName: dirName
        }
      })
    })
      .then(res => res.text())
      .then(res => setData({ markDown: res }));
  };

  return (
    <div>
      <MarkDown markDown={data.markDown} />
    </div>
  );
}
