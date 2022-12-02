import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Rectangle3 from "../assest/images/Rectangle3.png";
import Product from "./Product";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";



export default function Home() {

  return (
    <Container>
      <Row
        className="d-flex justify-content-center mt-5"
        style={{
          justifyContent: "center",
          color: "white",
          marginRight: "70px",
        }}
      >
        <Card
          style={{
            display: "flex",
            justifyContent: "center",
            width: "900px",
            height: "400px",
            backgroundColor: "#bd0707",
          }}
        >
          <Card.Img
            variant="top"
            src={Rectangle3}
            style={{
              position: "absolute",
              right: "-110px",
              width: "451px",
              height: "324px",
              borderRadius: "10px",
            }}
          />
          <Card.Body className="mx-4">
            <Card.Title
              style={{ fontSize: "60px", fontWeight: "bold", marginTop: 40 }}
            >
              WAYSBUCKS
            </Card.Title>
            <Card.Text style={{ fontSize: "20px" }}>
              Things are changing, but we're still here for you
            </Card.Text>
            <Card.Text
              style={{
                fontSize: "18px",
                width: "55%",
                marginTop: 30,
              }}
            >
              We have temporarily closed our in-store cafes, but select grocery
              and drive-thru locations remaining open. <b>Waysbucks</b> Drivers
              is also available
            </Card.Text>
            <Card.Text
              style={{ fontSize: "20px", fontWeight: "bold", marginTop: 40 }}
            >
              Let's Order...
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>

      <Row className="mt-5 mb-3" >
        <Col>
          <Card.Text className="fs-2 fw-bold" style={{ color: "#bd0707", marginLeft: "70px" }} >
            Let's Order
          </Card.Text>
        </Col>

        <Product />

      </Row>

    </Container >
  );
}
