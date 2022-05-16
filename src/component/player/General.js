import React from "react";
import { observer } from "mobx-react-lite";

import game from "../../store/game";

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

const Statistic = ({ name, value }) => (
  <div className="row">
    <span className="col-3 bg-light mt-2">{name}</span>
    <span className="col bg-light mt-2">{value}</span>
  </div>
);
export default observer(() => {
  const {
    battle: { player }
  } = game;

  return (
    <List className="container">
      <Statistic name="Name" value={player.name} />
      <Statistic name="Max Health" value={player.statistic.maxHealth} />

      <Statistic
        name="Attack Damage"
        value={player.statistic.minDamage + " - " + player.statistic.maxDamage}
      />
      <Statistic
        name="Attack Speed"
        value={player.statistic.attackSpeed / 1000 + "s"}
      />
      <Statistic name="Armor" value={player.statistic.armor} />
    </List>
  );
});
