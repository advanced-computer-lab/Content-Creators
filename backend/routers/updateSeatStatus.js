//app.use(verifyToken()); will be read first in the middleware before going to any step here hense authentication.

function updateSeatStatus(allSeats, seatNumbers, cabinClass, type) {
    seatNumbers = seatNumbers.map((z) => parseInt(z.slice(1)));
    if (type == "add") {
        for (let i = 0; i < seatNumbers.length; i++) {
            allSeats[cabinClass][seatNumbers[i]]["reserved"] = true;
        }
        return allSeats;
    } else if (type == "delete") {
        for (let i = 0; i < seatNumbers.length; i++) {
            allSeats[cabinClass][seatNumbers[i]]["reserved"] = false;
        }
        return allSeats;
    }
}

module.exports = updateSeatStatus;
