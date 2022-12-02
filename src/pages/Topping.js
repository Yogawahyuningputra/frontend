import { React, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Row, Col, Card, Badge, Stack } from "react-bootstrap";
import Img from "react-bootstrap/Image";

import Brands from "../assest/images/WaysBucks.png";
import Success from "../assest/images/success.png";

function DetailProduct() {

    const { id } = useParams()
    const DataProduct = JSON.parse(localStorage.getItem("DATA_PRODUCT"))
    const DataTopping = JSON.parse(localStorage.getItem("DATA_TOPPING"))

    const formatIDR = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    })
    const { toppingCheck, setToppingCheck } = useState([])
    const { toppingPrice, setToppingPrice } = useState(0)

    const handleChecked = (id, price) => {
        const filterId = (toppingCheck.filter((e) => e === id))
        if (filterId[0] !== id) {
            setToppingCheck([...toppingCheck, id])
            setToppingPrice(toppingPrice + price)
        } else {
            setToppingCheck(toppingCheck.filter((e) => e !== id))
            setToppingPrice(toppingPrice - price)
        }
    }


    return (
        <Container>
            <Row>
                <Col>
                    <Card
                        className="mt-5 d-flex justify-content-center rounded-4 border-0"

                    >
                        <Img
                            src={Brands}
                            style={{
                                position: "absolute",
                                left: "70px",
                                width: "90px",
                                paddingTop: "100px",
                                marginLeft: "110px",
                            }}
                        />
                        <Card.Img
                            variant="top"
                            src={DataProduct[id].image}
                            style={{ width: "450px", height: "550px" }}

                        />
                    </Card>
                </Col>

                {/* ----------------------------Add Cart----------------------------- */}

                <Col className="mx-5">
                    <Card.Text
                        className="text-left"
                        style={{
                            color: "#bd0707",
                            fontWeight: "bold",
                            fontSize: "30px",
                            marginTop: "40px",

                        }}
                    >
                        {DataProduct[id].name}
                    </Card.Text>

                    <Card.Text style={{ color: "#bd0707", marginTop: "20px", fontWeight: "bold" }}>{formatIDR.format(DataProduct[id].price)}</Card.Text>

                    <p style={{ marginBottom: "50px", color: "#bd0707", fontWeight: "bold" }}>Topping</p>

                    <Stack direction="horizontal" gap={3} style={{ color: "#bd0707", marginTop: "10px", fontSize: "14px", justifyContent: "space-between" }}>
                        {DataTopping.map((topping) => (
                            <div onClick={() => handleChecked(topping.id, topping.price)}>
                                <div className="">
                                    <Img
                                        src={DataTopping.image}
                                        style={{
                                            width: "75px",
                                        }}
                                    />
                                    <Badge
                                        style={{ top: "10%", left: "65%" }}
                                        className="position-absolute translate-middle bg-success p-0   border border-light rounded-circle"
                                    >
                                        {toppingCheck.filter(
                                            (Element) => Element === topping.id
                                        )[0] === topping.id ? (
                                            <img alt="" style={{ width: "20px" }} src={Success} />
                                        ) : (
                                            <></>
                                        )}
                                    </Badge>
                                </div>
                                <Card.Text className="m-0" style={{}}>
                                    {topping.name}
                                </Card.Text>
                                <Card.Text>
                                    {formatIDR.format(topping.price)}
                                </Card.Text>
                            </div>
                        ))}

                    </Stack>

                    <Stack direction="horizontal" gap={3} style={{
                        color: "#bd0707",
                        fontWeight: "bold",
                        fontSize: "28px",
                        marginBottom: "50px",
                        marginTop: "50px",
                    }}
                    >
                        <div className="total" >Total</div>
                        <div className="ms-auto">{formatIDR.format(DataProduct[id].price + toppingPrice)}</div>
                    </Stack>
                    <Stack direction="horizontal" gap={3}>
                        <Button
                            variant="danger"
                            className="w-100 d-grid gap-2"
                            size="lg"
                            type="submit"
                        >
                            Add Cart
                        </Button>
                    </Stack>

                </Col>
            </Row>
        </Container>
    );
}

export default DetailProduct;
