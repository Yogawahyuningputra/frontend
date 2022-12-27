import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Img from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Delete from "../assest/images/delete.png";
import Attach from "../assest/images/attach.png";
import ModalPopUp from "../component/pop-up";
// import Login from "../component/Login";
// import Register from "../component/Register";
import { API } from "../config/api";
import { useQuery, useMutation } from "react-query";
import { UserContext } from "../../src/context/userContext";
import { CardImg, FloatingLabel } from "react-bootstrap";
import DeleteData from '../component/popUpDelete';



const style = {
    textTitle: {
        fontWeight: "600",
        fontSize: "32px",
        lineHeight: "49px",

        color: "#BD0707",
    },

    textRed: {
        color: "#BD0707",
    },

    textCenter: {
        textAlign: "center",
    },

    link: {
        fontWeight: "bold",
        textDecoration: "none",
        color: "black",
    },

    ImgProduct: {
        position: "relative",
        width: "350px",
    },

    // Image Product 1
    ImgLogo: {
        position: "absolute",
        width: "130px",
        height: "auto",
        top: "35%",
        left: "77%",
    },
}

function Cart() {


    // const { id } = useParams()
    const [state] = useContext(UserContext)

    let { data: order, refetch } = useQuery("ordersCache", async () => {
        const response = await API.get("/orders-id")
        return response.data.data
    })
    console.log("data order: ", order)

    let Subtotal = 0
    let Qty = 0
    let IDTrans = 0
    if (state.isLogin === true) {
        order?.map(
            (element) => (
                (Subtotal += element.subtotal),
                (Qty += element.qty),
                (IDTrans = element.transaction_id)
            )
        )
    }

    //Payment
    const [DataPay, setState] = useState({
        name: "",
        email: "",
        phone: "",
        poscode: "",
        address: "",
    })

    // const { name, address } = form

    const handleOnChange = (e) => {
        setState({
            ...DataPay,
            [e.target.name]: e.target.value,
        })
    }

    let navigate = useNavigate()

    const HandlePay = useMutation(async (e) => {
        try {
            e.preventDefault()

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            }
            const requestBody = JSON.stringify(DataPay)
            const response = await API.patch(
                "/updatetrans/" + IDTrans,
                requestBody,
                config
            )
            console.log("cart : ", response)

            const token = response.data.data.token
            console.log("rs snap =>", response)

            window.snap.pay(token, {
                onSuccess: function (result) {
                    /* You may add your own implementation here */
                    console.log(result)
                    navigate("/")
                },
                onPending: function (result) {
                    /* You may add your own implementation here */
                    console.log(result)
                    navigate("/")
                },
                onError: function (result) {
                    /* You may add your own implementation here */
                    console.log(result)
                },
                onClose: function () {
                    /* You may add your own implementation here */
                    alert("you closed the popup without finishing the payment")
                },
            })


            refetch()
            navigate("/")
            console.log("Transaksi", response)
        } catch (error) {
            console.log(error)
        }
    })

    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js"
        //change this according to your client-key
        const myMidtransClientKey = "SB-Mid-client-qHCTl1fy6TJrnF4-"

        let scriptTag = document.createElement("script")
        scriptTag.src = midtransScriptUrl
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey)

        document.body.appendChild(scriptTag)
        return () => {
            document.body.removeChild(scriptTag)
        }
    }, [])

    const formatIDR = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    })

    // const [showLogin, setShowLogin] = useState(true)
    // const [showRegister, setShowRegister] = useState(false)
    const [modalShow, setModalShow] = useState(false)

    //Delete order
    const [idDelete, setIdDelete] = useState(null)
    const [confirmDelete, setConfirmDelete] = useState(null)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleDelete = (id) => {
        setIdDelete(id)
        handleShow()
    }

    const deleteById = useMutation(async (id) => {
        try {
            const config = {
                method: "DELETE",
                headers: {
                    Authorization: "Basic " + localStorage.token,
                },
            }
            await API.delete(`/order/${id}`, config)
            refetch()
        } catch (error) {
            console.log(error)
        }
    })

    useEffect(() => {
        if (confirmDelete) {
            // Close modal confirm delete data
            handleClose()
            // execute delete data by id function
            deleteById.mutate(idDelete)
            setConfirmDelete(null)
        }
    }, [confirmDelete])
    return (
        <>
            <Container className="my-5">
                <Card className="mt-5" style={{ border: "white" }}>
                    <Row>
                        <Card.Title className="mb-5" style={style.textTitle}>
                            My Cart
                        </Card.Title>
                        <Col sm={8} className="pe-5" style={style.textRed}>
                            <Card.Body className="p-0" style={{ width: "100%" }}>
                                <Card.Body className="m-0 p-0" style={{ width: "100%" }}>
                                    <Card.Text style={{ fontWeight: "bold" }}>
                                        Review Your Order
                                    </Card.Text>
                                    <hr style={style.textRed} className="m-0" />
                                    <Stack>
                                        {/* Data pembelian product */}

                                        {order?.map((data, index) => (
                                            <Card.Body className="pe-0" key={index}>
                                                <Stack direction="horizontal" gap={4}>
                                                    <Card.Img
                                                        src={data?.product?.image}
                                                        style={{ width: "20%" }}
                                                    />
                                                    <Stack
                                                        direction="horizontal"
                                                        className="flex-fill"
                                                    >
                                                        <Card.Body className="ps-0 m-0 w-100" style={style.textRed}>
                                                            <Card.Title
                                                                className="mb-2"
                                                                style={style.textRed}
                                                            >
                                                                {data?.product?.title}
                                                            </Card.Title>
                                                            <Stack
                                                                direction="horizontal"
                                                                className="align-items-start"
                                                            >
                                                                <Card.Text
                                                                    className="m-0"
                                                                    style={{
                                                                        fontSize: "15px",
                                                                        color: "",
                                                                        fontWeight: "bold",
                                                                    }}
                                                                >
                                                                    Toping
                                                                </Card.Text>
                                                                <Card.Text
                                                                    className="ms-2"
                                                                    style={{
                                                                        fontSize: "12px",
                                                                        color: "#BD0707",
                                                                    }}
                                                                >
                                                                    :{" "}
                                                                    {data.toppings?.map((data) => (
                                                                        <>{data.title}, </>
                                                                    ))}
                                                                </Card.Text>
                                                            </Stack>
                                                        </Card.Body>

                                                        <Card.Body className=" p-0 m-0">
                                                            <Card.Text style={style.textRed}>
                                                                {formatIDR.format(data?.subtotal)}
                                                            </Card.Text>
                                                            <Button
                                                                variant="light"
                                                                className="p-0 ms-5"
                                                                onClick={() => {
                                                                    handleDelete(data?.id)
                                                                }}
                                                            >
                                                                <Card.Img
                                                                    src={Delete}
                                                                    style={{ width: "100%" }}
                                                                />
                                                            </Button>
                                                        </Card.Body>
                                                    </Stack>
                                                </Stack>
                                            </Card.Body>
                                        ))}
                                    </Stack>
                                    <hr style={style.textRed} className="mt-0" />
                                </Card.Body>

                                <Stack direction="horizontal">
                                    <Card.Body style={{ width: "60%" }} className="px-0">
                                        <hr style={style.textRed} className="m-0" />
                                        <Stack direction="horizontal">
                                            <Card.Body>
                                                <Card.Text style={style.textRed}>
                                                    Subtotal
                                                </Card.Text>
                                                <Card.Text style={style.textRed}>Qty</Card.Text>
                                            </Card.Body>
                                            <Card.Body>
                                                <Card.Text
                                                    style={style.textRed}
                                                    className="text-end"
                                                >
                                                    {formatIDR.format(Subtotal)}
                                                </Card.Text>
                                                <Card.Text
                                                    style={style.textRed}
                                                    className="text-end"
                                                >
                                                    {Qty}
                                                </Card.Text>
                                            </Card.Body>
                                        </Stack>
                                        <hr style={style.textRed} />
                                        <Stack direction="horizontal">
                                            <Card.Body>
                                                <Card.Text style={style.textRed}>Total</Card.Text>
                                            </Card.Body>
                                            <Card.Body>
                                                <Card.Text
                                                    style={style.textRed}
                                                    className="text-end"
                                                >
                                                    {formatIDR.format(Subtotal)}
                                                </Card.Text>
                                            </Card.Body>
                                        </Stack>
                                    </Card.Body>

                                    <Card.Body style={{ width: "40%" }}>
                                        <Form.Group controlId="formFile" className="m-3">
                                            <Form.Label className="w-100">
                                                <Card
                                                    // className="px-3"
                                                    style={{
                                                        border: "1px solid #BD0707",
                                                        backgroundColor: "#E0C8C840",
                                                    }}
                                                >
                                                    <CardImg
                                                        src={Attach}
                                                        className="w-25  m-auto my-3"
                                                    />
                                                    <Card.Text
                                                        className="m-auto mb-3"
                                                        style={{ color: "#68323280" }}
                                                    >
                                                        Attache of Transaction
                                                    </Card.Text>
                                                </Card>
                                            </Form.Label>
                                            <Form.Control
                                                type="button"
                                                style={{ display: "none" }}
                                            />
                                        </Form.Group>
                                    </Card.Body>
                                </Stack>
                            </Card.Body>
                        </Col>

                        {/* ====================================================================== */}

                        <Col sm={4} className="pt-5">
                            <Form
                                onSubmit={(e) => HandlePay.mutate(e)}
                                className="m-auto mt-3 d-grid gap-4 w-100"
                            >
                                <Form.Group className="mb-3 " controlId="name">
                                    <Form.Control
                                        onChange={handleOnChange}
                                        // value={DataPay.name}
                                        name="name"
                                        style={{ border: "1px solid #BD0707" }}
                                        type="text"
                                        placeholder="Name"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Control
                                        onChange={handleOnChange}
                                        // value={DataPay.email}
                                        name="email"
                                        style={{ border: "1px solid #BD0707" }}
                                        type="email"
                                        placeholder="Email"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="phone">
                                    <Form.Control
                                        onChange={handleOnChange}
                                        // value={DataPay.phone}
                                        name="phone"
                                        style={{ border: "1px solid #BD0707" }}
                                        type="text"
                                        placeholder="Phone"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="poscode">
                                    <Form.Control
                                        onChange={handleOnChange}
                                        // value={DataPay.posCode}
                                        name="poscode"
                                        style={{ border: "1px solid #BD0707" }}
                                        type="text"
                                        placeholder="Pos Code"
                                    />
                                </Form.Group>

                                <FloatingLabel
                                    className="mb-3"
                                    controlId="floatingTextarea2"
                                    label="Comments"
                                >
                                    <Form.Control
                                        onChange={handleOnChange}
                                        // value={DataPay.address}
                                        name="address"
                                        as="textarea"
                                        placeholder="Address"
                                        style={{
                                            height: "100px",
                                            resize: "none",
                                            border: "1px solid #BD0707",
                                        }}
                                    />
                                </FloatingLabel>
                                <>
                                    <Button
                                        onClick={() => {
                                            setModalShow(true)
                                        }}
                                        variant="outline-light"
                                        style={{ backgroundColor: "#BD0707" }}
                                        type="submit"
                                    >
                                        Pay
                                        {/* {IDTrans} */}
                                    </Button>

                                    {/* <ModalPopUp
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                    /> */}
                                </>
                            </Form>
                        </Col>
                    </Row>
                </Card>
            </Container>
            <DeleteData
                setConfirmDelete={setConfirmDelete}
                show={show}
                handleClose={handleClose}
            />
        </>
    )
}

export default Cart;