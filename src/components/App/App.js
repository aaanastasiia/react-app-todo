import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import styles from "./App.module.css";
import Todo from "../Todo/Todo";
import About from "../About/About";

const App = () => {
  return (
    <Router>
      <div className={styles.wrap}>
        <NavLink
          to="/"
          exact
          className={styles.link}
          activeClassName={styles.link__active}
        >
          <button className={styles.button}>Обо мне</button>
        </NavLink>
        <NavLink
          to="/todo"
          className={styles.link}
          activeClassName={styles.link__active}
        >
          <button className={styles.button}>Дела</button>
        </NavLink>
      </div>

      <div className={styles.content}>
        <Route path="/" exact component={About} />
        <Route path="/todo" component={Todo} />
      </div>
    </Router>
  );
};

export default App;
