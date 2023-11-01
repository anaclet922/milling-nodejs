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
const usersController = require('../controllers/users');
const configsController = require('../controllers/configs');
const activitiesController = require('../controllers/activities');
const salesController = require('../controllers/sales');
const stockController = require('../controllers/stock');
const paymentController = require('../controllers/payments');


const { getFormatedDate } = require('../helpers');


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
  
    let page_data = {
        title: "Home",
        currrentPath: "/",
        maize_stock: ((maize_stock_object.length > 0) ? maize_stock_object[0].quantity : 0),
        branda_stock: ((branda_stock_object.length > 0) ? branda_stock_object[0].quantity : 0),
        flour_stock: ((flour_stock_object.length > 0) ? flour_stock_object[0].quantity : 0),
        workforces: workforces_object[0].quantity
    };
     
    res.render('dashboard/home', page_data);
})

routerDashboard.get('/activities', activitiesController.activitiesHome);
routerDashboard.post('/activities/new', activitiesController.postNewReminder);
routerDashboard.get('/delete-activity', activitiesController.deleteActivity);
routerDashboard.post('/activities/edit', activitiesController.editActivity);


routerDashboard.get('/reports', (req, res) => {
    let page_data = {
        title: "Reports",
        currrentPath: "reports"
    };
    res.render('dashboard/reports', page_data);
})






routerDashboard.get('/sales', salesController.salesHome);
routerDashboard.post('/sale/new', salesController.newSale);
routerDashboard.get('/sale/delete', salesController.saleDelete);
routerDashboard.post('/sale/edit', salesController.saleEdit);




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





routerDashboard.get('/vehicles', async (req, res) => {

    let payment_modes = [];

    const [result] = await (await conn).query("SELECT * FROM tbl_vehicles");

    let page_data = {
        title: "Vehicles",
        currrentPath: "vehicles",
        vehicles: result
    };
    res.render('dashboard/vehicles', page_data);
});
routerDashboard.post('/post-new-vehicle', async (req, res) => {

    let plate_no = req.body.plate_no;
    let owner = req.body.owner;
    let type = req.body.type;
    let capacity = req.body.capacity;

    const [i] = await (await conn).query("INSERT INTO tbl_vehicles (plate_number, owner, type, capacity) VALUES (?,?,?,?)", [plate_no, owner, type, capacity]);
    req.flash('success', 'Vehicle successfully recorded!');
    res.redirect('/dashboard/vehicles');

});
routerDashboard.post('/post-edit-vehicle', async (req, res) => {

    let plate_no = req.body.plate_no;
    let owner = req.body.owner;
    let type = req.body.type;
    let capacity = req.body.capacity;
    let id = req.body.id;

    const [i] = await (await conn).query("UPDATE tbl_vehicles SET plate_number = ?, owner = ?, type = ?, capacity = ? WHERE id = ?", [plate_no, owner, type, capacity, id]);

    req.flash('success', 'Car successfully updated!');
    res.redirect('/dashboard/vehicles');

});
routerDashboard.get('/delete-car', async (req, res) => {

    let id = req.query.id;
    const [d] = await (await conn).query("DELETE FROM tbl_vehicles WHERE id = ?", [id]);

    req.flash('success', 'Car successfully deleted!');
    res.redirect('/dashboard/vehicles');

});








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

routerDashboard.get('/expenses', expensesController.expensesHome);
routerDashboard.post('/expense/new', expensesController.expensesNew);
routerDashboard.get('/expenses/delete', expensesController.expensesDelete);
routerDashboard.post('/expense/edit', expensesController.expensesEdit);


routerDashboard.get('/customers', customersController.customersHome);
routerDashboard.post('/customer/new', customersController.postNewCutomer);
routerDashboard.post('/customer/edit', customersController.postEditCutomer);
routerDashboard.get('/customer/delete', customersController.deleteCutomer);


routerDashboard.get('/users', usersController.usersHome);
routerDashboard.get('/desactivate-admin', usersController.desactivateUser);
routerDashboard.get('/activate-admin', usersController.activateUser);
routerDashboard.post('/new-admin', usersController.newAdmin);

routerDashboard.get('/configs', configsController.configsHome);
routerDashboard.post('/configs/post-system-name', configsController.postSystemName);
routerDashboard.post('/configs/post-copyright-text', configsController.postcopyrighttext);


const logoUpload = upload.fields([{ name: "file", maxCount: 1 }]);
routerDashboard.post('/configs/post-new-logo', logoUpload,configsController.postNewLogo);
const faviconUpload = upload.fields([{ name: "file", maxCount: 1 }]);
routerDashboard.post('/configs/post-new-favicon', faviconUpload, configsController.postNewFavicon);

routerDashboard.get('/stock', stockController.stockHome);



routerDashboard.get('/payments', paymentController.paymentHome);
routerDashboard.get('/update-payment-mode', paymentController.updatePaymentMode);
routerDashboard.get('/delete-payment-mode', paymentController.deletePaymentMode);
routerDashboard.post('/post-new-payment-mode', paymentController.postNewPaymentMode);
routerDashboard.post('/post-edit-payment-mode', paymentController.postEditPaymentMode);


module.exports = routerDashboard

