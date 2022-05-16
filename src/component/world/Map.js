import React from "react";
import { observer } from "mobx-react-lite";

import { Container, Row, Col } from "../bootstrap";

import game from "../../store/game";

const Area = observer(({ area: { id, name }, zone, go, activeArea }) => (
  <Col className={id === activeArea.id ? "col-4 bg-light" : "col-4"}>
    <p className="text-center">{name}</p>
    <p className="text-center">
      <i className="game-icon game-icon-forest display-1" />
    </p>
    <button className="btn btn-primary w-100" onClick={() => go(zone, id)}>
      Go
    </button>
  </Col>
));

const Zone = observer(({ zone: { area, id }, activeZone, activeArea, go }) => (
  <Row className={id === activeZone.id ? "mb-2 bg-secondary" : "mb-2"}>
    <h4 className="text-center">Zone {id}</h4>
    {area.map((area, key) => (
      <Area zone={id} area={area} key={key} go={go} activeArea={activeArea} />
    ))}
  </Row>
));

export default observer(() => {
  const { world, go } = game;

  return (
    <Container fluid={true}>
      {world.unlockedZone.map((zone, key) => (
        <Zone
          zone={zone}
          go={go}
          key={key}
          activeZone={world.activeZone}
          activeArea={world.activeArea}
        />
      ))}
    </Container>
  );
});
