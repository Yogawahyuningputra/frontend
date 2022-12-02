import React, { useContext, useState } from "react";
import { Button, Badge, Container, Navbar } from "react-bootstrap";
import Login from "../component/Login";
import Register from "../component/Register";
import Brand from "../assest/images/Headerwaysbucks.png";
import "../App.css";
import Bucket from "../assest/images/bucket.png";
import DropdownUser from "./DropdownUser";
import DropdownAdmin from "./DropdownAdmin";
import { API } from "../../src/config/api";
import { UserContext } from "../context/userContext";
import { useQuery } from "react-query";

function NavBar() {
  const [state, dispatch] = useContext(UserContext);
  console.log("isi dari state", state);

  const [LoginShow, setLoginShow] = useState(false);
  const [RegisterShow, setRegisterShow] = useState(false);

  const { data: order } = useQuery("ordersCache", async () => {
    const response = await API.get("/orders");
    return response.data.data;
  });

  return (
    <div>
      <Navbar expand="lg" variant="light">
        <Container>
          <Navbar.Brand>
            <a href="/">
              <img
                src={Brand}
                alt=""
                style={{ width: "71px", height: "71px", marginLeft: "25px" }}
              />
            </a>
          </Navbar.Brand>
          {state.isLogin === false ? (
            <div style={{ float: "left" }}>
              <Button
                variant="outline-danger mx-3"
                onClick={() => setLoginShow(true)}
              >
                Login
              </Button>
              <Button
                variant="danger mx-3"
                onClick={() => setRegisterShow(true)}
              >
                Register
              </Button>
            </div>
          ) : (
            <>
              {state.user.role === "admin" ? (
                <DropdownAdmin />
              ) : (
                <div>
                  {order?.length >= 1 && (
                    <Badge className="my-2 position-absolute translate-middle badge-position rounded-pill bg-danger p-1 border border-light rounded-circle">
                      {order?.length}
                    </Badge>
                  )}
                  <a href="/Cart">
                    <img
                      src={Bucket}
                      alt=""
                      style={{
                        position: "relative",
                        width: "40px",
                        height: "40px",
                        marginRight: "30px",
                      }}
                    />
                  </a>
                  <DropdownUser />
                </div>
              )}
            </>
          )}
        </Container>
      </Navbar>
      <Login
        show={LoginShow}
        onHide={() => setLoginShow(false)}
        onRegister={() => {
          setLoginShow(false);
          setRegisterShow(true);
        }}
        setLoginShow={setLoginShow}
        setRegisterShow={setRegisterShow}
      />

      <Register
        show={RegisterShow}
        onHide={() => setRegisterShow(false)}
        onLogin={() => {
          setRegisterShow(false);
          setLoginShow(true);
        }}
        setLoginShow={setLoginShow}
        setRegisterShow={setRegisterShow}
      />
    </div>
  );
}

export default NavBar;
