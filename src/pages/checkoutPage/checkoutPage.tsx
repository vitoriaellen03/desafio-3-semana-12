import React from "react";

const Checkout = () => {
  return (
    <div className="checkout-page">
      <div className="billing-details">
        <h2>Billing Details</h2>
        <form>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Company Name (Optional)</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>ZIP code</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Country / Region</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Street Address</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Town / City</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Province</label>
            <input type="text" />
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
        <h2>Product</h2>
        <p>
          Asgaard sofa x 1 <br />
          <span>Subtotal: Rs. 250,000.00</span>
        </p>
        <p>
          <strong>Total:</strong> Rs. 250,000.00
        </p>

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
