import React from "react";
import { useLocation } from "react-router-dom";
import '../Footer.css'

const FooterMain: React.FC = () => {
    const location = useLocation();
    const pathParts = location.pathname.split("/").filter(Boolean);

    const showFooterSection = ["/shop", "/contact", "/cart", "/checkout"].some((path) =>
        location.pathname.startsWith(path)
    );

    const title =
        pathParts[pathParts.length - 1]?.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()) || "Footer";

    return (
        <footer>
            {showFooterSection ? (
                <div className="footer-section">
                    <div className="cont-conteiner">
                        <div className="sec-conteiner">
                            <section className="mainfooter">
                                <div className="footercard">
                                    <div>
                                        <img src="../../../../assets/img/im-ff1.png" alt="" />
                                    </div>
                                    <div>
                                        <h4>High Quality</h4>
                                        <p>crafted from top materials</p>
                                    </div></div>
                                <div className="footercard">
                                    <div>
                                        <img src="../../../../assets/img/im-ff2.png" alt="" />
                                    </div>
                                    <div>
                                        <h4>Warranty Protection</h4>
                                        <p>Over 2 years</p>
                                    </div></div>
                                <div className="footercard">
                                    <div>
                                        <img src="../../../../assets/img/im-ff3.png" alt="" />
                                    </div>
                                    <div>
                                        <h4>Free Shipping</h4>
                                        <p>Order over 150 $</p>
                                    </div></div>
                                <div className="footercard">
                                    <div>
                                        <img src="../../../../assets/img/im-ff4.png" alt="" />
                                    </div>
                                    <div>
                                        <h4>24 / 7 Support</h4>
                                        <p>Dedicated support</p>
                                    </div></div>
                            </section>
                        </div>
                    </div>
                </div>
            ) : null}
        </footer>
    );
};

export default FooterMain;
