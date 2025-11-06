import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaCreditCard, FaShieldAlt, FaTruck, FaWhatsapp } from 'react-icons/fa';
import { SiPix, SiMercadopago } from 'react-icons/si';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-section">
          <h3>Institucional</h3>
          <ul>
            <li><a href="#sobre">Sobre Nós</a></li>
            <li><a href="#contato">Contato</a></li>
            <li><a href="#trabalhe">Trabalhe Conosco</a></li>
            <li><a href="#lojas">Nossas Lojas</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Atendimento</h3>
          <ul>
            <li><a href="#ajuda">Central de Ajuda</a></li>
            <li><a href="#trocas">Trocas e Devoluções</a></li>
            <li><a href="#entrega">Prazo de Entrega</a></li>
            <li><a href="#frete">Cálculo de Frete</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Minha Conta</h3>
          <ul>
            <li><a href="#pedidos">Meus Pedidos</a></li>
            <li><a href="#cadastro">Meu Cadastro</a></li>
            <li><a href="#favoritos">Favoritos</a></li>
            <li><a href="#cartao">Meus Cartões</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Redes Sociais</h3>
          <div className="social-links">
            <a href="#facebook" aria-label="Facebook"><FaFacebook /></a>
            <a href="#instagram" aria-label="Instagram"><FaInstagram /></a>
            <a href="#twitter" aria-label="Twitter"><FaTwitter /></a>
            <a href="#youtube" aria-label="YouTube"><FaYoutube /></a>
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
            <div className="payment-icon"><FaCreditCard /> Cartão</div>
            <div className="payment-icon"><SiPix /> PIX</div>
            <div className="payment-icon"><SiMercadopago /> Mercado Pago</div>
            <div className="payment-icon">Boleto</div>
          </div>
        </div>

        <div className="security-badges">
          <div className="badge">
            <FaShieldAlt />
            <span>Compra Segura</span>
          </div>
          <div className="badge">
            <FaTruck />
            <span>Entrega Garantida</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Ponte Sonora - Instrumentos Musicais. Todos os direitos reservados.</p>
        <p className="cnpj">CNPJ: 00.000.000/0001-00</p>
      </div>
    </footer>
  );
};

export default Footer;
