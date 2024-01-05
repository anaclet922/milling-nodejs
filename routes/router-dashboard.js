const express = require('express');
const routerDashboard = express.Router();
const bcrypt = require('bcrypt');
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');


routerDashboard.use(express.urlencoded({ extended: true }));

const workforceController = require('../controllers/workforce');
const purchasesController = require('../controllers/purchase');
const millingController = require('../controllers/milling');
const inventoryController = require('../controllers/inventory');
const debtsController = require('../controllers/debts');
const expensesController = require('../controllers/expenses');
const customersController = require('../controllers/customers');
const sellersController = require('../controllers/sellers');
const usersController = require('../controllers/users');
const configsController = require('../controllers/configs');
const activitiesController = require('../controllers/activities');
const salesController = require('../controllers/sales');
const stockController = require('../controllers/stock');
const paymentController = require('../controllers/payments');


const { getFormatedDate, getUserById, getMonday, getSunday, getFirstDayMonth, getLastDayMonth } = require('../helpers');


routerDashboard.use(function (req, res, next) {

    if (!req.session.loggedin) {
        return res.redirect('/auth');
    }

    res.locals.getFormatedDate = getFormatedDate;

    next();

});

routerDashboard.get('', async (req, res) => {

    const [maize_stock_object] = await (await conn).query("SELECT * FROM tbl_stock_maize");
    const [branda_stock_object] = await (await conn).query("SELECT * FROM tbl_stock_branda");
    const [flour_stock_object] = await (await conn).query("SELECT * FROM tbl_stock_flour");
    const [workforces_object] = await (await conn).query("SELECT COUNT(*) AS quantity FROM tbl_workforce");

    let flour = 0;

    if(flour_stock_object.length > 0){
        flour += (flour_stock_object[0].quantity_5kg * 5);
        flour += (flour_stock_object[0].quantity_10kg * 10);
        flour += (flour_stock_object[0].quantity_25kg * 25);
    }

    let page_data = {
        title: "Home",
        currrentPath: "/",
        maize_stock: ((maize_stock_object.length > 0) ? maize_stock_object[0].quantity : 0),
        branda_stock: ((branda_stock_object.length > 0) ? branda_stock_object[0].quantity : 0),
        flour_stock: flour,
        workforces: workforces_object[0].quantity
    };

    res.render('dashboard/home', page_data);
})

routerDashboard.get('/activities', activitiesController.activitiesHome);
routerDashboard.post('/activities/new', activitiesController.postNewReminder);
routerDashboard.get('/delete-activity', activitiesController.deleteActivity);
routerDashboard.post('/activities/edit', activitiesController.editActivity);


routerDashboard.get('/reports', async (req, res) => {

    let today_date = new Date();
    let today = `${today_date.getFullYear()}-${(today_date.getMonth() + 1).toString().padStart(2, "0")}-${today_date.getDate().toString().padStart(2, "0")}`

    const [total_purchase_today] = await (await conn).query("SELECT sum(total_price) AS amount FROM tbl_purchases WHERE created_at LIKE ?", [today + '%']);
    const [total_expenses_today] = await (await conn).query("SELECT sum(amount) AS amount FROM tbl_expenses WHERE created_at LIKE ?", [today + '%']);
    const [total_vehicle_today] = await (await conn).query("SELECT sum(expense_amount) AS amount FROM tbl_vehicles_report WHERE created_at LIKE ?", [today + '%']);
    const [total_sale_debt_today] = await (await conn).query("SELECT sum(amount_debited) AS amount FROM tbl_sales WHERE paid_or_debt = 'DEBT' AND created_at LIKE ?", [today + '%']);
    const [total_sale_paid_today] = await (await conn).query("SELECT sum(amount_paid) AS amount FROM tbl_sales WHERE paid_or_debt = 'PAID' AND created_at LIKE ?", [today + '%']);
    const [total_debt_today] = await (await conn).query("SELECT sum(debited_amount) AS amount FROM tbl_debts WHERE created_at LIKE ?", [today + '%']);

    let daily = {
        total_purchase_today: total_purchase_today[0].amount ? total_purchase_today[0].amount : 0,
        total_expenses_today: total_expenses_today[0].amount ? total_expenses_today[0].amount : 0,
        total_vehicle_today: total_vehicle_today[0].amount ? total_vehicle_today[0].amount : 0,
        total_sale_debt_today: total_sale_debt_today[0].amount ? total_sale_debt_today[0].amount : 0,
        total_sale_paid_today: total_sale_paid_today[0].amount ? total_sale_paid_today[0].amount : 0,
        total_debt_today: total_debt_today[0].amount ? total_debt_today[0].amount : 0
    }



    let monday = getMonday(new Date());
    let sunday = getSunday(new Date());



    const [total_purchase_week] = await (await conn).query("SELECT sum(total_price) AS amount FROM tbl_purchases WHERE created_at BETWEEN ? AND ?", [monday, sunday]);
    const [total_expenses_week] = await (await conn).query("SELECT sum(amount) AS amount FROM tbl_expenses WHERE created_at BETWEEN ? AND ?", [monday, sunday]);
    const [total_vehicle_week] = await (await conn).query("SELECT sum(expense_amount) AS amount FROM tbl_vehicles_report WHERE created_at BETWEEN ? AND ?", [monday, sunday]);
    const [total_sale_debt_week] = await (await conn).query("SELECT sum(amount_debited) AS amount FROM tbl_sales WHERE paid_or_debt = 'DEBT' AND created_at BETWEEN ? AND ?", [monday, sunday]);
    const [total_sale_paid_week] = await (await conn).query("SELECT sum(amount_paid) AS amount FROM tbl_sales WHERE paid_or_debt = 'PAID' AND created_at BETWEEN ? AND ?", [monday, sunday]);
    const [total_debt_week] = await (await conn).query("SELECT sum(debited_amount) AS amount FROM tbl_debts WHERE created_at BETWEEN ? AND ?", [monday, sunday]);

    let weekly = {
        total_purchase_week: total_purchase_week[0].amount ? total_purchase_week[0].amount : 0,
        total_expenses_week: total_expenses_week[0].amount ? total_expenses_week[0].amount : 0,
        total_vehicle_week: total_vehicle_week[0].amount ? total_vehicle_week[0].amount : 0,
        total_sale_debt_week: total_sale_debt_week[0].amount ? total_sale_debt_week[0].amount : 0,
        total_sale_paid_week: total_sale_paid_week[0].amount ? total_sale_paid_week[0].amount : 0,
        total_debt_week: total_debt_week[0].amount ? total_debt_week[0].amount : 0
    }


    let firstDateMonth = getFirstDayMonth();
    let lastDateMonth = getLastDayMonth();





    const [total_purchase_month] = await (await conn).query("SELECT sum(total_price) AS amount FROM tbl_purchases WHERE created_at BETWEEN ? AND ?", [firstDateMonth, lastDateMonth]);
    const [total_expenses_month] = await (await conn).query("SELECT sum(amount) AS amount FROM tbl_expenses WHERE created_at BETWEEN ? AND ?", [firstDateMonth, lastDateMonth]);
    const [total_vehicle_month] = await (await conn).query("SELECT sum(expense_amount) AS amount FROM tbl_vehicles_report WHERE created_at BETWEEN ? AND ?", [firstDateMonth, lastDateMonth]);
    const [total_sale_debt_month] = await (await conn).query("SELECT sum(amount_debited) AS amount FROM tbl_sales WHERE paid_or_debt = 'DEBT' AND created_at BETWEEN ? AND ?", [firstDateMonth, lastDateMonth]);
    const [total_sale_paid_month] = await (await conn).query("SELECT sum(amount_paid) AS amount FROM tbl_sales WHERE paid_or_debt = 'PAID' AND created_at BETWEEN ? AND ?", [firstDateMonth, lastDateMonth]);
    const [total_debt_month] = await (await conn).query("SELECT sum(debited_amount) AS amount FROM tbl_debts WHERE created_at BETWEEN ? AND ?", [firstDateMonth, lastDateMonth]);

    let monthly = {
        total_purchase_month: total_purchase_month[0].amount ? total_purchase_month[0].amount : 0,
        total_expenses_month: total_expenses_month[0].amount ? total_expenses_month[0].amount : 0,
        total_vehicle_month: total_vehicle_month[0].amount ? total_vehicle_month[0].amount : 0,
        total_sale_debt_month: total_sale_debt_month[0].amount ? total_sale_debt_month[0].amount : 0,
        total_sale_paid_month: total_sale_paid_month[0].amount ? total_sale_paid_month[0].amount : 0,
        total_debt_month: total_debt_month[0].amount ? total_debt_month[0].amount : 0
    }

    var custom = {
        total_purchase_custom: 0,
        total_expenses_custom: 0,
        total_vehicle_custom: 0,
        total_sale_debt_custom: 0,
        total_sale_paid_custom: 0,
        total_debt_custom: 0
    };

    if (req.query.custom) {
        let start = req.query.start;
        let end = req.query.end;

        const [total_purchase_custom] = await (await conn).query("SELECT sum(total_price) AS amount FROM tbl_purchases WHERE created_at BETWEEN ? AND ?", [start, end]);
        const [total_expenses_custom] = await (await conn).query("SELECT sum(amount) AS amount FROM tbl_expenses WHERE created_at BETWEEN ? AND ?", [start, end]);
        const [total_vehicle_custom] = await (await conn).query("SELECT sum(expense_amount) AS amount FROM tbl_vehicles_report WHERE created_at BETWEEN ? AND ?", [start, end]);
        const [total_sale_debt_custom] = await (await conn).query("SELECT sum(amount_debited) AS amount FROM tbl_sales WHERE paid_or_debt = 'DEBT' AND created_at BETWEEN ? AND ?", [start, end]);
        const [total_sale_paid_custom] = await (await conn).query("SELECT sum(amount_paid) AS amount FROM tbl_sales WHERE paid_or_debt = 'PAID' AND created_at BETWEEN ? AND ?", [start, end]);
        const [total_debt_custom] = await (await conn).query("SELECT sum(debited_amount) AS amount FROM tbl_debts WHERE created_at BETWEEN ? AND ?", [start, end]);

        custom.total_purchase_custom = total_purchase_custom[0].amount ? total_purchase_custom[0].amount : 0;
        custom.total_expenses_custom = total_expenses_custom[0].amount ? total_expenses_custom[0].amount : 0;
        custom.total_vehicle_custom = total_vehicle_custom[0].amount ? total_vehicle_custom[0].amount : 0;
        custom.total_sale_debt_custom = total_sale_debt_custom[0].amount ? total_sale_debt_custom[0].amount : 0;
        custom.total_sale_paid_custom = total_sale_paid_custom[0].amount ? total_sale_paid_custom[0].amount : 0;
        custom.total_debt_custom = total_debt_custom[0].amount ? total_debt_custom[0].amount : 0;

    }

    let page_data = {
        title: "Reports",
        currrentPath: "reports",
        daily: daily,
        weekly: weekly,
        monthly: monthly,
        cuctom: custom
    };

    res.render('dashboard/reports', page_data);
})






routerDashboard.get('/sales', salesController.salesHome);
routerDashboard.post('/sale/new', salesController.newSale);
routerDashboard.get('/sale/delete', salesController.saleDelete);
routerDashboard.post('/sale/edit', salesController.saleEdit);
routerDashboard.get('/sale/new-sale', salesController.newSaleForm);
routerDashboard.post('/sale/new-customer', salesController.newCustomer);
routerDashboard.get('/search-customer', salesController.searchCustomer);



routerDashboard.get('/profile', (req, res) => {
    let page_data = {
        title: "Profile",
        currrentPath: "profile",
        message: req.flash('error')
    };
    res.render('dashboard/profile', page_data);
});
routerDashboard.post('/post-change-password', async (req, res) => {

    let current_password = req.body.currentPassword;
    let new_password = req.body.newPassword;
    let confirm_new_password = req.body.confirmNewPassword;

    if (new_password != confirm_new_password) {
        req.flash('error', 'New Password must match!');
        res.redirect('/dashboard/profile');
    }

    const [user] = await (await conn).query("SELECT * FROM tbl_users WHERE email = ?", [req.session.loggedInUser.email]);

    if (user.length > 0) {

        let hash = user[0].password;

        bcrypt.compare(current_password, hash).then(async function (result) {
            if (result == true) {

                hashedPassword = await bcrypt.hash(new_password, 8);

                const [user] = await (await conn).query("UPDATE tbl_users SET password = ? WHERE email = ?", [hashedPassword, req.session.loggedInUser.email]);
                req.flash('success', 'Password updated!');
                res.redirect('/dashboard/profile');


            } else {
                req.flash('error', 'Incorrect password provided!');
                res.redirect('/dashboard/profile');
            }
        });


    } else {
        req.flash('error', 'Incorrect credentials provided!')
        res.redirect('dashboard/profile')
    }

});




//######################################
// #####################################
// #####################################
// ##### Vehicles #####################
// #####################################
routerDashboard.get('/vehicles', async (req, res) => {

    let payment_modes = [];
    const [users] = await (await conn).query("SELECT * FROM tbl_workforce WHERE type = 'PERMANENT'");
    const [result] = await (await conn).query("SELECT * FROM tbl_vehicles");
    const [reports] = await (await conn).query("SELECT * FROM tbl_vehicles_report ORDER BY created_at DESC");


    for (let index = 0; index < reports.length; index++) {
        let report = reports[index];
        let n = await getUserById(report.expense_receiver);
        let v = await getVehicleById(report.vehicle_id);
        report.expense_receiver_name = n;
        report.plate_number = v;
        reports[index] = report;
    }


    let page_data = {
        title: "Vehicles",
        currrentPath: "vehicles",
        vehicles: result,
        users: users,
        reports: reports
    };
    res.render('dashboard/vehicles', page_data);
});
routerDashboard.post('/post-new-vehicle', async (req, res) => {

    let plate_no = req.body.plate_no;
    let owner = req.body.owner;
    let type = req.body.type;
    let capacity = req.body.capacity;
    let phone = req.body.phone

    const [i] = await (await conn).query("INSERT INTO tbl_vehicles (plate_number, owner, phone, type, capacity) VALUES (?,?,?,?,?)", [plate_no, owner, phone, type, capacity]);
    req.flash('success', 'Vehicle successfully recorded!');
    res.redirect('/dashboard/vehicles?tab=vehicles');

});
routerDashboard.post('/post-edit-vehicle', async (req, res) => {

    let plate_no = req.body.plate_no;
    let owner = req.body.owner;
    let type = req.body.type;
    let capacity = req.body.capacity;
    let phone = req.body.phone
    let id = req.body.id;

    const [i] = await (await conn).query("UPDATE tbl_vehicles SET plate_number = ?, owner = ?, phone = ?, type = ?, capacity = ? WHERE id = ?", [plate_no, owner, phone, type, capacity, id]);

    req.flash('success', 'Car successfully updated!');
    res.redirect('/dashboard/vehicles?tab=vehicles');

});
routerDashboard.get('/delete-car', async (req, res) => {

    let id = req.query.id;
    const [d] = await (await conn).query("DELETE FROM tbl_vehicles WHERE id = ?", [id]);

    req.flash('success', 'Car successfully deleted!');
    res.redirect('/dashboard/vehicles?tab=vehicles');

});
routerDashboard.post('/post-new-vehicle-report', async (req, res) => {

    let date_time = req.body.date_time;
    let vehicle_id = req.body.vehicle_id;
    let status = req.body.status;
    let expense_amount = req.body.expense_amount;
    let expense_receiver = req.body.expense_receiver;
    let note = req.body.note;

    const [i] = await (await conn).query("INSERT INTO tbl_vehicles_report (date_time, vehicle_id, status, expense_amount, expense_receiver, note) VALUES (?,?,?,?,?,?)", [date_time, vehicle_id, status, expense_amount, expense_receiver, note]);
    req.flash('success', 'Report successfully recorded!');
    res.redirect('/dashboard/vehicles?tab=report');

});
routerDashboard.get('/delete-vehicle-report', async (req, res) => {

    let id = req.query.id;
    const [d] = await (await conn).query("DELETE FROM tbl_vehicles_report WHERE id = ?", [id]);

    req.flash('success', 'Report successfully deleted!');
    res.redirect('/dashboard/vehicles');

});
routerDashboard.post('/post-edit-vehicle-report', async (req, res) => {


    let date_time = req.body.date_time;
    let vehicle_id = req.body.vehicle_id;
    let status = req.body.status;
    let expense_amount = req.body.expense_amount;
    let expense_receiver = req.body.expense_receiver;
    let note = req.body.note;
    let id = req.body.id;

    const [i] = await (await conn).query("UPDATE tbl_vehicles_report SET date_time = ?, vehicle_id = ?, status = ?, expense_amount = ?, expense_receiver = ?, note = ? WHERE id = ?", [date_time, vehicle_id, status, expense_amount, expense_receiver, note, id]);

    req.flash('success', 'Report successfully updated!');
    res.redirect('/dashboard/vehicles');

});





//######################################
// #####################################
// #####################################
// ##### Permissions #####################
// #####################################
routerDashboard.post('/new-user', async (req, res) => {

    let workforce_id = req.body.workforce_id;
    let role = req.body.role;
    let email = req.body.email;

    const [user] = await (await conn).query("SELECT * FROM tbl_workforce WHERE id = ?", [workforce_id]);

    if (user.length <= 0) {
        return res.redirect('/dashboard/users');
    }

    const [check_email] = await (await conn).query("SELECT * FROM tbl_users WHERE email = ?", [email]);
    if (check_email[0]) {
        req.flash('error', 'User with same email exist!');
        return res.redirect('/dashboard/users');
    }


    const [username_email] = await (await conn).query("SELECT * FROM tbl_users WHERE username = ?", [user[0].username]);
    if (username_email[0]) {
        req.flash('error', 'User with same username exist!');
        return res.redirect('/dashboard/users');
    }

    // let password = await bcrypt.hash(user[0].password, 8);    
    let password = user[0].password;


    const [i] = await (await conn).query("INSERT INTO tbl_users (first_name, last_name, username, email, password, role, workforce_id) VALUES (?,?,?,?,?,?,?)", [user[0].first_name, user[0].last_name, user[0].username, email, password, role, user[0].id]);

    req.flash('success', 'Login successfully added!');
    res.redirect('/dashboard/users');

});


routerDashboard.get('/delete-user', usersController.deleteUser);





//######################################
// #####################################
// #####################################
// ##### workforce #####################
// #####################################
routerDashboard.get('/workforce', workforceController.workforceHome);
const dailyWorkforceUpload = upload.fields([{ name: "contract" }, { name: "picture", maxCount: 1 }]);
routerDashboard.post('/workforce/new-daily-workforce', dailyWorkforceUpload, workforceController.postDailyWorkforce);
const permanentWorkforceUpload = upload.fields([{ name: "contract" }, { name: "picture", maxCount: 1 }]);
routerDashboard.post('/workforce/new-permanent-workforce', dailyWorkforceUpload, workforceController.postPermanentWorkforce);
routerDashboard.post('/new-department', workforceController.postNewDepartment);
routerDashboard.get('/delete-department', workforceController.deleteDepartment);
routerDashboard.post('/edit-department', workforceController.editDepartment);
routerDashboard.get('/delete-workforce', workforceController.deleteWorkforce);
const dailyWorkforceUpload1 = upload.fields([{ name: "contract" }, { name: "picture", maxCount: 1 }]);
routerDashboard.post('/workforce/edit-permanent-workforce', dailyWorkforceUpload1, workforceController.editPermanentWorkforce);
const permanentWorkforceUpload1 = upload.fields([{ name: "contract" }, { name: "picture", maxCount: 1 }]);
routerDashboard.post('/workforce/edit-daily-workforce', permanentWorkforceUpload1, workforceController.editDailyWorkforce);





//######################################
// #####################################
// #####################################
// ##### purchaces #####################
// #####################################
routerDashboard.get('/purchase', purchasesController.purchasesHome);
routerDashboard.post('/purchase/new', purchasesController.newPurchase);
routerDashboard.get('/delete-purchase', purchasesController.deletePurchase);
routerDashboard.post('/purchase/edit', purchasesController.editPurchase);
routerDashboard.get('/form-new-purchase', purchasesController.formNewPurchase);
routerDashboard.post('/purchase/new-type', purchasesController.newType);
routerDashboard.post('/purchase/new-seller', purchasesController.newSeller);


routerDashboard.get('/milling', millingController.millingHome);
routerDashboard.post('/milling/new', millingController.postNewMilling);
routerDashboard.get('/delete-milling', millingController.deleteMilling);
routerDashboard.post('/milling/edit', millingController.editMilling);

routerDashboard.get('/inventory', inventoryController.inventoryHome);
routerDashboard.post('/inventory/new', inventoryController.postNewInventory);
routerDashboard.get('/delete-inventory', inventoryController.deleteInventory);
routerDashboard.post('/inventory/edit', inventoryController.editInventory);

routerDashboard.get('/debts', debtsController.debtsHome);
routerDashboard.post('/debt-paid', debtsController.paidDebt);
routerDashboard.post('/debt-unpaid', debtsController.markAsUnPaidDebt);

routerDashboard.get('/expenses', expensesController.expensesHome);
routerDashboard.post('/expense/new', expensesController.expensesNew);
routerDashboard.get('/expenses/delete', expensesController.expensesDelete);
routerDashboard.post('/expense/edit', expensesController.expensesEdit);


routerDashboard.get('/customers', customersController.customersHome);
routerDashboard.post('/customer/new', customersController.postNewCutomer);
routerDashboard.post('/customer/edit', customersController.postEditCutomer);
routerDashboard.get('/customer/delete', customersController.deleteCutomer);




routerDashboard.get('/sellers', sellersController.sellersHome);
routerDashboard.post('/seller/new', sellersController.postNewSeller);
routerDashboard.post('/seller/edit', sellersController.postEditSeller);
routerDashboard.get('/seller/delete', sellersController.deleteSeller);


routerDashboard.get('/users', usersController.usersHome);
routerDashboard.get('/desactivate-admin', usersController.desactivateUser);
routerDashboard.get('/activate-admin', usersController.activateUser);
routerDashboard.post('/new-admin', usersController.newAdmin);

routerDashboard.get('/configs', configsController.configsHome);
routerDashboard.post('/configs/post-allow-before-hours', configsController.postAllowEditBeforeHours);
routerDashboard.post('/configs/post-system-name', configsController.postSystemName);
routerDashboard.post('/configs/post-copyright-text', configsController.postcopyrighttext);


const logoUpload = upload.fields([{ name: "file", maxCount: 1 }]);
routerDashboard.post('/configs/post-new-logo', logoUpload, configsController.postNewLogo);
const faviconUpload = upload.fields([{ name: "file", maxCount: 1 }]);
routerDashboard.post('/configs/post-new-favicon', faviconUpload, configsController.postNewFavicon);


routerDashboard.get('/stock', stockController.stockHome);
routerDashboard.post('/stock/new', stockController.addToStock);
routerDashboard.post('/remove-stock', stockController.removeToStock);
routerDashboard.get('/stock/new-stock', stockController.newStock);



routerDashboard.get('/payments', paymentController.paymentHome);
routerDashboard.get('/update-payment-mode', paymentController.updatePaymentMode);
routerDashboard.get('/delete-payment-mode', paymentController.deletePaymentMode);
routerDashboard.post('/post-new-payment-mode', paymentController.postNewPaymentMode);
routerDashboard.post('/post-edit-payment-mode', paymentController.postEditPaymentMode);




module.exports = routerDashboard

