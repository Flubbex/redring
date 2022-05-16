import store2 from "store2";

import config from "../data/config";
import uiModel from "../model/ui";

const savedState = store2.has("redring/ui")
  ? store2.get("redring/ui")
  : { route: config.defaultRoute };

const ui = uiModel.create(savedState);

window.ui = ui;

export default ui;
