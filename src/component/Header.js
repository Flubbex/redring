import { observer } from "mobx-react-lite";

import { Row, Col } from "./bootstrap";

export default observer(({ setMenuVisible, menuVisible }) => (
  <Row className="bg-primary text-light shadow-sm sticky-top">
    <Col className="col-2 text-center ">
      <button
        className="btn btn-flat btn-dark mt-2"
        onClick={() => setMenuVisible(!menuVisible)}
      >
        <i className="game-icon game-icon-hamburger-menu display-6" />
      </button>
    </Col>
    <Col className="col-8">
      <p className="display-4 fancy text-danger">Redring</p>
    </Col>
    <Col>
      <p>V0.0.1</p>
    </Col>
  </Row>
));
