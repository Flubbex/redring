import { useState } from "react";
import { observer } from "mobx-react-lite";

import dot from "dot";

import { Container, Row, Col } from "../bootstrap";

import game from "../../store/game";

const Action = ({ action, selectAction, selectedAction }) => (
  <button
    className={selectedAction === action ? "btn btn-danger" : "btn btn-primary"}
    onClick={() =>
      selectedAction === action ? selectAction(null) : selectAction(action)
    }
  >
    <i className={"game-icon " + action.image} style={{ fontSize: "10vw" }} />
    <p>{action.name}</p>
  </button>
);

const ActionList = ({
  player: { availableAction },
  selectAction,
  selectedAction
}) => (
  <Col>
    {availableAction.map((action, key) => (
      <Action
        key={key}
        action={action}
        selectAction={selectAction}
        selectedAction={selectedAction}
      />
    ))}
  </Col>
);

const ActionViewer = ({ player, selectedAction }) => (
  <Col className="border border-primary">
    {selectedAction ? (
      <div>
        <h3>{selectedAction.name}</h3>
        <p>{dot.template(selectedAction.description, null)(player)}</p>
        <ul>
          <li>Windup: {selectedAction.windup || "instant"}</li>
          <li>Cooldown: {selectedAction.cooldown || "instant"}</li>
        </ul>
      </div>
    ) : (
      <div>
        <p>Select an action</p>
      </div>
    )}
  </Col>
);

export default observer(() => {
  const {
    battle: { player }
  } = game;
  const [selectedAction, selectAction] = useState(null);
  return (
    <Container>
      <Row>
        <ActionList
          player={player}
          selectAction={selectAction}
          selectedAction={selectedAction}
        />
        <ActionViewer player={player} selectedAction={selectedAction} />
      </Row>
      <Row>
        <Col>
          <div className="d-flex justify-content-between">
            {player.actionBar.set.map((skill, key) => (
              <button
                key={key}
                onClick={() => player.actionBar.setAction(key, selectedAction)}
                className="btn btn-primary w-100"
              >
                <span className="h3">{skill.name}</span>
              </button>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
});
