import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { SkeletonTheme } from "react-loading-skeleton";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({ once: true });

function App() {
  return (
    <SkeletonTheme baseColor="#DDDBDD" highlightColor="#fff">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/author/:authorId" element={<Author />} />
          <Route path="/item-details/:nftId" element={<ItemDetails />} />
        </Routes>
        <Footer />
      </Router>
    </SkeletonTheme>
  );
}

export default App;
