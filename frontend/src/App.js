import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// pages & components
import Home from './pages/Home';
import Explore from './pages/Explore'; 
// import Navbar from './components/Navbar';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import About from './pages/about';
import Sports from './pages/Sports'; 
import Tennis from "./pages/Tennis.js";
import Cricket from "./pages/Cricket.js";
import Football from "./pages/Football.js";
import Badminton from "./pages/Badminton.js";
import Basketball from "./pages/Basketball.js";


function App() {
  const location = useLocation();

  useEffect(() => {
    const body = document.body;
    const path = location.pathname;

    if (path === "/explore") {
      body.classList.add("bg-explore");
      body.classList.remove("bg-default", "bg-sports", "bg4");
    } else if (path === "/sports") {
      body.classList.add("bg-sports");
      body.classList.remove("bg-default", "bg-explore", "bg4");
    } else if (["/login", "/signup", "/contact", "/about", "/faq"].includes(path)) {
      body.classList.add("bg4");
      body.classList.remove("bg-default", "bg-explore", "bg-sports");
    } else {
      body.classList.add("bg-default");
      body.classList.remove("bg-explore", "bg-sports", "bg4");
    }
  }, [location]);

  return (
    <div className="App">
      {/* <Navbar /> */}
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/sports/cricket" element={<Cricket />} />
          <Route path="/sports/football" element={<Football />} />
          <Route path="/sports/tennis" element={<Tennis />} />
          <Route path="/sports/badminton" element={<Badminton />} />

  </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
