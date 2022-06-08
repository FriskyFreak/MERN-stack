import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let [errMsg, SetErrMsg] = useState("");
  const onSubmitFunction = async (data) => {
    console.log(data);
    let res = await axios.post("/user/create-user", data);
    if (res.data.message === "User Created") {
      navigate("/login");
    } else {
      SetErrMsg(res.data.message);
    }
  };
  return (
    <div className="content">
      <div className="display-2 ml-5">User Form</div>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" {...register("username")} />
          <p className="display-2">{errMsg}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" {...register("password")} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" {...register("email")} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Register;
