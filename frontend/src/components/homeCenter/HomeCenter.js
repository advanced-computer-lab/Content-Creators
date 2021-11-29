import React from "react";
import "../../App.css";
import { Button } from "../button/Button";
import "./HomeCenter.css";
import BookingCard from "../../components/bookingCard/bookingCard";

export default function HomeCenter() {
    return (
        <div className="hero-container">
            <img src="/images/pattern.jpeg" alt="" height="1500" width="1679" />
            <h1 >Where the journey begins!</h1>
            
            <BookingCard />

            <p >What are you waiting for?</p>

            {/* <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          WATCH TRAILER <i className='far fa-play-circle' />
        </Button>
      </div> */}
        </div>
    );
}
