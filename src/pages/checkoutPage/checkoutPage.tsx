import React, { useEffect, useState } from "react";
import "./checkoutPage.css";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cep, setCep] = useState(""); // Estado para o CEP
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    neighborhood: "",
  }); // Estado para o endereço

  // Obter os itens do Local Storage ao carregar o componente
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Função para consultar o ViaCEP
  const consultarCep = async (cep) => {
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          setAddress({
            street: data.logradouro || "",
            city: data.localidade || "",
            state: data.uf || "",
            neighborhood: data.bairro || "",
          });
        } else {
          alert("CEP não encontrado.");
        }
      } catch (error) {
        alert("Erro ao consultar o CEP.");
      }
    }
  };

  // Função para atualizar o CEP e buscar o endereço
  const handleCepChange = (event) => {
    const newCep = event.target.value;
    setCep(newCep);

    if (newCep.length === 8) {
      consultarCep(newCep);
    }
  };

  // Calcular o subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Calcular o desconto total (aplicando o desconto de cada item)
  const discount = cartItems.reduce((total, item) => total + (item.price * item.quantity * item.discount) / 100, 0);

  // Calcular o total (Subtotal - desconto + taxa fixa, se houver)
  const total = subtotal - discount;

  return (
    <div className="checkout-page">
      <div className="billing-details">
        <h2>Billing Details</h2>
        <form>
          <div className="row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" />
            </div>
          </div>
          <div className="form-group">
            <label>Company Name (Optional)</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>ZIP code</label>
            <input
              type="text"
              value={cep}
              onChange={handleCepChange}
              maxLength="8"
            />
          </div>
          <div className="form-group">
            <label>Country / Region</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Street Address</label>
            <input type="text" value={address.street} readOnly />
          </div>
          <div className="form-group">
            <label>Town / City</label>
            <input type="text" value={address.city} readOnly />
          </div>
          <div className="form-group">
            <label>Province</label>
            <input type="text" value={address.state} readOnly />
          </div>
          <div className="form-group">
            <label>Add-on Address</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" />
          </div>
          <div className="form-group">
            <label>Additional Information</label>
            <textarea />
          </div>
        </form>
      </div>

      <div className="order-summary">
        <div className="product-list">
          <div className="product-item">
            <h2>Product</h2>
            <h2>Subtotal</h2>
          </div>
          {cartItems.map((item) => (
            <div key={item.id} className="product-item">
              <span><span className="name">{item.name}</span> x {item.quantity}</span>
              <span>Rs. {item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="price-section">
          <span>Subtotal</span>
          <span>Rs. {subtotal}</span>
        </div>

        <div className="price-section">
          <span>Discount</span>
          <span className="dis">- Rs. {discount}</span>
        </div>

        <div className="price-section">
          <span>Total</span>
          <span className="tot">Rs. {total}</span>
        </div>

        <div className="payment-methods">
          <div>
            <input type="radio" name="payment" id="bank-transfer" />
            <label htmlFor="bank-transfer">Direct Bank Transfer</label>
            <p>
              Make your payment directly into our bank account. Please use your
              Order ID as the payment reference.
            </p>
          </div>
          <div>
            <input type="radio" name="payment" id="cash-on-delivery" />
            <label htmlFor="cash-on-delivery">Cash On Delivery</label>
          </div>
        </div>

        <button>Place Order</button>
      </div>
    </div>
  );
};

export default Checkout;
