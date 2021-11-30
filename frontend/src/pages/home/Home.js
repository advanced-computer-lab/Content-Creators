import React from "react";
import "../../App.css";
import Cards from "../../components/cards/Cards";
import HeroCenter from "../../components/homeCenter/HomeCenter";
import Footer from "../../components/footer/Footer";
import BookingCard from "../../components/bookingCard/bookingCard";
function Home() {
    return (
        <>
            <HeroCenter />
             {/* <BookingCard /> */}
            <Cards />
            <Footer />
           
        </>
    );
}

export default Home;
