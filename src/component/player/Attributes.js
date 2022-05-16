import React from "react";
import { observer } from "mobx-react-lite";

import game from "../../store/game";

const IncrementAttribute = ({ available, increase }) =>
  available > 0 ? (
    <button className="btn btn-primary" onClick={increase}>
      +
    </button>
  ) : null;

export default observer(() => {
  const {
    battle: { player }
  } = game;

  return (
    <ul>
      {["strength", "constitution", "dexterity", "intelligence", "wisdom"].map(
        (key) => (
          <li key={key}>
            <span style={{ display: "inline-block", width: "45%" }}>
              {key}:
            </span>
            <span style={{ display: "inline-block", width: "15%" }}>
              {player.attribute.get(key)}
            </span>
            <IncrementAttribute
              available={player.availableAttributePoints}
              increase={() => player.incrementAttribute(key)}
            />
          </li>
        )
      )}
    </ul>
  );
});
