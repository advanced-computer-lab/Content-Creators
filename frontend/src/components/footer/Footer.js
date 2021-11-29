import React,{ useEffect, useState } from "react";
import "./Footer.css";
import { Button } from "../button/Button";
import { Link } from "react-router-dom";
var nodemailer = require("nodemailer");

function Footer() {
    const emptyEmail = "";
    const [subscribingEmail, setSubEmail] = useState("");

   const onChangeEmail = (e) =>{
       const name = e.target.name;
       const value = e.target.value;
      setSubEmail(value);
    };
    
    const subscribe = (e) =>{
        e.preventDefault();
        var transporter = nodemailer.createTransport({
            service: "outlook",
            auth: {
                user: "ibnfirnas_acl@outlook.com",
                pass: "firnas123",
            },
        });

        var mailOptions = {
            from: "ibnfirnas_acl@outlook.com",
            to: subscribingEmail,
            subject: "Thank you for subscribing",
            text: "You are now subscribed to the most successful airline company you will ever KNOW <3",
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        setSubEmail("");
    };
    return (
        <div className="footer-container">
            {/* <section className="footer-subscription">
                <p className="footer-subscription-heading"> */}
                    {/* Join the Adventure newsletter to receive our best vacation deals */}
        {/* </p> */}
                {/* <p className="footer-subscription-text"> */}
                    {/* You can unsubscribe at any time. */}
        {/* </p> */}
                {/* <div className="input-areas"> */}
                {/* <div
                    // action="post"
                    onSubmit={subscribe}
                >
                    <form>
                        <input
                            className="footer-input"
                            name="email"
                            type="text"
                            placeholder="Your Email"
                            value={subscribingEmail}
                            onChange={onChangeEmail}
                        />
                        <Button buttonStyle="btn--outline" onClick={subscribe}>Subscribe</Button>
                    </form>
                </div> */}
            {/* </section> */}
            {/* <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/sign-up'>How it works</Link>
            <Link to='/'>Testimonials</Link>
            <Link to='/'>Careers</Link>
            <Link to='/'>Investors</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Support</Link>
            <Link to='/'>Destinations</Link>
            <Link to='/'>Sponsorships</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Videos</h2>
            <Link to='/'>Submit Video</Link>
            <Link to='/'>Ambassadors</Link>
            <Link to='/'>Agency</Link>
            <Link to='/'>Influencer</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Social Media</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
          </div>
        </div>
      </div> */}
            <section class="social-media">
                <div class="social-media-wrap">
                    <div class="footer-logo">
                        <Link to="/" className="social-logo">
                            Ibn Firnas Airlines
              <img src="/images/logologo.png" width="50" height="50" />
                        </Link>
                    </div>
                    <small class="website-rights">Ibn Firnas Airlines © 2021</small>
                    {/* <div class="social-icons">
                        <Link
                            class="social-icon-link facebook"
                            to="/"
                            target="_blank"
                            aria-label="Facebook"
                        >
                            <i class="fab fa-facebook-f" />
                        </Link>
                        <Link
                            class="social-icon-link instagram"
                            to="/"
                            target="_blank"
                            aria-label="Instagram"
                        >
                            <i class="fab fa-instagram" />
                        </Link>
                        <Link
                            class="social-icon-link youtube"
                            to="/"
                            target="_blank"
                            aria-label="Youtube"
                        >
                            <i class="fab fa-youtube" />
                        </Link>
                        <Link
                            class="social-icon-link twitter"
                            to="/"
                            target="_blank"
                            aria-label="Twitter"
                        >
                            <i class="fab fa-twitter" />
                        </Link>
                        <Link
                            class="social-icon-link twitter"
                            to="/"
                            target="_blank"
                            aria-label="LinkedIn"
                        >
                            <i class="fab fa-linkedin" />
                        </Link>
                    </div> */}
                </div>
            </section>
        </div>
    );
}

export default Footer;
