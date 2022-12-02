import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom"
import { Alert } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from 'react-router-dom';
import { API } from "../../src/config/api";
import { UserContext } from '../../src/context/userContext';




function Login({ show, onHide, onLogin, onRegister, setLoginShow }) {

  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Insert data for login process
      const response = await API.post('/login', user)

      const alert = (<Alert variant='success' className='py-1'>
        Success
      </Alert>)
      setMessage(alert)
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data
      })
      console.log("Login Success", response.data.data)
      navigate('/')


    } catch (err) {
      const alert = (<Alert variant='danger' className='py-1'>
        Failed
      </Alert>)
      setMessage(alert)
      console.log(err)
    }
    setLoginShow(false)
  })


  return (

    <Modal
      show={show} onHide={onHide}
      size="md p-5"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="Form px-5 py-5" style={{ borderColor: "#bd0707" }}>

        <Form.Label
          className="fs-1 mb-3 fw-bold"
          style={{ color: "#bd0707" }}
        >
          Login
        </Form.Label>
        {message && message}
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              className="py-3 fs-5"
              style={{ borderColor: "#bd0707" }}
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              className="py-3 fs-5"
              style={{ borderColor: "#bd0707" }}
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </Form.Group>
          <Button
            variant="danger"
            className="w-100 d-grid gap-2 mt-4"
            size="lg"
            type="submit"
          >
            Login
          </Button>
          <p className="mt-3 fw-2">Don't have an account ? Klik <Link onClick={onRegister} style={{ fontWeight: "bold", textDecoration: "none", color: "black" }}>Here</Link></p>

        </Form>

      </div>

    </Modal >
  );
}


export default Login;
