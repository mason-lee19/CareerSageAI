import Navbar from "./navbar";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-neutral-300 shadow-lg flex flex-col">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;