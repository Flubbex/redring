import "react";

const Row = ({ children, className, style }) => (
  <div style={style} className={"row " + (className || "")}>
    {children}
  </div>
);
const Col = ({ children, className, style }) => (
  <div style={style} className={"col " + (className || "")}>
    {children}
  </div>
);
const Container = ({ children, fluid, className, style }) => (
  <div
    style={style}
    className={(fluid ? "container-fluid " : "container ") + (className || "")}
  >
    {children}
  </div>
);

export { Row, Col, Container };
