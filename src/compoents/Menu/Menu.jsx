import React, { useState, useEffect } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ExpansionBoard from "../Expansion/ExpansionBoard";
import { makeStyles } from "@material-ui/core/styles";
import MarkDown from "../CodeBlock/MarkDownContent";
import { Route, Switch, Link } from "react-router-dom";
import FileUpload from "../FileUpload/FileUploadPage";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  container: {
    marginLeft: 50,
    marginRight: 50
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    position: "relative",

    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    justifyContent: "center",
    marginLeft: -drawerWidth
  },
  contentShift: {
    position: "relative",
    justifyContent: "center",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 50,
    marginRight: 50
  }
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleDrawer = () => {
    setOpen(!open);
  };

  const [routes, setRoutes] = useState({
    topics: {},
    route: []
  });
  const callFileName = async () => {
    await fetch("http://localhost:9000/getAllFileName", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        const route = [];
        Object.keys(json).map(topic =>
          json[topic].map(file => route.push("/" + topic + file))
        );
        setRoutes({ topics: json, route });
      });
  };
  useEffect(() => {
    callFileName();
  }, []);

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        {Object.keys(routes.topics).map(topic => (
          <ExpansionBoard
            key={topic}
            title={topic}
            files={routes.topics[topic]}
          />
        ))}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <IconButton className={classes.button} onClick={handleDrawer}>
          <MenuIcon />
        </IconButton>

        <Link to="/upload-file">
          <button
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              position: "absolute",
              right: "30px",
              padding: "15px 32px",
              fontSize: "16px",
              border: "none"
            }}
          >
            Upload File
          </button>
        </Link>

        <Switch>
          <Route exact path={"/upload-file"}>
            <FileUpload
              routeState={[routes, setRoutes]}
              topics={Object.keys(routes.topics)}
            />
          </Route>
          <Route exact path={"/"}>
            <h1> {"This is the introduction page"} </h1>
          </Route>
          {routes.route.length ? (
            routes.route.map((fileName, index) => (
              <Route key={fileName + index} exact path={fileName}>
                <MarkDown fileName={fileName}></MarkDown>
              </Route>
            ))
          ) : (
            <div />
          )}

          <Route>
            <h1>404 Not Found</h1>
          </Route>
        </Switch>
      </main>
    </div>
  );
}
