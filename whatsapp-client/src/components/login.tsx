import React, { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";

export type LoginPropsT = {
  onIdSubmit: Function;
};

const Login = (props: LoginPropsT) => {
  const idRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.onIdSubmit(idRef.current.value);
  };

  const generateUUID = () => {
    props.onIdSubmit(uuidV4());
  };

  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form onSubmit={handleSubmit} className="w-100">
        <Form.Group>
          <Form.Label>Enter your Id : </Form.Label>
          <Form.Control type="text" ref={idRef}></Form.Control>
        </Form.Group>
        <Button className="btn btn-primary mr-2" type="submit">
          Login
        </Button>
        <Button
          className="btn btn-danger"
          variant="secondary"
          onClick={generateUUID}
        >
          Create New Id
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
