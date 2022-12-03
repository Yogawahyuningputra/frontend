import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import IconDrink from "../assest/images/iconDrink.png";
import ProfileNav from "../assest/images/Profilenav.png";
import Logout from "../assest/images/logout.png";
import IconTopping from "../assest/images/icontopping.png";
import Shopingbag from "../assest/images/shoppingbag.png";
import { useNavigate } from "react-router-dom"
import { UserContext } from '../context/userContext';


const DropdownAdmin = () => {
    const navigate = useNavigate()

    const [state, dispatch] = useContext(UserContext)
    console.log(state.isLogin)
    const HandleLogout = () => {

        dispatch({
            type: "LOGOUT"
        })
        navigate("/")
    }
    return (
        <OverlayTrigger trigger="click" placement="bottom" overlay={
            <Popover id="popover-basic" style={{ width: "auto", height: "auto", justifyContent: "center", fontWeight: "bold" }}>
                <Popover.Body className="pb-2">
                    <Nav.Link href="/AddProduct" > <img src={IconDrink} alt="" style={{ width: "30px", height: "40px", marginRight: "30px" }} />Add Product</Nav.Link>
                </Popover.Body>

                <Popover.Body className="pt-2">
                    <Nav.Link href="/AddTopping"> <img src={IconTopping} alt="" style={{ width: "35px", height: "40px", marginRight: "30px" }} />Add Topping</Nav.Link>
                </Popover.Body>
                <Popover.Body className="pt-2">
                    <Nav.Link href="/Admin" > <img src={Shopingbag} alt="" style={{ width: "35px", height: "40px", marginRight: "30px", itemColor: "red" }} /> Transaction</Nav.Link>
                </Popover.Body>
                <hr />
                <Popover.Body className="pt-2">
                    <Nav.Link onClick={HandleLogout}><img src={Logout} alt="" style={{ width: "35px", height: "40px", marginRight: "30px" }} />Logout</Nav.Link>
                </Popover.Body>
            </Popover>
        }>
            <img src={ProfileNav} alt="" style={{ width: "60px", height: "60px" }} />
        </OverlayTrigger>
    );
}
export default DropdownAdmin;