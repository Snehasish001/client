import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <h2>MotoInfo</h2>
          <p>Get the latest bike specs, comparisons, and launch updates all in one place.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/compare">Compare</a></li>
            <li><a href="/brandspage">Brands</a></li>
          </ul>
        </div>

        <div>
          <h3>Connect With Us</h3>
          <ul>
            <li><a href="https://g.co/kgs/RXCwcyL">Email</a></li>
            <li><a href="https://www.facebook.com/">Facebook</a></li>
            <li><a href="https://www.instagram.com/">Instagram</a></li>
            <li><a href="https://x.com/">Twitter</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} MotoInfo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
