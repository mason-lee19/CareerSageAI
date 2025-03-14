import "../styles/index.css"; // Import Tailwind and global styles
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  return (
    
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;