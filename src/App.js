import React, { Profiler, useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate, Outlet, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar";
import { API, setAuthToken } from './config/api';
import { UserContext } from './context/userContext';
import Home from "./pages/Landing";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import AddTopping from "./pages/AddTopping";
import Admin from "./pages/Admin";
import DetailProduct from "./pages/DetailProduct";




function App() {
  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    // Redirect Auth
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin === false && !isLoading) {
      navigate("/");
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      console.log("response check auth", response)

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      console.log("ini data state", state)
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (localStorage.token)
      checkUser();
  }, []);

  // const userRoute = () => {
  //   return state.user.role === "user" ? <Outlet /> : <Navigate to="/" />
  // };

  // const adminRoute = () => {
  //   return state.user.role === "admin" ? <Outlet /> : <Navigate to="/" />
  // };


  return (
    <>
      <>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          {/* <Route path="/" element={adminRoute}> */}
          <Route exact path="/Admin" element={<Admin />} />
          <Route exact path="/AddTopping" element={<AddTopping />} />
          <Route exact path="/AddProduct" element={<AddProduct />} />
          {/* </Route> */}

          {/* <Route path="/Profile" element={userRoute}> */}
          <Route exact path="/Profile" element={<Profile />} />
          <Route exact path="/DetailProduct/:id" element={<DetailProduct />} />
          <Route exact path="/Cart" element={<Cart />} />
          {/* </Route> */}
        </Routes>
      </>
    </>
  );
}
export default App;