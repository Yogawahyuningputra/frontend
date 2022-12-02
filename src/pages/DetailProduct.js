import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Row, Col, Card, Badge } from "react-bootstrap";
import Img from "react-bootstrap/Image";
// import Brands from "../assest/images/WaysBucks.png";
import Success from "../assest/images/success.png";
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery } from 'react-query';
import { UserContext } from "../../src/context/userContext";
import { API } from "../config/api";


function DetailProduct() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [state] = useContext(UserContext)

  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })

  //produk
  let { data: product } = useQuery("productsCache", async () => {
    const response = await API.get("/product/" + id)
    return response.data.data
  })

  /// toping
  let { data: toppings } = useQuery("topingsCache", async () => {
    const response = await API.get("/toppings")
    return response.data.data
  })

  const [toppingCheck, setToppingCheck] = useState([]) //ID TOPING
  const [toppingPrice, setToppingPrice] = useState([]) //HARGA TOPING

  function handleChecked(id, price) {
    let idNow = toppingCheck.filter((e) => e === id)
    if (idNow[0] !== id) {
      setToppingCheck([...toppingCheck, id])
      setToppingPrice(Number(toppingPrice) + Number(price))
    } else {
      setToppingCheck(toppingCheck.filter((e) => e !== id))
      setToppingPrice(Number(toppingPrice) - Number(price))
    }
  }
  let subTotal = product?.price + toppingPrice

  const HandleAddCart = useMutation(async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }

      const data = {
        qty: 1,
        subtotal: subTotal,
        product_id: product.id,
        topping_id: toppingCheck,
      }

      const body = JSON.stringify(data)

      const respone = await API.post("/order", body, config)
      console.log("respon Order :", respone)
      navigate("/Cart")
    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    if (state.isLogin === false || state.user.role === "admin") {
      navigate("/Admin")
    }
  }, [state])

  //   const getProductURL = useLocation()
  //   const getProductId = parseInt(getProductURL.pathname.replace(/\D/g, ""))
  //   const { data: products } = useQuery("productsCache", async () => {
  //     // const config = {
  //     //     method: "GET",
  //     //     headers: {
  //     //       Authorization: "Basic " + localStorage.token,
  //     //     },
  //     //   }
  //     const res = await API.get("/products");
  //     return res.data.data;
  // });
  //   const DataLogin = JSON.parse(localStorage.getItem("USER_LOGIN"))
  //   const Product = []
  //   const getProduct = () => {
  //     if (typeof Storage === "undefined") {
  //       alert("can not store user")
  //     }
  //     const DataProduct = JSON.parse(localStorage.getItem("DATA_PRODUCT"))
  //     if (DataProduct !== null) {
  //       for (let i = 0; i < DataProduct.length; i++) {
  //         if (DataProduct[i].id === getProductId) {
  //           Product.push(DataProduct[i])
  //         }
  //       }
  //     }
  //   }
  //   const Toppings = []
  //   const getToppings = () => {
  //     if (typeof Storage === "undefined") {
  //       alert("can not store user")
  //     }
  //     const DataTopping = JSON.parse(localStorage.getItem("DATA_TOPPING"))
  //     if (DataTopping !== null) {
  //       for (let i = 0; i < DataTopping.length; i++) {
  //         Toppings.push(DataTopping[i])
  //       }
  //     }
  //   }

  //   // const { id } = useParams()
  //   const formatIDR = new Intl.NumberFormat(undefined, {
  //     style: "currency",
  //     currency: "IDR",
  //     maximumFractionDigits: 0,
  //   })
  //   const [toppingCheck, setToppingCheck] = useState([])
  //   const [toppingPrice, setToppingPrice] = useState(0)


  //   getProduct()
  //   getToppings()

  //   function handleChecked(id, price) {
  //     const filterId = toppingCheck.filter(element => element === id)
  //     if (filterId[0] !== id) {
  //       setToppingCheck([...toppingCheck, id])
  //       setToppingPrice(toppingPrice + price)
  //     } else {
  //       setToppingCheck(toppingCheck.filter((e) => e !== id))
  //       setToppingPrice(toppingPrice - price)
  //     }
  //   }

  //   const dataCart = []
  //   const getDataCart = () => {
  //     if (typeof Storage === "undefined") {
  //       alert(" can not store user")
  //     }
  //     const data = JSON.parse(
  //       localStorage.getItem(`DATA_CART_${DataLogin[0].id}`)
  //     )
  //     if (data !== null) {
  //       for (let i = 0; i < data.length; i++) {
  //         dataCart.push(data[i])
  //       }
  //     }
  //   }


  //   const saveDataCart = () => {
  //     const currentProduct = {
  //       cartId: +new Date(),
  //       itemId: Product[0].id,
  //       topping: toppingCheck,
  //       total: Product[0].price + toppingPrice,
  //       isPaid: false,
  //     }
  //     dataCart.push(currentProduct)
  //     localStorage.setItem(
  //       `DATA_CART_${DataLogin[0].id}`,
  //       JSON.stringify(dataCart)
  //     )

  //   }
  //   const handleOnSubmit = () => {
  //     getDataCart()
  //     saveDataCart()
  //     navigate("/Cart")
  //   }


  return (
    <Container className="my-5">
      <Row xs={1} md={2} className="d-flex justify-content-center ">
        <Col xs lg="5" className="mt-2 rounded-4 border-0 ">
          {/* <Img
              src={Brands}
              style={{
                position: "absolute",
                left: "70px",
                width: "90px",
                paddingTop: "100px",
                marginLeft: "110px",
              }}
            /> */}
          <Card.Img
            variant="top"
            src={product?.image}
            style={{ width: "400px", height: "500px" }}

          />

        </Col>
        <Col >

          <Card className="mt-2 d-flex justify-content-center">
            <Card.Body>
              <Card.Title style={{
                color: "#bd0707",
                fontWeight: "bold",
                fontSize: "30px",
                marginLeft: "20px",

              }}
              >
                {product?.title}</Card.Title>
              <Card.Text style={{ color: "#bd0707", marginTop: "20px", fontWeight: "bold", marginLeft: "20px" }}>{formatIDR.format(product?.price)}</Card.Text>
              <Card.Text style={{ color: "#bd0707", marginTop: "20px", fontWeight: "bold", marginLeft: "20px" }}>Topping</Card.Text>
              <Row xs="4" className="mt-4"> {toppings?.map((topping) => (
                <div className="py-2" onClick={() => handleChecked(topping?.id, topping?.price)}>
                  <div style={{ position: "relative", marginLeft: "28 px" }}>
                    <Img
                      src={topping?.image}
                      style={{
                        width: "50px",
                        marginLeft: "25px",


                      }}
                    />
                    <Badge
                      style={{ top: "10%", left: "65%" }}
                      className="position-absolute translate-middle bg-success p-0   border border-light rounded-circle"
                    >


                      {
                        toppingCheck.filter(element => element === topping?.id)[0] === topping?.id
                          ?
                          <img alt="" style={{ width: "20px" }} src={Success} />
                          :
                          <></>
                      }

                    </Badge>
                  </div>

                  <Card.Text className="my-1 text-center" style={{ color: "#bd0707", fontSize: "12px" }}>
                    {topping.title}
                  </Card.Text>
                  <Card.Text className="my-1" style={{ color: "#bd0707", marginTop: 0, fontSize: "12px", textAlign: "center" }}>
                    {formatIDR.format(topping?.price)}
                  </Card.Text>
                </div>
              ))}

              </Row>
              <Row className="m-1">
                <Col gap={3} style={{
                  color: "#bd0707",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginBottom: "50px",
                  marginTop: "50px",
                }}
                >
                  <Card.Text className="total" >Total</Card.Text>
                  <Card.Text className="ms-auto">{formatIDR.format(subTotal)}</Card.Text>
                </Col>
                <Button onClick={HandleAddCart}
                  variant="danger"
                  className="w-100 d-grid gap-2"
                  size="lg"
                  type="submit"
                >
                  Add Cart
                </Button>
              </Row>
            </Card.Body>

          </Card>
        </Col>
      </Row >
    </Container>
  );
}

export default DetailProduct;
