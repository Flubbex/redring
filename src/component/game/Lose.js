import React from "react";
import { observer } from "mobx-react-lite";

import { Row, Col } from "../bootstrap";

import game from "../../store/game";

export default observer(() => {
  const { restart } = game;
  return (
    <Row>
      <Col className="text-center">
        <h1 className="">Ur dead</h1>
        <i
          className="game-icon game-icon-hasty-grave"
          style={{ fontSize: "142px" }}
        />
        <button
          className="btn btn-lg btn-primary w-100"
          onClick={() => restart()}
        >
          Restart
        </button>
      </Col>
    </Row>
  );
});
