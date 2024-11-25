import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import Avatar from "../Header/Avatar/Avatar";
import styles from "./FlyOut.module.css";

const FlyOutContext = createContext();

function FlyOut(props) {
  const [open, toggle] = useState(false);

  return (
    <FlyOutContext.Provider value={{ open, toggle }}>
      {props.children}
    </FlyOutContext.Provider>
  );
}

function Toggle() {
  const { open, toggle } = useContext(FlyOutContext);

  return (
    <div className={styles.toggleButtonContainer} onClick={() => toggle(!open)}>
      <Avatar />
    </div>
  );
}

function List({ children }) {
  const { open } = React.useContext(FlyOutContext);
  return open && <ul className={styles.listContainer}>{children}</ul>;
}

function Item({ children }) {
  return <li>{children}</li>;
}

FlyOut.propTypes = {
  children: PropTypes.element.isRequired,
};

List.propTypes = {
  children: PropTypes.element.isRequired,
};

Item.propTypes = {
  children: PropTypes.element.isRequired,
};

FlyOut.Toggle = Toggle;
FlyOut.List = List;
FlyOut.Item = Item;

export default FlyOut;
