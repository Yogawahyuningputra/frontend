import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import Kiwi from "../assest/images/kiwi.png";
import PopUpTopping from "../component/popUpAddTopping";
import Img from "react-bootstrap/Image";
import Iconfile from "../assest/images/iconfile.png";
import { API } from "../config/api";
import { useMutation } from "react-query";
import { Alert } from "react-bootstrap";


function AddTopping() {
    const [modalShow, setModalShow] = useState(false)
    const [preview, setPreview] = useState(null)
    const [message, setMessage] = useState(null);


    // const Topping = []
    const [dataTopping, setDataTopping] = useState({
        title: "",
        price: 0,
        image: "",
    })

    const handleOnChange = (e) => {
        setDataTopping({
            ...dataTopping, [e.target.name]:
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
            formData.set("title", dataTopping.title)
            formData.set("price", dataTopping.price)
            formData.set("image", dataTopping.image[0], dataTopping.image[0].title)

            const response = await API.post("/topping", formData, config)
            console.log("Data Topping", response)
            const alert = (<Alert variant='success' className='py-1'>
                Success
            </Alert>)
            setMessage(alert)
            dataTopping({
                title: '',
                price: '',
                image: '',
            });
        } catch (error) {
            console.log(error)
        }
    })
    // const handleOnChange = (e) => {
    //     setDataTopping({
    //         ...DataTopping, [e.target.name]: e.target.value,
    //     })
    // }

    // const AddDataTopping = JSON.parse(localStorage.getItem("DATA_TOPPING"))
    // const handleOnSubmit = (e) => {
    //     e.preventDefault()
    //     if (AddDataTopping === null) {
    //         Topping.push(DataTopping)
    //         localStorage.setItem("DATA_TOPPING", JSON.stringify(Topping))

    //     } else {
    //         for (let i = 0; i < AddDataTopping.length; i++) {
    //             Topping.push(AddDataTopping[i])
    //         }
    //         DataTopping.id = AddDataTopping.length
    //         DataTopping.price = parseInt(DataTopping.price)
    //         Topping.push(DataTopping)
    //         localStorage.setItem("DATA_TOPPING", JSON.stringify(Topping))
    //     }
    //     document.getElementById("AddTopping").reset()




    return (
        <Container>
            <Row>
                <Col>
                    <Container className="px-5 py-5" style={{ width: "90%" }}>
                        <Form onSubmit={(e) => handleOnSubmit.mutate(e)} id="AddTopping">
                            <Form.Label
                                className="fs-1 mb-5 fw-bold"
                                style={{ color: "#bd0707" }}
                            >
                                Topping
                            </Form.Label>
                            {message && message}
                            <Form.Group onChange={handleOnChange} className="mb-4" controlId="formBasicEmail">
                                <Form.Control
                                    className=""
                                    style={{ borderColor: "#bd0707" }}
                                    type="text"
                                    placeholder="Name Topping"
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
                            <Img src={Iconfile} style={{ position: "absolute", width: "18px", height: "30px", marginLeft: "360px", marginTop: "4px" }}
                            />
                            <Form.Group onChange={handleOnChange} className="mb-4" controlId="formBasicPhone">
                                <Form.Control
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
                                Add Topping
                            </Button>
                            <PopUpTopping show={modalShow} onHide={() => setModalShow(false)} />

                        </Form>
                    </Container>
                </Col>
                <Col>
                    <Card className="mt-5 d-flex justify-content-center rounded-4 border-0" style={{}}
                    >
                        {preview && (
                            <Card.Img
                                variant="top"
                                src={preview}
                                alt={preview}
                                style={{ width: "350px", height: "420px" }}
                            />
                        )}
                        {/* <Card.Img src={dataTopping.image} style={{ width: "436px", height: "555px" }}
                        /> */}
                    </Card>
                </Col>
            </Row>

        </Container >
    );
}

export default AddTopping;
//Dummy Topping
// [{"id":0,"name":"Bubble Tea Gelatin","price":5000,"image":"https://i.imgur.com/FxXiqOd.png"},{"id":1,"name":"Manggo","price":5000,"image":"https://i.imgur.com/hraEZqv.png"},{"id":2,"name":"Green Coconut","price":5000,"image":"https://i.imgur.com/qOM164y.png"},{"id":3,"name":"Boba Manggo","price":6000,"image":"https://i.imgur.com/kIQ87kP.png"},{"id":4,"name":"Bill Berry Boba","price":6000,"image":"https://i.imgur.com/OeLQBSe.png"},{"id":5,"name":"Kiwi Popping Pearl ","price":5000,"image":"https://i.imgur.com/tRAC4ko.png"},{"id":6,"name":"Matcha Cantaloupe","price":3000,"image":"https://i.imgur.com/ShIP3Xt.png"},{"id":7,"name":"Oreo Suprime","price":100000,"image":"https://asset.kompas.com/crops/CSx_1xni6ZjJdyHe2yemItuhmqs=/19x0:1025x671/750x500/data/photo/2020/02/19/5e4d1c3b048ae.jpg"}]