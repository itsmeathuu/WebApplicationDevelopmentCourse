import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignupPage from "./pages/Login/SignupPage";
import SigninPage from "./pages/Login/SigninPage";
import ProductOverview from "./pages/Home/ProductOverview";
import User from "./pages/Users/jsx/User";
import Account from "./pages/Users/jsx/Account";
import Support from "./pages/Users/jsx/Support";
import BuyHistory from "./pages/Users/jsx/BuyHistory";
import CategoryOverview from "./pages/Home/CategoryOverview";
import Payment from "./pages/Payment/payment";
import AdminPage from "./pages/Admin/AdminPage";
import Profile from "./pages/Profile/Profile";
import OrderHistory from "./pages/Orders/OrderHistory";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<SignupPage />} />
        <Route path="/Signin" element={<SigninPage />} />
        <Route path="/products/:id" element={<ProductOverview />} />
        <Route path="/category/:id" element={<CategoryOverview />} />
        <Route path="/User" element={<User />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Support" element={<Support />} />
        <Route path="/BuyHistory" element={<BuyHistory />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;
