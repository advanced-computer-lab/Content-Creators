export default function createRowsChanging(seatData, chosenSeats) {
    const createRows = (data) => {
        return data.map(({ seat_number, reserved }) => {
            const createdSeat = {
                id: seat_number,
                number: seat_number,
                isReserved: reserved,
            };
            return createdSeat;
        });
    };

    //make it equal paramater in the future
    const divisionSeat = 5;
    const divideNumber = Math.floor(seatData.length / divisionSeat);
    let arr = [];
    let index = 0;
    for (let i = 0; i < divideNumber; i++) {
        arr.push(seatData.slice(index, index + divisionSeat));
        index = index + divisionSeat;
    }
    if (index != seatData.length) {
        arr.push(seatData.slice(index, seatData.length + 1));
    }

    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        const newRows = createRows(arr[i]);
        newArr.push(newRows);
    }

    chosenSeats.map((elem) => {
        console.log("ELEM IS", elem);
        const row = String(Math.floor(Number(elem.slice(1)) / 5));
        console.log("ROW IS", row);
        const rowSeat = Number(elem.slice(1)) % 5;
        console.log("ROW_SEAT IS", rowSeat);
        newArr[row][rowSeat].isReserved = false;
        newArr[row][rowSeat].isSelected = true;
    });

    return newArr;
}
