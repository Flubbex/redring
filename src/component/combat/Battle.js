import { observer } from "mobx-react-lite";

import { Container, Row, Col } from "../bootstrap";

import Progressbar from "../Progressbar";

import game from "../../store/game";

const CombatBar = observer(({ entity, target, disabled }) => (
  <div className="d-flex">
    {entity.actionBar.set.map((skill, key) => (
      <button
        key={key}
        onClick={() => entity.useAction(key, target)}
        className="btn btn-primary w-100"
        disabled={disabled || skill.call === "none" ? true : skill.step !== 0}
      >
        <span className="h3">{skill.name}</span>
      </button>
    ))}
  </div>
));
export default observer(() => {
  const {
    battle: { flee, player, enemy, state }
  } = game;

  return (
    <Container>
      <Row>
        <Col className="col-12" style={{ height: "40vh" }}>
          <div>
            <Progressbar
              step={player.attackFrame}
              max={player.statistic.attackSpeed}
              color="bg-info"
            />
            <Progressbar
              step={player.health}
              max={player.statistic.maxHealth}
              color="bg-danger"
            />
            <div className="text-center">
              <i className="game-icon game-icon-character display-1" />
            </div>
          </div>
          <CombatBar entity={player} target={enemy} disabled={enemy === null} />
          <button
            className="btn btn-primary w-100"
            disabled={enemy === null}
            onClick={() => flee()}
          >
            Flee
          </button>
        </Col>
        <Col className="col" style={{ height: "40vh" }}>
          {enemy ? (
            <div className="animate__animated animate__fadeIn">
              <Progressbar
                step={enemy.attackFrame}
                max={enemy.statistic.attackSpeed}
                color="bg-info"
              />
              <Progressbar
                step={enemy.health}
                max={enemy.statistic.maxHealth}
                color="bg-danger"
              />
              <div className="text-center">
                <i className="game-icon game-icon-deer display-1" />
                <CombatBar entity={enemy} disabled={true} />
              </div>
            </div>
          ) : state === "respawning" ? (
            <span>Spawning..</span>
          ) : (
            <div className="text-center" style={{ marginTop: "15%" }}>
              <span className="h4">Not fighting anything</span>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
});
