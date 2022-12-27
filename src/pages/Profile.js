import React, { useContext } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Img from "react-bootstrap/Image";
import Rectangle4 from "../assest/images/Rectangle4.png";
import Brand from "../assest/images/Headerwaysbucks.png";
import Profile from "../assest/images/Profile.png";

import QR from "../assest/images/qrcode.png";
import { UserContext } from '../context/userContext';

import { API } from "../config/api";
import { useQuery } from "react-query";

function Admin() {
    const { state } = useContext(UserContext);
    console.log("isi state", state)

    let { data: profiles } = useQuery("caches", async () => {
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        }
        const response = await API.get("/user/" + state.user.id, config)
        return response.data.data
    })
    console.log("data profile: ", profiles)

    return (
        <Container className="d-flex mx-auto mt-4 justify-content-center">
            <Row>
                <Col xs={5} style={{ color: "#bd0707" }}>
                    <Stack direction="horizontal" gap={3}>

                        <Card.Text className="">
                            <Card.Text style={{ fontWeight: "bold", fontSize: "24px" }}>My Profile</Card.Text>
                        </Card.Text>
                    </Stack>
                    <Stack direction="horizontal" gap={3}>
                        <Card.Body className="rounder-2">
                            <Img

                                src={Profile}
                                style={{
                                    width: "200px",
                                    height: "240px",
                                    borderRadius: "10px",
                                }}

                            />
                        </Card.Body>
                        <Card.Body>
                            <Card.Text className="">
                                <Card.Text style={{ fontWeight: "bold" }}>Fullname</Card.Text>
                                <Card.Text>{profiles?.name}</Card.Text>
                            </Card.Text>
                            <Card.Text className="">
                                <Card.Text style={{ fontWeight: "bold" }}>Email</Card.Text>
                                <Card.Text>{profiles?.email}</Card.Text>
                            </Card.Text>
                        </Card.Body>
                    </Stack>
                </Col>

                {/* ------------------------Transaction--------------------------- */}
                <Col className="ms-auto">
                    <Stack direction="horizontal" gap={3}>

                        <Card.Text style={{ fontWeight: "bold", fontSize: "24px", color: "#bd0707" }}>
                            <Card.Text>Transaction</Card.Text>
                        </Card.Text>
                    </Stack>
                    <Stack direction="horizontal" gap={3} style={{ backgroundColor: "#F6DADA", borderRadius: "15px" }}>
                        <Stack gap={3} style={{}}>
                            <Stack direction="horizontal" gap={3} style={{}}>

                                <Card.Body className="mt-2 rounder-2">
                                    <Img
                                        src={Rectangle4}
                                        style={{
                                            width: "110px",
                                            height: "130px",
                                            marginLeft: "10px"
                                        }}
                                    />
                                </Card.Body>
                                <Card.Body style={{ color: "#bd0707", fontSize: "14px", marginBottom: "20px" }}>
                                    <Card.Text>
                                        <Card.Text style={{ fontWeight: "bold" }}>Ice Coffe Palm Sugar</Card.Text>
                                        <Card.Text style={{ fontSize: "9px" }}>Saturday : 5 march 2020</Card.Text>
                                    </Card.Text>
                                    <Card.Text style={{ color: "#bd0707", fontSize: "10px", marginTop: "20px" }}>
                                        <Card.Text>Topping : Bill Berry Boba, Bubble Tea Gellatin</Card.Text>
                                        <Card.Text style={{ fontSize: "9px" }}>Price : 27.000</Card.Text>
                                    </Card.Text>
                                </Card.Body>
                            </Stack>
                            <Stack direction="horizontal" gap={3} style={{}}>
                                <Card.Body className="rounder-2">
                                    <Img
                                        src={Rectangle4}
                                        style={{
                                            width: "110px",
                                            height: "130px",
                                            marginLeft: "10px"
                                        }}
                                    />
                                </Card.Body>
                                <Card.Text style={{ color: "#bd0707", fontSize: "14px", marginBottom: "20px" }}>
                                    <Card.Text>
                                        <Card.Text style={{ fontWeight: "bold" }}>Ice Coffe Palm Sugar</Card.Text>
                                        <Card.Text style={{ fontSize: "9px" }}>Saturday : 5 march 2020</Card.Text>
                                    </Card.Text>
                                    <Card.Text style={{ color: "#bd0707", fontSize: "10px", marginTop: "20px" }}>
                                        <Card.Text>Topping : Bill Berry Boba, Bubble Tea Gellatin</Card.Text>
                                        <Card.Text style={{ fontSize: "9px" }}>Price : 27.000</Card.Text>
                                    </Card.Text>
                                </Card.Text>
                            </Stack>

                        </Stack>

                        <Stack direction="vertical" gap={5} style={{ backgroundColor: "#F6DADA", borderRadius: "15px", marginBottom: "50px" }}>

                            <Card.Body>
                                <Card.Body>
                                    <Img
                                        src={Brand}
                                        style={{
                                            width: "70px",
                                            height: "70px",
                                            marginLeft: "30px",
                                            marginBottom: "30px",
                                            marginTop: "10px",
                                        }}
                                    />
                                </Card.Body>
                                <Card.Body className="mb-1">
                                    <Img
                                        src={QR}
                                        style={{
                                            width: "70px",
                                            height: "70px",
                                            marginLeft: "30px",
                                            marginTop: "10px"
                                        }}
                                    />
                                    <Card.Text className="mt-3" style={{ color: "#00D1FF", fontSize: "10px", marginLeft: "35px" }}>On The Way</Card.Text>
                                    <Card.Text style={{ color: "#974A4A", marginLeft: "40px", fontSize: "10px" }}>Sub Total : Rp.54.000</Card.Text>
                                </Card.Body>

                            </Card.Body>
                        </Stack>
                    </Stack>
                </Col>
            </Row >
        </Container >
    );
}

export default Admin;