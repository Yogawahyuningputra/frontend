import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Img from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Delete from "../assest/images/delete.png";
// import Attach from "../assest/images/attach.png";
import ModalPopUp from "../component/pop-up";
import Login from "../component/Login";
import Register from "../component/Register";
import { API } from "../config/api";
import { useQuery } from "react-query";


function Cart() {
    const navigate = useNavigate()

    const DataLogin = JSON.parse(localStorage.getItem("USER_LOGIN"))

    const { data: orders } = useQuery("ordersCache", async () => {
        const config = {
            method: "GET",
            headers: {
                Authorization: "Basic " + localStorage.token,
            },
        }
        const res = await API.get("/orders", config);
        return res.data.data;
    });

    const Product = []
    const getProducts = () => {
        if (typeof Storage === "undefined") {
            alert("can not store user")
        }
        const DataProduct = JSON.parse(localStorage.getItem("DATA_PRODUCT"))

        if (DataProduct !== null) {
            for (let i = 0; i < DataProduct.length; i++) {
                Product.push(DataProduct[i])
            }
        }
    }

    const Topings = []
    const getTopings = () => {
        if (typeof Storage === "undefined") {
            alert("cant store user")
        }

        const DataToping = JSON.parse(localStorage.getItem("DATA_TOPPING"))

        if (DataToping !== null) {
            for (let i = 0; i < DataToping.length; i++) {
                Topings.push(DataToping[i])
            }
        }

    }

    let dataCart = []
    const getCartData = () => {
        let data
        if (!!DataLogin !== false) {
            data = JSON.parse(localStorage.getItem(`DATA_CART_${DataLogin[0].id}`))
        }
        if (!!data !== false) {
            for (let i = 0; i < data.length; i++) {
                dataCart.push(data[i])
            }
        }
    }

    getCartData()
    getProducts()
    getTopings()

    const deleteCartItem = (cartId) => {
        let localData = dataCart.filter((e) => e.cartId !== cartId)
        localStorage.setItem(
            `DATA_CART_${DataLogin[0].id}`,
            JSON.stringify(localData)
        )
        navigate("/Cart")
    }
    const formatIDR = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    })



    const [LoginShow, setLoginShow] = useState(true)
    const [RegisterShow, setRegisterShow] = useState(false)
    const [modalShow, setModalShow] = useState(false)

    const pay = []
    const [DataPay, setDataPay] = useState({
        name: "",
        email: "",
        phone: "",
        posCode: "",
        address: "",
    })
    const addDataPay = JSON.parse(localStorage.getItem("DATA_PAY"))
    const handleonChange = (e) => {
        setDataPay({
            ...DataPay,
            [e.target.name]: e.target.value,
        })
    }
    const handleOnSubmit = (e) => {
        e.preventDefault()

        if (addDataPay === null) {
            pay.push(DataPay)
            localStorage.setItem("DATA_PAY", JSON.stringify(pay))
        } else {
            addDataPay.forEach((element) => {
                pay.push(element)
            })
            pay.push(DataPay)
            localStorage.setItem("DATA_PAY", JSON.stringify(pay))
        }
    }




    return (

        <>
            {!!DataLogin === false ? (
                <>
                    <Login
                        show={LoginShow}
                        onHide={() => setLoginShow(false)}
                        onRegister={() => { setLoginShow(false); setRegisterShow(true) }}
                        setLoginShow={setLoginShow}
                        setRegisterShow={setRegisterShow} />

                    <Register
                        show={RegisterShow}
                        onHide={() => setRegisterShow(false)}
                        onLogin={() => { setRegisterShow(false); setLoginShow(true) }}
                        setShowLogin={setLoginShow}
                        setRegisterShow={setRegisterShow} />
                </>

            ) : (

                <Container className="mx-auto mt-4 justify-content-center">
                    <Row>

                        <Col style={{ color: "#bd0707", marginLeft: "100px" }}>
                            <Stack direction="horizontal" gap={3}>

                                <Card.Text className="">
                                    <p style={{ fontWeight: "bold", fontSize: "24px" }}>My Cart</p>
                                    <p style={{ fontSize: "20px", marginTop: "20px" }}>Review Your Order</p>
                                </Card.Text>
                            </Stack>
                            <hr></hr>
                            {orders?.map((item, index) => (
                                <Stack direction="horizontal" xs={2} gap={3} style={{ marginTop: "20px" }}>
                                    <Card className="image">
                                        <Img
                                            src={orders?.image}
                                            style={{
                                                width: "80px",
                                                height: "80px",
                                                border: "20px"
                                            }}
                                        />
                                    </Card>
                                    <Card.Text className="">
                                        <p style={{ fontWeight: "bold" }}>{orders?.title}</p>
                                        <p>Topping :&nbsp;
                                            {`${item.topping.map(
                                                (e) => Topings[e].name
                                            )}`}</p>
                                    </Card.Text>
                                    <Card.Text className="ms-auto" >
                                        <Card.Text >{formatIDR.format(item.total)}</Card.Text>
                                        <Card.Text>
                                            <Button onClick={() => deleteCartItem(item.cartId)} style={{ backgroundColor: "white", border: "none" }}>
                                                <Img
                                                    src={Delete}
                                                    style={{
                                                        width: "20px",
                                                        height: "20px",
                                                        float: "right",
                                                        marginRight: "10px"
                                                    }}
                                                />
                                            </Button>
                                        </Card.Text>
                                    </Card.Text>
                                </Stack>
                            ))}
                            <hr />

                            <hr />
                            <Stack direction="horizontal">
                                <Card.Body>
                                    <Card.Text style={{}}>Subtotal</Card.Text>
                                    <Card.Text style={{}}>Qty</Card.Text>
                                </Card.Body>
                                <Card.Body>
                                    <Card.Text style={{}} className="text-end">
                                        {!!dataCart === false || dataCart.length === 0
                                            ? 0
                                            : formatIDR.format(
                                                dataCart
                                                    .map((e) => e.total)
                                                    .reduce((a, b) => a + b)
                                            )}
                                    </Card.Text>
                                    <Card.Text style={{}} className="text-end">
                                        {orders?.length}
                                    </Card.Text>
                                </Card.Body>
                            </Stack>
                            <hr style={{}} />
                            <Stack direction="horizontal">
                                <Card.Body>
                                    <Card.Text style={{}}>Total</Card.Text>
                                </Card.Body>
                                <Card.Body>
                                    <Card.Text style={{}} className="text-end">
                                        {!!orders === false || orders?.length === 0
                                            ? 0
                                            : formatIDR.format(
                                                orders
                                                    .map((e) => e.total)
                                                    .reduce((a, b) => a + b)
                                            )}
                                    </Card.Text>
                                </Card.Body>
                            </Stack>
                            <hr></hr>
                        </Col>

                        {/* ------------------------Payment--------------------------- */}
                        <Col>
                            <Container className="px-5 py-5" style={{ width: "70%", marginTop: "70px" }}>
                                <Form onSubmit={handleOnSubmit}>
                                    <Form.Group className="mb-4 " controlId="formBasicEmail">
                                        <Form.Control onChange={handleonChange}
                                            value={DataPay.name}
                                            className=""
                                            style={{ borderColor: "#bd0707" }}
                                            type="text"
                                            placeholder="Name"
                                            name="name"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="formBasicEmail">
                                        <Form.Control onChange={handleonChange}
                                            value={DataPay.email}
                                            className=""
                                            style={{ borderColor: "#bd0707" }}
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="formBasicPhone">
                                        <Form.Control onChange={handleonChange}
                                            value={DataPay.phone}
                                            className=""
                                            style={{ borderColor: "#bd0707" }}
                                            type="telp"
                                            placeholder="Phone"
                                            name="phone"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="formBasicNumber">
                                        <Form.Control onChange={handleonChange}
                                            value={DataPay.posCode}
                                            className=""
                                            style={{ borderColor: "#bd0707" }}
                                            type="number"
                                            placeholder="Pos Code"
                                            name="poscode"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="formBasicAddress">
                                        <Form.Control onChange={handleonChange}
                                            value={DataPay.address}
                                            as="textarea" rows={4}
                                            style={{ borderColor: "#bd0707" }}
                                            type="textarea"
                                            placeholder="Address"
                                            name="address"
                                        />
                                    </Form.Group>
                                    <Button onClick={() => { setModalShow(true) }}
                                        variant="danger"
                                        className="w-100 d-grid gap-2"
                                        size="lg"
                                        type="submit"
                                    >
                                        Pay
                                    </Button>
                                    <ModalPopUp show={modalShow} onHide={() => setModalShow(false)} />
                                </Form>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
}

export default Cart;