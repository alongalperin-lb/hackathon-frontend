import Button from "react-bootstrap/Button";

function ButtonHackthon(props) {
  return (
    <Button className="btn btn-success mt-1 mb-1">Take Environment {props.env}</Button>
  )
}

export default ButtonHackthon;
