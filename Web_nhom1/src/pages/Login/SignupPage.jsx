import { Outlet } from "react-router-dom";
import Footer from "../../components/layouts/footer";
import Header from "../../components/layouts/header";
import Signup from "../../components/Login-logout/Signup";
const SignupPage = () => {
  return <div>
    <main>
      <Header/>
      <Outlet/>
      <Signup/>
      <Footer/>
    </main>
    
  </div>;
};

export default SignupPage;
