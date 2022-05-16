import React from "react";
import { observer } from "mobx-react-lite";

import Tabset from "../Tabset";

export default observer(() => (
  <Tabset tabset={["General", "Performance"]}>
    <div>General Options</div>
    <div>Performance</div>
  </Tabset>
));
