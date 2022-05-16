import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import { Container, Row, Col } from "./bootstrap";

import Header from "./Header";
import routeset from "./routeset";

import ui from "../store/ui";

const Link = ({ to, children }) => (
  <a href="/#" onClick={to} className="text-light">
    {children}
  </a>
);

const List = ({ children, listClass, itemClass }) => (
  <ul className={listClass ? listClass : null}>
    {children.length
      ? children.map((child, key) => (
          <li key={key} className={itemClass ? itemClass : null}>
            {child}
          </li>
        ))
      : children}
  </ul>
);
const Sidebar = ({ route, setRoute }) => (
  <div className="nav">
    <List>
      <h4>Combat</h4>
      <Link to={() => setRoute("combat/battle")}>Battle</Link>
      <Link to={() => setRoute("combat/actionbar")}>Action Bar</Link>
      <hr />
      <h4>Player</h4>
      <List>
        <Link to={() => setRoute("player/statistic")}>Statistics</Link>
        <Link to={() => setRoute("player/attribute")}>Attribute</Link>
        <Link to={() => setRoute("player/equipment")}>Equipment</Link>
        <Link to={() => setRoute("player/inventory")}>Inventory</Link>
      </List>
      <hr />
      <h4>World</h4>
      <List>
        <Link to={() => setRoute("world/map")}>Map</Link>
      </List>
      <hr />
      <h4>Other</h4>
      <List>
        <Link to={() => setRoute("game/config")}>Settings</Link>
        <Link to={() => setRoute("game/credits")}>Credits</Link>
      </List>
    </List>
  </div>
);

const MissingPage = () => <p>404</p>;

const Switch = ({ route, routeset }) => routeset[route] || <MissingPage />;

export default observer(() => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { route, go } = ui;

  return (
    <Container fluid={true}>
      <Header menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
      <Row>
        <Col
          className={
            menuVisible
              ? "col-12 col-md-3 bg-primary text-light h-100"
              : "d-none"
          }
        >
          <Sidebar route={route} routeset={routeset} setRoute={go} />
        </Col>
        <Col>
          <Switch route={route} routeset={routeset} />
        </Col>
      </Row>
    </Container>
  );
});
