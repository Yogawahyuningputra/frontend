import React, { useState, useContext } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import Login from "../component/Login";
import Register from "../component/Register";
import { API } from "../config/api";
import { UserContext } from "../../src/context/userContext";
import { useQuery } from "react-query";

export default function Product() {
    // const dataProduct = JSON.parse(localStorage.getItem("DATA_PRODUCT"));
    const [LoginShow, setLoginShow] = useState(false);
    const [RegisterShow, setRegisterShow] = useState(false);

    const navigate = useNavigate();

    const [state, dispatch] = useContext(UserContext);
    console.log(dispatch)
    const toDetail = (id) => {
        navigate("/DetailProduct/" + id);
    };

    const { data: products } = useQuery("productsCache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        }
        const res = await API.get("/products", config);
        return res.data.data;
    });
    console.log("data product : ", products);

    return (
        <>
            <Row xs="4" className="d-flex justify-content-start gap-2 mx-5">
                {products?.map((data, index) => (
                    <Col
                        xs="4"
                        className="mt-5"
                        style={{ width: "16rem", height: "auto" }}
                    >
                        <Card
                            key={index}
                            onClick={() => {
                                state.isLogin === false
                                    ? setLoginShow(true)
                                    : toDetail(data?.id);
                            }}
                            style={{ backgroundColor: "#F6DADA" }}
                        >
                            <Card.Img variant="top" src={data?.image} />

                            <Card.Body>
                                <Card.Text className="mb-1 bold" style={{ color: "#bd0707" }}>
                                    {data?.title}
                                </Card.Text>
                                <Card.Text style={{ color: "#bd0707" }}>
                                    {" "}
                                    IDR {data?.price}
                                </Card.Text>
                            </Card.Body>
                        </Card>
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
                            setShowLogin={setLoginShow}
                            setRegisterShow={setRegisterShow}
                        />
                    </Col>
                ))}
            </Row>
        </>
    );
}
