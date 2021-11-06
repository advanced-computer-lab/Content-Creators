import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


import { Button } from '../Button';
import '../../App.css';
import '../UpdateFlight.css';

class UpdateFlight extends Component {
    constructor() {
      super();
      this.state = {
        flight_number: '',
        departure_time:'',
        arrival_time:'',
        trip_date:'',
        economy:0,
        business:0,
        First:0,
        from:'',
        to:'',
        price:0,
      };
    }
    onChange = e => {
      this.setState({ [e.target.name]: e.target.value });
    };
  
    onSubmit = e => {
      e.preventDefault();
  
      const data = {
        flight_number: this.state.flight_number,
        departure_time: this.state.departure_time,
        arrival_time: this.state.arrival_time,
        trip_date: this.state.trip_date,
        economy:this.state.economy,
        business:this.state.business,
        First:this.state.First,
        from:this.state.from,
        to:this.state.to,
        price:this.state.price,
      };
  
      axios
        .post('http://localhost:8000/users/update-flight', data)
        .then(res => {
          this.setState({
            flight_number: '',
            departure_time:'',
            arrival_time:'',
            trip_date:'',
            economy:0,
            business:0,
            First:0,
            from:'',
            to:'',
            price:0,
            
          })
          this.props.history.push('/');
        })
        .catch(err => {
          console.log("Error in Updating flight!");
        })
    };
  
    render() {
                  return (
              <div className="UpdateFlight">
                 <div className="container">

                <div className="row">

                      <div className="col-md-8 m-auto">
                      <br />
                      </div>
                      <div className="col-md-8 m-auto">
                      <h1 className="display-4 text-center">Update Flight</h1>

                    <div className="form" 
                       noValidate onSubmit={this.onSubmit}>
         
                          <div className='form-group'>
                          <p className="display-4 text-center">Flight Number:</p>

                          <input
                              type='text'
                              placeholder='Flight No.'
                              name= 'flight_number'
                              className='form-control'
                              required = {true}
                              value={this.state.flight_number}
                              onChange={this.onChange}
                          />
                          </div>
                          <br />
  
                          <div className='form-group'>
                          <p className="display-4 text-center">Departure Time:</p>
                          <input
                              type='text'
                              placeholder='DepartureTime'
                              name='departure_time'
                              className='form-control'
                             value={this.state.departure_time}
                              onChange={this.onChange}
                          />
                          </div>
                          <br />

                          <div className='form-group'>
                          <p className="display-4 text-center">Arrival Time:</p>

                          <input
                              type='text'
                              placeholder='ArrivalTime'
                              name='arrival_time'
                              className='form-control'
                              value={this.state.arrival_time}
                              onChange={this.onChange}
                          />
                          </div>
                          <br />

                          <div className='form-group'>
                          <p className="display-4 text-center">Trip Date:</p>

                          <input
                              type='text'
                              placeholder='Date of Trip'
                              name='trip_date'
                              className='form-control'
                              value={this.state.trip_date}
                              onChange={this.onChange}
                          />
                          </div>
                          <br />

                          <div className='form-group'>
                          <p className="display-4 text-center">Number of Economy Seats:</p>

                          <input
                              type='number'
                              placeholder='Number of Economy Seats'
                              name='economy'
                              className='form-control'
                              value={this.state.economy}
                              onChange={this.onChange}
                          />
                          </div>
                          <br />

                          <div className='form-group'>
                          <p className="display-4 text-center">Number of Business Seats:</p>

                          <input
                              type='number'
                              placeholder='Number of Business Seats'
                              name='business'
                              className='form-control'
                              value={this.state.business}
                              onChange={this.onChange}
                          />
                          </div>
                          <br />

                          <div className='form-group'>
                          <p className="display-4 text-center">Number of First Seats:</p>
                        <br />
                          <input
                              type='number'
                              placeholder='Number of First Seats'
                              name='First'
                              className='form-control'
                              value={this.state.First}
                              onChange={this.onChange}
                          />
                          </div>
                          <br />

                          <div className='form-group'>
                          <p className="display-4 text-center">Departure Airport:</p>

                          <input
                              type='text'
                              placeholder='Departure Airport'
                              name='from'
                              className='form-control'
                              value={this.state.from}
                              onChange={this.onChange}
                          />
                          </div>
                          <br />

                          <div className='form-group'>
                          <p className="display-4 text-center">Arrival Airport:</p>

                          <input
                              type='text'
                              placeholder='Arrival Airport'
                              name='to'
                              className='form-control'
                              value={this.state.to}
                              onChange={this.onChange}
                          />
                          </div>
                          <br />

                          <div className='form-group'>
                          <p className="display-4 text-center">Price:</p>

                          <input
                              type='number'
                              placeholder='Price'
                              name='price'
                              className='form-control'
                              value={this.state.price}
                              onChange={this.onChange}
                          />
                          </div>
                          <br />

                          <input
                                  type="submit"
                                 value="Update"
                                className="button"

                                 />                           
                            <br />
                            <br />

                          <input
                                  type="submit"
                                 value="Cancel"
                                className="cancelButton"
                                 />
                          <br />
                          

                      {/* </form> */}
                      </div>
                      </div>

                   

                  </div>
                  </div>
                  </div>

      );
    }}
export default UpdateFlight;