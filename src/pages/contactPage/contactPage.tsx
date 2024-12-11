import React, { useState } from "react";
import './contactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email address.";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted successfully:", formData);
      alert("Form submitted successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setFormErrors({});
    }
  };

  return (
    <section className="contact-page">
      <section className="contact-header">
        <h1 className="heading-primary">Get In Touch With Us</h1>
        <p className="contact-description">
          For More Information About Our Product & Services, Please Feel Free To Drop Us
          An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
        </p>
      </section>

      <section className="contact-info">
        <div className="col contact-info-items">
          <div className="info-item">
            <box-icon type="solid" name="map" className="info-icon"></box-icon>
            <div className="group">
              <h2 className="info-title">Address</h2>
              <p className="info-details">236 5th SE Avenue, New York NY10000, United States</p>
            </div>
          </div>

          <div className="info-item">
            <box-icon name="phone" type="solid" className="info-icon"></box-icon>
            <div className="group">
              <h2 className="info-title">Phone</h2>
              <p className="info-details">
                Mobile: (+84) 546-6789
                <br />
                Hotline: (+84) 456-6789
              </p>
            </div>
          </div>

          <div className="info-item">
            <box-icon type="solid" name="alarm" className="info-icon"></box-icon>
            <div className="group">
              <h2 className="info-title">Working Time</h2>
              <p className="info-details">
                Monday-Friday: 9:00 - 22:00
                <br />
                Saturday-Sunday: 9:00 - 21:00
              </p>
            </div>
          </div>
        </div>

        <form className="col contact-form" onSubmit={handleSubmit}>
          <div className="c-form">
            <label htmlFor="name" className="form-label">Your name</label>
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder="Abc"
              value={formData.name}
              onChange={handleInputChange}
            />
            {formErrors.name && <span className="error-message">{formErrors.name}</span>}

            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="text"
              id="email"
              className="form-input"
              placeholder="Abc@def.com"
              value={formData.email}
              onChange={handleInputChange}
            />
            {formErrors.email && <span className="error-message">{formErrors.email}</span>}

            <label htmlFor="subject" className="form-label">Subject</label>
            <input
              type="text"
              id="subject"
              className="form-input"
              placeholder="This is optional"
              value={formData.subject}
              onChange={handleInputChange}
            />

            <label htmlFor="message" className="form-label">Message</label>
            <textarea
              id="message"
              className="form-textarea"
              placeholder="Hi! I'd like to ask about"
              value={formData.message}
              onChange={handleInputChange}
            ></textarea>
            {formErrors.message && <span className="error-message">{formErrors.message}</span>}

            <button type="submit" className="form-submit-button">Submit</button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default ContactPage;
