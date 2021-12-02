import React, {Component} from 'react'
 
import SeatPicker from 'react-seat-picker'
 
// import BookingSeat from "../../components/bookingSeat/bookingSeat";

export default class App extends Component {
  state = {
    loading: false
  }
 
  addSeatCallback = ({ row, number, id }, addCb) => {
    this.setState({
      loading: true
    }, async () => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log(`Added seat ${number}, row ${row}, id ${id}`)
      const newTooltip = `tooltip for id-${id} added by callback`
      addCb(row, number, id, newTooltip)
      this.setState({ loading: false })
    })
  }
 
  
 
  removeSeatCallback = ({ row, number, id }, removeCb) => {
    this.setState({
      loading: true
    }, async () => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log(`Removed seat ${number}, row ${row}, id ${id}`)
      // A value of null will reset the tooltip to the original while '' will hide the tooltip
      const newTooltip = ['A', 'B', 'C'].includes(row) ? null : ''
      removeCb(row, number, newTooltip)
      this.setState({ loading: false })
    })
  }
 
  render() {
    const rows = [
      [{id: 1, number: 'A', isSelected: true, tooltip: 'Reserved'}, null, {id: 2, number: 'C', tooltip: 'Cost more: 15$'}, null,null, {id: 3, number: 'D', isReserved: true, orientation: 'east', tooltip: 'Reserved'}, null, {id: 4, number: 'K', orientation: 'west'} ],
      [],
      [{id: 1, number: 'A', isSelected: true, tooltip: 'Reserved'}, null, {id: 2, number: 'C', tooltip: 'Cost more: 15$'}, null,null, {id: 3, number: 'D', isReserved: true, orientation: 'east', tooltip: 'Reserved'}, null, {id: 4, number: 'K', orientation: 'west'} ],
      [],
      [{id: 1, number: 'A', isSelected: true, tooltip: 'Reserved'}, null, {id: 2, number: 'C', tooltip: 'Cost more: 15$'}, null, null,{id: 3, number: 'D', isReserved: true, orientation: 'east', tooltip: 'Reserved'}, null, {id: 4, number: 'K', orientation: 'west'} ],
      [],
      [{id: 19, number: 'A', tooltip: 'Cost: 25$'}, {id: 20, number: 'B'},{id: 19, number: 'C', tooltip: 'Cost more: 25$'}, null,null,{id: 19, number: 'D', tooltip: 'Cost: 25$'}, {id: 21, number: 'E', orientation: 'east'}, {id: 22, number: 'K', orientation: 'west'}, null],
      [{id: 19, number: 'A', tooltip: 'Cost: 25$'}, {id: 20, number: 'B'},{id: 19, number: 'C', tooltip: 'Cost more: 25$'}, null,null,{id: 19, number: 'D', tooltip: 'Cost: 25$'}, {id: 21, number: 'E', orientation: 'east'}, {id: 22, number: 'K', orientation: 'west'}, null],
      [{id: 19, number: 'A', tooltip: 'Cost: 25$'}, {id: 20, number: 'B'},{id: 19, number: 'C', tooltip: 'Cost more: 25$'}, null,null,{id: 19, number: 'D', tooltip: 'Cost: 25$'}, {id: 21, number: 'E', orientation: 'east'}, {id: 22, number: 'K', orientation: 'west'}, null],
      [],
      [null,{id: 19, number: 'A', tooltip: 'Cost: 25$'}, {id: 19, number: 'C', tooltip: 'Cost more: 25$'}, null,null,{id: 19, number: 'D', tooltip: 'Cost: 25$'}, {id: 22, number: 'K', orientation: 'west'}, null],
      [{id: 19, number: 'A', tooltip: 'Cost: 25$'}, {id: 20, number: 'B'},{id: 19, number: 'C', tooltip: 'Cost more: 25$'}, null,null,{id: 19, number: 'D', tooltip: 'Cost: 25$'}, {id: 21, number: 'E', orientation: 'east'}, {id: 22, number: 'K', orientation: 'west'}, null],
      [{id: 19, number: 'A', tooltip: 'Cost: 25$'}, {id: 20, number: 'B'},{id: 19, number: 'C', tooltip: 'Cost more: 25$'}, null,null,{id: 19, number: 'D', tooltip: 'Cost: 25$'}, {id: 21, number: 'E', orientation: 'east'}, {id: 22, number: 'K', orientation: 'west'}, null],
      [{id: 19, number: 'A', tooltip: 'Cost: 25$'}, {id: 20, number: 'B'},{id: 19, number: 'C', tooltip: 'Cost more: 25$'}, null,null,{id: 19, number: 'D', tooltip: 'Cost: 25$'}, {id: 21, number: 'E', orientation: 'east'}, {id: 22, number: 'K', orientation: 'west'}, null],
      [{id: 19, number: 'A', tooltip: 'Cost: 25$'}, {id: 20, number: 'B'},{id: 19, number: 'C', tooltip: 'Cost more: 25$'}, null,null,{id: 19, number: 'D', tooltip: 'Cost: 25$'}, {id: 21, number: 'E', orientation: 'east'}, {id: 22, number: 'K', orientation: 'west'}, null],
      [{id: 19, number: 'A', tooltip: 'Cost: 25$'}, {id: 20, number: 'B'},{id: 19, number: 'C', tooltip: 'Cost more: 25$'}, null,null,{id: 19, number: 'D', tooltip: 'Cost: 25$'}, {id: 21, number: 'E', orientation: 'east'}, {id: 22, number: 'K', orientation: 'west'}, null],
      [{id: 19, number: 'A', tooltip: 'Cost: 25$'}, {id: 20, number: 'B'},{id: 19, number: 'C', tooltip: 'Cost more: 25$'}, null,null,{id: 19, number: 'D', tooltip: 'Cost: 25$'}, {id: 21, number: 'E', orientation: 'east'}, {id: 22, number: 'K', orientation: 'west'}, null],
      [{id: 19, number: 'A', tooltip: 'Cost: 25$'}, {id: 20, number: 'B'},{id: 19, number: 'C', tooltip: 'Cost more: 25$'}, null,null,{id: 19, number: 'D', tooltip: 'Cost: 25$'}, {id: 21, number: 'E', orientation: 'east'}, {id: 22, number: 'K', orientation: 'west'}, null],
      [{id: 19, number: 'A', tooltip: 'Cost: 25$'}, {id: 20, number: 'B'},{id: 19, number: 'C', tooltip: 'Cost more: 25$'}, null,null,{id: 19, number: 'D', tooltip: 'Cost: 25$'}, {id: 21, number: 'E', orientation: 'east'}, {id: 22, number: 'K', orientation: 'west'}, null],
      [{id: 19, number: 'A', tooltip: 'Cost: 25$'}, {id: 20, number: 'B'},{id: 19, number: 'C', tooltip: 'Cost more: 25$'}, null,null,{id: 19, number: 'D', tooltip: 'Cost: 25$'}, {id: 21, number: 'E', orientation: 'east'}, {id: 22, number: 'K', orientation: 'west'}, null],
      [{id: 19, number: 'A', tooltip: 'Cost: 25$'}, {id: 20, number: 'B'},{id: 19, number: 'C', tooltip: 'Cost more: 25$'}, null,null,{id: 19, number: 'D', tooltip: 'Cost: 25$'}, {id: 21, number: 'E', orientation: 'east'}, {id: 22, number: 'K', orientation: 'west'}, null],
      [{id: 19, number: 'A', tooltip: 'Cost: 25$'}, {id: 20, number: 'B'},{id: 19, number: 'C', tooltip: 'Cost more: 25$'}, null,null,{id: 19, number: 'D', tooltip: 'Cost: 25$'}, {id: 21, number: 'E', orientation: 'east'}, {id: 22, number: 'K', orientation: 'west'}, null],
      
    ]
    const {loading} = this.state
    return (
      <div>
        <h1>Seat Picker</h1>
        <div style = {{marginLeft: '620px'}}>
        <img src="/images/Airbus_Seat_map.jpg" alt="" height="1500" width="670"  />
        <view style={{position: 'absolute', top: 520, left: 830, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>

          <SeatPicker
            addSeatCallback={this.addSeatCallback}
            removeSeatCallback={this.removeSeatCallback}
            rows={rows}
            maxReservableSeats={3}
            // alpha
            // visible
            selectedByDefault
            // loading={loading}
            tooltipProps={{multiline: true}}
          />
        </view>
        </div>

      </div>
    )
  }}