import styles from "./Container.module.css";
import React from "react";

function Container(props) {
	const classes = styles.container + props.className;
	return <div className={classes}>{props.children}</div>;
}

export default Container;
