import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const uploadFile = ([routes, setRoutes], history) => {
  const formData = new FormData();
  const topic = document.getElementById("topic-input").value;
  const file = document.getElementById("file-input").files[0];

  formData.append("file", file);
  formData.append("topic", topic);
  // fetch("localhost:8080/upload-file", { method: "POST", body: formData });
  axios
    .post("http://localhost:9000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(function(response) {
      // // refresh
      const { route, topics } = routes;
      // check for duplicate
      if (!route.includes(`/${topic}/${file.name}`))
        setRoutes({
          route: [...route, `/${topic}/${file.name}`],
          topics: { ...topics, [topic]: [...topics[topic], `/${file.name}`] }
        });

      alert("file uploaded");

      history.push(`/${topic}/${file.name}`);
    })
    .catch(function(error) {
      alert(error);
    });
};

const FileUploadPage = props => {
  const history = useHistory();
  return (
    <div>
      <select id="topic-input">
        {props.topics.map((topic, index) => (
          <option key={index} value={topic}>
            {topic}
          </option>
        ))}
      </select>
      <input
        type="file"
        id="file-input"
        onChange={() => uploadFile(props.routeState, history)}
      />
    </div>
  );
};

export default FileUploadPage;
