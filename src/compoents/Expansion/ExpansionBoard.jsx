import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import GitHubIcon from "@material-ui/icons/GitHub";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { useStyles } from "./ExpansionStyles";
export default function ExpansionBoard(props) {
  const classes = makeStyles(useStyles);
  return (
    <div>
      <ExpansionPanel defaultExpanded={false}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={"textPrimary"} align={"center"}>
            {props.title}
          </Typography>
        </ExpansionPanelSummary>
        <List className={classes.justifyContent}>
          <>
            {props.files.map((fileName, index) => (
              <Link key={index} to={`/${props.title}${fileName}`}>
                <ListItem alignItems={"center"} autoFocus={true}>
                  <Typography className={classes.text} color={"textSecondary"}>
                    {fileName.substring(1, fileName.indexOf("."))}
                  </Typography>
                </ListItem>
              </Link>
            ))}
          </>
        </List>
      </ExpansionPanel>
    </div>
  );
}
