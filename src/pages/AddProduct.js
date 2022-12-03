import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Img from "react-bootstrap/Image";
// import Brands from "../assest/images/WaysBucks.png"
import Iconfile from "../assest/images/iconfile.png";
import { API } from "../config/api";
import { useMutation } from "react-query";
import PopUpProduct from "../component/popUpAddProduct";
import { Alert } from "react-bootstrap";



function AddProduct() {
    const [modalShow, setModalShow] = useState(false)
    const [message, setMessage] = useState(null);

    const [preview, setPreview] = useState(null)
    const [dataProduct, setDataProduct] = useState({
        title: "",
        price: 0,
        image: "",
    })

    const handleOnChange = (e) => {
        setDataProduct({
            ...dataProduct, [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value,
        })
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0])
            setPreview(url)
        }
    }

    const handleOnSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()
            const config = {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            }
            const formData = new FormData()
            formData.set("title", dataProduct.title)
            formData.set("price", dataProduct.price)
            formData.set("image", dataProduct.image[0], dataProduct.image[0].title)

            const response = await API.post("/product", formData, config)
            console.log("Data Product", response)
            const alert = (<Alert variant='success' className='py-1'>
            </Alert>)
            setMessage(alert)
            dataProduct({
                title: '',
                price: '',
                image: '',
            });
        } catch (error) {
            console.log(error)
        }
    })



    // const handleOnChange = (e) => {
    //     setDataProduct({
    //         ...dataProduct, [e.target.name]: e.target.value,
    //     })
    // }
    // const AddDataProduct = JSON.parse(localStorage.getItem("DATA_PRODUCT"))
    // const handleOnSubmit = (e) => {
    //     e.preventDefault()

    //     if (AddDataProduct === null) {
    //         products.push(dataProduct)
    //         localStorage.setItem("DATA_PRODUCT", JSON.stringify(products))
    //     } else {
    //         for (let i = 0; i < AddDataProduct.length; i++) {
    //             products.push(AddDataProduct[i])
    //         }
    //         dataProduct.id = AddDataProduct.length
    //         dataProduct.price = parseInt(dataProduct.price)
    //         products.push(dataProduct)
    //         localStorage.setItem("DATA_PRODUCT", JSON.stringify(products))
    //     }
    //     document.getElementById("AddProduct").reset()
    // }

    return (
        <Container>
            <Row>
                <Col>
                    <Container className="px-5 py-5" style={{ width: "90%" }}>
                        <Form onSubmit={(e) => handleOnSubmit.mutate(e)} id="AddProduct">
                            <Form.Label
                                className="fs-1 mb-5 fw-bold"
                                style={{ color: "#bd0707" }}
                            >
                                Product
                            </Form.Label>
                            {message && message}
                            <Form.Group onChange={handleOnChange} className="mb-4 " controlId="formBasicEmail">
                                <Form.Control
                                    className=""
                                    style={{ borderColor: "#bd0707" }}
                                    type="text"
                                    placeholder="Name Product"
                                    name="title"
                                    required
                                />
                            </Form.Group>
                            <Form.Group onChange={handleOnChange} className="mb-4" controlId="formBasicEmail">
                                <Form.Control
                                    className=""
                                    style={{ borderColor: "#bd0707" }}
                                    type="number"
                                    placeholder="Price"
                                    name="price"
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="formBasicPhone" style={{ position: "relative" }}>
                                <Img src={Iconfile} classname="btn" onChange={handleOnChange} style={{ position: "absolute", width: "18px", height: "30px", marginLeft: "360px", marginTop: "4px" }}
                                />
                                <Form.Control onChange={handleOnChange}
                                    className=""
                                    style={{ borderColor: "#bd0707" }}
                                    type="file"
                                    placeholder="Photo Product"
                                    name="image"
                                    required
                                />

                            </Form.Group>
                            <Button onClick={() => { setModalShow(true) }}
                                variant="danger"
                                className="w-100 mt-4"
                                size="lg"
                                type="submit"
                            >
                                Add Product
                            </Button>
                            <PopUpProduct show={modalShow} onHide={() => setModalShow(false)} />
                        </Form>
                    </Container>
                </Col>
                <Col >
                    <Card
                        className="mt-5 d-flex justify-content-center rounded-4 border-0"
                        style={{ borderColor: "white" }}
                    >
                        {preview && (
                            <Card.Img
                                variant="top"
                                src={preview}
                                alt={preview}
                                style={{ width: "350px", height: "420px" }}
                            />
                        )}

                        {/* <Img
                            src={Brands} on
                            style={{
                                position: "absolute",
                                left: "100px",
                                width: "90px",
                                paddingTop: "100px",
                                marginLeft: "80px",
                            }}
                        /> */}
                        {/* <Card.Img
                            src={dataProduct.image} alt="images"
                            style={{ width: "350px", height: "420px" }}
                        /> */}
                    </Card>
                </Col>
            </Row>

        </Container >
    );
}

export default AddProduct;