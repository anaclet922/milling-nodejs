const conn = require('./database');




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


getUserById = async (id) => {
    const [workforce] = await (await conn).query("SELECT * FROM tbl_workforce WHERE id = ?", [id]);
    if (workforce[0]) {
        return `${workforce[0].first_name} ${workforce[0].last_name}`;
    } else {
        return '';
    }

}



getSellerById = async (id) => {
    const [seller] = await (await conn).query("SELECT * FROM tbl_sellers WHERE id = ?", [id]);
    if (seller[0]) {
        return `${seller[0].first_name} ${seller[0].last_name}`;
    } else {
        return '';
    }
}



getCustomerById = async (id) => {
    const [customer] = await (await conn).query("SELECT * FROM tbl_customers WHERE id = ?", [id]);
    if (customer[0]) {
        return `${customer[0].first_name} ${customer[0].last_name}`;
    } else {
        return '';
    }
}





getVehicleById = async (id) => {
    const [seller] = await (await conn).query("SELECT * FROM tbl_vehicles WHERE id = ?", [id]);
    if (seller[0]) {
        return `${seller[0].plate_number}`;
    } else {
        return '';
    }
}


function getMonday(d) {
    d = new Date(d);
    var day = d.getDay();
    const diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}




function getSunday(d) {
    d = new Date(d);
    var day = d.getDay();
    const diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    const firstday = new Date(d.setDate(diff));
    const lastDay = new Date(firstday);
    lastDay.setDate(lastDay.getDate() + 6);
    return lastDay;
}


function getFirstDayMonth() {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    var year = firstDay.getFullYear();
    var month = (firstDay.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
    var day = firstDay.getDate().toString().padStart(2, '0');

    var formattedLastDay = `${year}-${month}-${day}`;

    return formattedLastDay
}


function getLastDayMonth() {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    
    var year = lastDay.getFullYear();
    var month = (lastDay.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-indexed
    var day = lastDay.getDate().toString().padStart(2, '0');

    var formattedLastDay = `${year}-${month}-${day}`;

    return formattedLastDay
}


module.exports = { getFormatedDate, getUserById, getCustomerById, getVehicleById, getMonday, getSunday, getFirstDayMonth, getLastDayMonth };