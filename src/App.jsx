import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Failed from "./pages/Failed";
import Orders from "./pages/Orders";
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector(state=>state.user.currentUser);
  return (
    <Router>  
    <Routes>
      <Route path="/"  element={<Home/>} />
      <Route path="/products/:categories" element={<ProductList/>} />
      <Route path="/product/:id" element={<Product/>}/>
      <Route path="/cart" element={user &&<Cart/>} />
      <Route path="/success" element={<Success/>} />
      <Route path="/failed" element={<Failed/>} />
      <Route path="/orders" element={<Orders/>} />
      <Route path="/login" element={user? <Navigate to="/"/> :<Login/>} />
      <Route path="/register" element={user? <Navigate to="/"/> :<Register/>} />
    </Routes>
    </Router>
  );

};

export default App;