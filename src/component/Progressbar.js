export default ({ step, max, color, children, className }) => (
  <div className={"progress " + className || ""}>
    <div
      className={"progress-bar " + color}
      style={{
        width: (step / max) * 100 + "%"
      }}
      role="progressbar"
      aria-valuenow={step}
      aria-valuemin="0"
      aria-valuemax={max}
    >
      {children ? children : <span>{Math.ceil((step / max) * 100) + "%"}</span>}
    </div>
  </div>
);
