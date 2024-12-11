import React, { useEffect, useState } from "react";
import "./checkoutPage.css";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    neighborhood: "",
  }); 

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    addOnAddress: "",
    email: "",
    additionalInfo: "",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

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
          setFormErrors((prevErrors) => ({ ...prevErrors, cep: "Zip code not found." }));
        }
      } catch (error) {
        setFormErrors((prevErrors) => ({ ...prevErrors, cep: "Error when querying the CEP." }));
      }
    }
  };

  const handleCepChange = (event) => {
    const newCep = event.target.value;
    setCep(newCep);

    if (newCep.length === 8) {
      consultarCep(newCep);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); 
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName) errors.firstName = "First name is required.";
    if (!formData.lastName) errors.lastName = "Last name is required.";
    if (!cep) errors.cep = "ZIP code is required.";
    if (!formData.country) errors.country = "Country/Region is required.";
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email address.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
    }
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    if (validateForm()) {
    }
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const discount = cartItems.reduce((total, item) => total + (item.price * item.quantity * item.discount) / 100, 0);

  const total = subtotal - discount;

  return (
    <div className="checkout-page">
      <div className="billing-details">
        <h2>Billing Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
              {formErrors.firstName && <span className="error-message">{formErrors.firstName}</span>}
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
              {formErrors.lastName && <span className="error-message">{formErrors.lastName}</span>}
            </div>
          </div>
          <div className="form-group">
            <label>Company Name (Optional)</label>
            <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>ZIP code</label>
            <input type="text" name="cep" value={cep} onChange={handleCepChange} maxLength="8" />
            {formErrors.cep && <span className="error-message">{formErrors.cep}</span>}
          </div>
          <div className="form-group">
            <label>Country / Region</label>
            <input type="text" name="country" value={formData.country} onChange={handleInputChange} />
            {formErrors.country && <span className="error-message">{formErrors.country}</span>}
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
            <input type="text" name="addOnAddress" value={formData.addOnAddress} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
          </div>
          <div className="form-group">
            <label>Additional Information</label>
            <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange} />
          </div>
          <button type="submit" className="btn-place-order" onClick={handlePlaceOrder}>Place Order</button>
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
              Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won't be shipped until the funds have cleared in our account.
            </p>
          </div>
          <div>
            <input type="radio" name="payment" id="cash-delivery" />
            <label htmlFor="cash-delivery">Cash on Delivery</label>
          </div>
          <div>
            <input type="radio" name="payment" id="credit-card" />
            <label htmlFor="credit-card">Credit Card</label>
          </div>
        </div>
        <button type="submit" className="btn-place-order" onClick={handlePlaceOrder}>Place Order</button>
      </div>
    </div>
  );
};

export default Checkout;
