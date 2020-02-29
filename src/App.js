import React, { useState, useEffect } from "react";

import MarkDown from "./compoents/CodeBlock/MarkDownContent";
import { useStyles } from "./AppStyles";
import Menu from "./compoents/Menu/Menu";

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Menu></Menu>
        {/* <Switch>
          <Route exact path={"/"}>
            <h1> {"This is the introduction page"} </h1>
          </Route>
          {routes.route ? (
            routes.route.map((fileName, index) => (
              <Route key={fileName + index} exact path={fileName}>
                <MarkDown fileName={fileName}></MarkDown>
              </Route>
            ))
          ) : (
            <h1></h1>
          )}

          <Route>
            <h1>404 Not Found</h1>
          </Route>
        </Switch> */}
      </div>
    </div>
  );
}
