import React from "react";

const ContactPage = () => {
  return (
    <section>
      <section>
        <h1>Get In Touch With Us</h1>
        <p>
          For More Information About Our Product & Services, Please Feel Free To Drop Us
          An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
        </p>
      </section>
      
      <section className="">

        <div className="">
          <div className="info-item">
            <box-icon type='solid' name='map'></box-icon>
            <h2>Address</h2>
            <p>236 5th SE Avenue, New York NY10000, United States</p>
          </div>

          <div className="info-item">
            <box-icon name='phone' type='solid' ></box-icon>
            <h2>Phone</h2>
            <p>
              Mobile: (+84) 546-6789
              <br />
              Hotline: (+84) 456-6789
            </p>
          </div>

          <div className="info-item">
            <box-icon type='solid' name='alarm'></box-icon>
            <h2>Working Time</h2>
            <p>
              Monday-Friday: 9:00 - 22:00
              <br />
              Saturday-Sunday: 9:00 - 21:00
            </p>
          </div>
        </div>

        <form className="">
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" placeholder="Abc" />

          <label htmlFor="email">Email address</label>
          <input type="email" id="email" placeholder="Abc@def.com" />

          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" placeholder="This is an optional" />

          <label htmlFor="message">Message</label>
          <textarea id="message" placeholder="Hi! I'd like to ask about"></textarea>

          <button type="submit">Submit</button>
        </form>
      </section>
    </section>
  );
};

export default ContactPage;
