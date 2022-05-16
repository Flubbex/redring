import CombatBattle from "./combat/Battle";
import CombatActionBar from "./combat/ActionBar";

import PlayerStatistic from "./player/General";
import PlayerAttribute from "./player/Attributes";
import PlayerEquipment from "./player/Equipment";
import PlayerInventory from "./player/Inventory";

import WorldMap from "./world/Map";

import GameWin from "./game/Win";
import GameLose from "./game/Lose";
import GameConfig from "./game/Configuration";

export default {
  "combat/battle": <CombatBattle />,
  "combat/actionbar": <CombatActionBar />,

  "player/statistic": <PlayerStatistic />,
  "player/equipment": <PlayerEquipment />,
  "player/attribute": <PlayerAttribute />,
  "player/inventory": <PlayerInventory />,

  "world/map": <WorldMap />,

  "game/win": <GameWin />,
  "game/lose": <GameLose />,
  "game/config": <GameConfig />
};
