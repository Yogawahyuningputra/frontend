import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
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
// import Login from "../component/Login";
// import Register from "../component/Register";
import { API } from "../config/api";
import { useQuery, useMutation } from "react-query";
import DeleteData from '../component/popUpDelete';
import { UserContext } from "../../src/context/userContext";


function Cart() {
    // const navigate = useNavigate()

    const [modalShow, setModalShow] = useState(false)
    const [state] = useContext(UserContext)

    let { data: order, refetch } = useQuery("orderCache", async (id) => {
        const res = await API.get(`/orders-id`, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`
            }
        });
        return res.data.data;
    });
    console.log("data order", order)


    // Handle Delete
    // Variabel for delete product data
    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    // Modal Confirm delete data
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // For get id product & show modal confirm delete data
    const handleDelete = (id) => {
        setIdDelete(id);
        handleShow();
    };

    // If confirm is true, execute delete data
    const deleteById = useMutation(async (id) => {
        try {
            const config = {
                method: "DELETE",
                headers: {
                    Authorization: "Basic" + localStorage.token,
                },
            }
            await API.delete(`/order/` + id, config);
            refetch();
        } catch (error) {
            console.log(error);
        }
    });

    useEffect(() => {
        if (confirmDelete) {
            handleClose();
            deleteById.mutate(idDelete);
            setConfirmDelete(null);
        }
    }, [confirmDelete]);

    // Format harga
    const formatIDR = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    })


    let Total = 0
    let Qty = 0
    let IDtrans = 0

    if (state.role === "user") {
        order?.map(
            (element) => (
                (Total += element.subtotal)
                    (Qty += element.qty)
                    (IDtrans = element.transaction_id)
            )
        )
    }
    console.log("ini", Qty)
    console.log("ini total", Total)
    console.log("ini state", state)
    console.log("ini ID transaction", IDtrans)
    console.log("data order", order)

    // console.log("ini subtotal", subtotal)



    //pay
    // const pay = []
    const [DataPay, setDataPay] = useState({
        name: "",
        email: "",
        phone: "",
        posCode: "",
        address: "",
    })

    // Handle Payment

    const handleonChange = (e) => {
        setDataPay({
            ...DataPay,
            [e.target.name]: e.target.value,
        })
    }

    const handlePay = useMutation(async (e) => {
        try {
            e.preventDefault()
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            }
            const requestBody = JSON.stringify(DataPay)
            const response = await API.patch(
                "/transaction/" + IDtrans, requestBody, config
            )
            console.log("data transaksi" / response)
        } catch (error) {
            console.log(error)
        }


    })



    // const handleOnSubmit = (e) => {
    //     e.preventDefault()

    //     if (addDataPay === null) {
    //         pay.push(DataPay)
    //         localStorage.setItem("DATA_PAY", JSON.stringify(pay))
    //     } else {
    //         addDataPay.forEach((element) => {
    //             pay.push(element)
    //         })
    //         pay.push(DataPay)
    //         localStorage.setItem("DATA_PAY", JSON.stringify(pay))
    //     }
    // }



    return (
        // <>
        //     {state.isLogin === false ? (
        //         <>
        //         </>
        //     ) : (
        //         <>
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
                    {order?.map((data, index) => (
                        <Stack direction="horizontal" xs={2} gap={3} className="mt-0">
                            <Card className="mb-2">
                                <Img
                                    src={data?.product?.image}
                                    style={{
                                        width: "100px",
                                        height: "120px",
                                        border: "20px"
                                    }}
                                />
                            </Card>
                            <Card.Text className="mx-4">
                                <p style={{ fontWeight: "bold" }}>{data?.product?.title}</p>
                                <p>Topping :&nbsp;

                                    {data?.toppings?.map(
                                        (e) => (
                                            <>
                                                {e?.title},&nbsp;
                                            </>
                                        ))}
                                </p>
                            </Card.Text>
                            <Card.Text className="mb-5 ms-auto" >
                                <Card.Text >{formatIDR.format(data?.subtotal)}</Card.Text>
                                <Card.Text>
                                    <Button onClick={() => {
                                        handleDelete(data?.id);
                                    }}
                                        style={{ backgroundColor: "white", border: "none" }}>
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

                                    <DeleteData
                                        setConfirmDelete={setConfirmDelete}
                                        show={show}
                                        handleClose={handleClose}
                                    />

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
                                {!!order === false || order?.length === 0
                                    ? 0
                                    : formatIDR.format(
                                        order
                                            .map((e) => e.subtotal)
                                            .reduce((a, b) => a + b)
                                    )}
                            </Card.Text>
                            <Card.Text style={{}} className="Quantity  text-end">

                                {order?.length}

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
                                {!!order === false || order?.length === 0
                                    ? 0
                                    : formatIDR.format(
                                        order
                                            .map((e) => e.subtotal)
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
                        <Form onSubmit={(e) => handlePay.mutate(e)}>
                            <Form.Group className="mb-4 " controlId="formBasicEmail">
                                <Form.Control onChange={handleonChange}
                                    className=""
                                    style={{ borderColor: "#bd0707" }}
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formBasicEmail">
                                <Form.Control onChange={handleonChange}
                                    // value={DataPay.email}
                                    className=""
                                    style={{ borderColor: "#bd0707" }}
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formBasicPhone">
                                <Form.Control
                                    onChange={handleonChange}

                                    // value={DataPay.phone}
                                    className=""
                                    style={{ borderColor: "#bd0707" }}
                                    type="telp"
                                    placeholder="Phone"
                                    name="phone"
                                />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formBasicNumber">
                                <Form.Control onChange={handleonChange}
                                    // value={DataPay.posCode}
                                    className=""
                                    style={{ borderColor: "#bd0707" }}
                                    type="number"
                                    placeholder="Pos Code"
                                    name="poscode"
                                />
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formBasicAddress">
                                <Form.Control
                                    onChange={handleonChange}
                                    //     value={DataPay.address}
                                    as="textarea" rows={4}
                                    style={{ borderColor: "#bd0707" }}
                                    type="textarea"
                                    placeholder="Address"
                                    name="address"
                                />
                            </Form.Group>
                            <Button
                                onClick={() => { setModalShow(true) }}
                                variant="danger"
                                className="w-100 d-grid gap-2"
                                size="lg"
                                type="submit"
                            >
                                Pay{IDtrans}
                            </Button>
                            <ModalPopUp show={modalShow} onHide={() => setModalShow(false)} />
                        </Form>
                    </Container>
                </Col>
            </Row>
        </Container>
        //         </>
        //     )}
        // </>
    )
}


export default Cart;