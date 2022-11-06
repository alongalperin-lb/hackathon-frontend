function EnvTdWrapper(props) {
  return (
    <div className="EnvTdWrapper">
      <span>{props.envName}:</span>
      {props.component}
    </div>
  );
}

export default EnvTdWrapper;
