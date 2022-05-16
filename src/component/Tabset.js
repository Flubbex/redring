import React, { useState } from "react";

import { observer } from "mobx-react-lite";

const TabsetHeader = observer(({ tabset = [], active, toggle }) => (
  <nav className="nav">
    {tabset.map((tab, id) => (
      <button
        key={id}
        className={
          id !== active ? "btn btn-flat text-light" : "btn btn-primary"
        }
        onClick={() => toggle(id)}
      >
        {tab}
      </button>
    ))}
  </nav>
));

export default observer(({ tabset, children }) => {
  var [active, toggle] = useState(0);
  return (
    <div className="container-fluid">
      <div className="row">
        <TabsetHeader tabset={tabset} active={active} toggle={toggle} />
      </div>
      <div className="row">
        <div className="col">
          {children && children.length > 0 ? children[active] : children}
        </div>
      </div>
    </div>
  );
});
