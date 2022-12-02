import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import { Alert } from "react-bootstrap";
import { Link } from "react-router-dom"
import { useMutation } from "react-query";
import { API } from "../../src/config/api";
// import { UserContext } from '../../src/context/userContext';

function Register({ show, onHide, onLogin, setLoginShow, setRegistershow }) {
  // console.log(onLogin)

  // const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [user, setUser] = useState({

    name: '',
    email: '',
    password: '',

  })
  const { name, email, password } = user;
  const handleOnChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify(user);

      // Insert data user to database

      const response = await API.post('/register', body, user, config)

      const alert = (<Alert variant='success' className='py-1'>
        Success
      </Alert>)
      setMessage(alert)
      setUser({
        name: '',
        email: '',
        password: '',
      });
      console.log("data berhasil ditambahkan", response.data.data)
      // onLogin(true)
    } catch (err) {
      const alert = (<Alert variant='danger' className='py-1'>
        Failed
      </Alert>)
      setMessage(alert)
      console.log(err)
    }
  })
  // Notification

  // if (response.data.code === 'success...') {
  //   const alert = (
  //     <Alert variant="success" className="py-1">
  //       Success
  //     </Alert>
  //   );
  //   setMessage(alert);
  //   setUser({
  //     name: '',
  //     email: '',
  //     password: '',
  //   });
  // } else {
  //   const alert = (
  //     <Alert variant="danger" className="py-1">
  //       Failed
  //     </Alert>
  //   );
  //   setMessage(alert);
  // }
  //   } catch (error) {
  //     const alert = (
  //       <Alert variant="danger" className="py-1">
  //         Failed
  //       </Alert>
  //     );
  //     setMessage(alert);
  //     console.log(error);
  //   }
  // });


  return (
    <Modal
      show={show} onHide={onHide} onLogin={onLogin}
      size="md p-5"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Container className="px-5 py-5">

        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Label
            className="fs-1 mb-3 fw-bold"
            style={{ color: "#bd0707" }}
          >
            Register
          </Form.Label>
          {message && message}
          <Form.Group className="mb-3 " controlId="name">
            <Form.Control
              className="py-3 fs-5"
              style={{ borderColor: "#bd0707" }}
              type="text"
              name="name"
              value={name}
              onChange={handleOnChange}
              placeholder="Enter name"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Control
              className="py-3 fs-5"
              style={{ borderColor: "#bd0707" }}
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              className="py-3 fs-5"
              style={{ borderColor: "#bd0707" }}
              type="password"
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Password"
              required
            />
          </Form.Group>
          <Button
            variant="danger"
            className="w-100 d-grid gap-2 mt-4"
            size="lg"
            type="submit"
          >
            Register
          </Button>
          <Form.Label>Don't have an account ? Click <Link onClick={onLogin} style={{ fontWeight: "bold", textDecoration: "none", color: "black" }}>Here</Link></Form.Label>
        </Form>
      </Container>
    </Modal>
  );
}
export default Register;
