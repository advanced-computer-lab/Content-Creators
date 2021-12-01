import React from 'react'
import "../../components/reservationDetailsCard/reservationDetailsCard.css";
import reservationDetailsCard from '../../components/reservationDetailsCard/reservationDetailsCard'

function reservationDetails() {
    return (
        <div>
            <div className="reservationDetailsCard">
                <div className="reservationDetailsCard-body">
                    <div className="reservationDetailsCard-header">
                        <h3> Hi Ahmed Mohamed,</h3>
                        <br/>
                        <p>Your reservation request for flight CAI-LAX roundtrip is almost done!<br/> Please review the details of your booking.</p>
                    </div>
                    <br/>
                    <div className="reservationDetailsCard-details">
                      <p>Cabin class: FirstClass</p>
                      <br/>
                      <p>Number of Adults: 3</p>
                      <br/>
                      <p>Number of Children: 0</p>
                      <br/>
                      <p>Seat Numbers: 2A,3B,3C</p>
                    </div>
                    <div className="reservationDetailsCard-payment">
                        <br/>
                    <p>Total Price: 4380</p>
                    <button
                        className="createbutton"
                        type="submit"
                        value="Create"
                        //onClick={handleSubmit}
                    >
                        Confirm Reservation
                    </button>
                    </div>    
                </div>
            </div>
        </div>
    )
}

export default reservationDetails
