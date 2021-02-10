import Footer from './Footer';
import Header from './Header';

function Layout({ children }) {
  return (
    <div className="bg-white">
      <Header />
      <main className="my-8 min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
