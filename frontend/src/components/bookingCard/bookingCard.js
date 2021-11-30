import React, { Component, useState } from "react";
import axios from "axios";
import "../../App.css";
import "./bookingCard.css";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";


export default function BookingCard() {
    const history = useHistory();

    const departureTripDate ={
        depDate : "",
    };
    const arrivalTripDate ={
        arrDate : "",
    };
    const newFlight = {
        from : "",    
        to : "",
        adults : 0,
        children : 0,
        seat_type : "",
    };
    const [depDate, setDepDate] = useState(departureTripDate);
    const [arrDate, setRetDate] = useState(arrivalTripDate);
    const [flight, setSeatInfo] = useState(newFlight);
    // const [children, setSeatInfo] = useState(newFlight);
    // const [seat_type, setSeatInfo] = useState(newFlight);
    // const [fromAirport, setSeatInfo] = useState(newFlight);
    // const [toAirport, setSeatInfo] = useState(newFlight);

    const now = new Date();
    const [min, setMin] = React.useState(now);
    const [max, setMax] = React.useState(now.getFullYear(), now.getMonth() + 6, now.getDate());
    const [startDate, setStartDate] = useState(now.getFullYear(), now.getMonth() + 6, now.getDate());
    const [endDate, setEndDate] = useState(now);
    const handleChangeSeatNumber = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setSeatInfo({...flight, [name] : value });
        // setSeatInfo({ ...newFlight, [name]: value });

    };
    const seatB=false; 
    const seatF=false; 
    const seatE=false;
    let cabin={

    }; 
    let depAirport=""; 
    let arrAirport ="";
    const handleSubmit = (e) => {
        e.preventDefault();
        const nonEmpty =
        depDate &&
        arrDate &&
        flight.adults ||
        flight.children &&
        flight.seat_type &&
        flight.from &&
        flight.to;
        if (flight.seat_type== "economy") {
            // seatE = true;
             cabin = {
                 economy : flight.adults + flight.children
             }
        }else if (flight.seat_type== "First"){
            // seatF =true;
             cabin = {
                First : flight.adults + flight.children
            }
        }else{
            // seatB =true;
             cabin = {
                business : flight.adults + flight.children
            }
        };
        depAirport = {
            from : flight.from,
            to : flight.to
        };
        arrAirport = {
            from : flight.to,
            to : flight.from
        };
        if (nonEmpty) {
            let departureTrip = {
                trip_date : depDate,
                cabin_classes: cabin,
                airport : depAirport
            };
            let arrivalTrip = {
                trip_date : arrDate,
                cabin_classes: cabin,
                airport : arrAirport
            };
            this.props.history.push({
                pathname: '/flights', // use this pathname for reserving a flight page
                  state: departureTrip, arrivalTrip
              })
            setRetDate(departureTripDate);
            setDepDate(arrivalTripDate);
            setSeatInfo(newFlight);
        }else {
            console.log("Not entire form is filled");
        }
    };
    return (
      <div>
            <div className="booking-container">
                <h1>Book Your Flight Now!</h1>
                <br />
                    <div className="form-control">
                        <p className="display-4 text-center">From:</p>
                        <input 
                        type="text" 
                        id="from"
                        name="from"
                        value={flight.from}
                        onChange={handleChangeSeatNumber}
                        />
                    </div>
                    <div className="form-control">
                        <p className="display-4 text-center">To:</p>
                        <input 
                        type="text" 
                        id="to"
                        name="to"
                        value={flight.to}
                        onChange={handleChangeSeatNumber}
                        />
                    </div>
                    {/* <DatePicker
                        controls={['calendar']}
                        closeOnScroll={true}
                        select="range"
                        startInput={start}
                        endInput={end}
                        dateFormat="YYYY-MM-DD"
                        min={min}
                        max={max}
                        onChangeRaw={(event) => handleChangeRaw(event.target.value)}
                                     /> */}
                    <div className="form-control">                
                    <p className="display-4 text-center"> Select Dep date</p>
                     <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        min={min}
                        max={max}
                        // dateFormat="yyyy-mm-dd"

                      />
                      </div> 
                      <div className="form-control"> 
                    <p className="display-4 text-center"> Select Return date</p>

                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        min={min}
                        max={max}
                        // dateFormat="yyyy-mm-dd"
                      />
                    </div> 

                         {/* <Input ref={setDepDate} name="depDate" placeholder="Select Dep date">Depurture</Input>
                         <Input ref={setRetDate} name="arrDate" placeholder="Select Return date">Return</Input> */}
                    <div className="form-control">
                        <p className="display-4 text-center">Adults:</p>
                        <input 
                        type="number" 
                        id="no_of_adults"
                        name="adults"
                        value={flight.adults}
                        onChange={handleChangeSeatNumber}
                        />
                    </div>
                    <div className="form-control">
                        <p className="display-4 text-center">Children:</p>
                        <input 
                        type="number" 
                        id="no_of_children"
                        name="children"
                        value={flight.children}
                        onChange={handleChangeSeatNumber}
                        />
                    </div>
                    <select class="selectpicker" data-style="btn-info" name="selectpicker">
                        <optgroup label="Class">
                            <option name="" value="0">Select cabin class</option>
                            <option name="seat_type" value="business">Business</option>
                            <option name="seat_type" value="First">First</option>
                            <option name="seat_type" value="economy">Economy</option>
                        </optgroup>
                     </select>
                     <button
                        className="createbutton"
                        type="submit"
                        value="Create"
                        onClick={handleSubmit}
                    >
                        BOOK!
          </button>
            </div>
      </div>
    );
}
