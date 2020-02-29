import CodeBlock from "./CodeBlock";
import Markdown from "react-markdown";

import React from "react";

export default function MarkDown(props) {
  return (
    <div>
      <Markdown source={props.markDown} renderers={{ code: CodeBlock }} />
    </div>
  );
}
