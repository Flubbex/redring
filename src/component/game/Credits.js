import React from "react";

import credits from "../../data/credits";

export default () => (
  <ul>
    {credits.map(([used, source], key) => (
      <li key={key} className="row">
        <span className="col">{used}</span>
        <span className="col">{source}</span>
      </li>
    ))}
  </ul>
);
