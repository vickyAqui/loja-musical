import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaCreditCard, FaShieldAlt, FaTruck, FaWhatsapp } from 'react-icons/fa';
import { SiPix, SiMercadopago } from 'react-icons/si';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <h3>Ponte Sonora</h3>
          <p className="footer-description">
            Sua loja de instrumentos musicais com os melhores preços e variedade. 
            Guitarras, baterias, teclados e muito mais!
          </p>
        </div>

        <div className="footer-section">
          <h3>Categorias</h3>
          <ul>
            <li><a href="#instrumentos">Instrumentos</a></li>
            <li><a href="#lp-vinil">LP/Vinil</a></li>
            <li><a href="#cd">CDs</a></li>
            <li><a href="#diversos">Diversos</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Atendimento</h3>
          <ul>
            <li><a href="mailto:contato@pontesonora.com">contato@pontesonora.com</a></li>
            <li><a href="tel:+5511999999999">(11) 99999-9999</a></li>
            <li>Seg a Sex: 9h às 18h</li>
            <li>Sáb: 9h às 13h</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Redes Sociais</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
          <div className="whatsapp-contact">
            <FaWhatsapp />
            <div>
              <strong>WhatsApp</strong>
              <p>(11) 99999-9999</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-middle">
        <div className="payment-methods">
          <h4>Formas de Pagamento</h4>
          <div className="payment-icons">
            <div className="payment-icon"><FaCreditCard /> Cartão de Crédito</div>
            <div className="payment-icon"><SiPix /> PIX</div>
            <div className="payment-icon">💰 Boleto Bancário</div>
          </div>
        </div>

        <div className="security-badges">
          <div className="badge">
            <FaShieldAlt />
            <span>Compra 100% Segura</span>
          </div>
          <div className="badge">
            <FaTruck />
            <span>Entrega para Todo Brasil</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Ponte Sonora - Instrumentos Musicais. Todos os direitos reservados.</p>
        <p className="dev-credit">Desenvolvido com ♪ por Vicky Aquino</p>
      </div>
    </footer>
  );
};

export default Footer;
