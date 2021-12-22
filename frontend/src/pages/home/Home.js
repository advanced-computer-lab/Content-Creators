import React from "react";
import "./home.css"
import BookingCard from "../../components/bookingCard/bookingCard";
import Footer from "../../components/footer/Footer";

function Home() {
    return (
        <>
        
        <BookingCard />
        <div className="hero-container">
        <img src="/images/home1_bg.jpg" alt="" height="100%" width="100%" />
        </div>

        <Footer />
        </>
    );
}

export default Home;
