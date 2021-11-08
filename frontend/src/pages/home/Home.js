import React from "react";
import "../../App.css";
import Cards from "../../components/cards/Cards";
import HeroCenter from "../../components/homeCenter/HomeCenter";
import Footer from "../../components/footer/Footer";

function Home() {
    return (
        <>
            <HeroCenter />
            <Cards />
            <Footer />
        </>
    );
}

export default Home;
