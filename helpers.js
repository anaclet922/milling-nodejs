getFormatedDate = (timestamp) => {
    let date = timestamp;
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-indexed in JavaScript
    const year = date.getFullYear();

    // Pad the day and month with leading zeros if necessary
    const paddedDay = day.toString().padStart(2, "0");
    const paddedMonth = month.toString().padStart(2, "0");

    return `${paddedDay}/${paddedMonth}/${year}`;
}










module.exports = { getFormatedDate };