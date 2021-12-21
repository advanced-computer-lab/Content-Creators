export default function createRows(seatData) {
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

    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
        const newRows = createRows(arr[i]);
        newArr.push(newRows);
    }
    return newArr;
}
