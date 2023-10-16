
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const debtsHome = async (req, res) => {

    const [debts] = await (await conn).query("SELECT * FROM tbl_debts ORDER BY id DESC");
    const [modes] = await (await conn).query("SELECT * FROM tbl_payments_methods WHERE status = 'ACTIVE' ORDER BY id DESC");

    let all_debts = [];
 
    for (i in debts){
        if(debts[i].purchase_id != null){
            const [p] = await (await conn).query("SELECT * FROM tbl_purchases WHERE id = ?", [debts[i].purchase_id]);
            debts[i].purchase = p[0];
        }else{
            const [s] = await (await conn).query("SELECT * FROM tbl_sales WHERE id = ?", [debts[i].sale_id]);
            debts[i].sale = s[0];
        }
        all_debts.push(debts[i]);
    }

    let page_data = {
        title: "Debts",
        currrentPath: "debts",
        debts: all_debts,
        modes: modes
    };

    res.render('dashboard/debts', page_data);
};

const paidDebt = async (req, res) => {

    let debt_id = req.body.debt_id;
    let payment_mode = req.body.payment_method_id;

    const [debt] = await (await conn).query("SELECT * FROM tbl_debts WHERE id = ?", [debt_id]);


    if(debt.length){

        const [debtUpdate] = await (await conn).query("UPDATE tbl_debts SET paid = 'YES' WHERE id = ?", [debt_id]);
        
        if(debt[0].sale_id != null){
            const [sale] = await (await conn).query("SELECT * FROM tbl_sales WHERE id = ?", [debt[0].sale_id]);
            const [payment] = await (await conn).query("INSERT INTO tbl_payments (customer_id, sale_id, amount_paid, method_of_payment, user_id, note) VALUES (?,?,?,?,?,?)", [sale[0].customer_id, sale[0].id, debt[0].debited_amount, payment_mode, sale[0].seller_id, debt[0].note]);
        }
            
            req.flash('success', 'Debt paid!');
            return res.redirect('/dashboard/debts');
       
    }else{
        req.flash('error', 'Debt not found!');
        return res.redirect('/dashboard/debts');
    }
}


module.exports = { debtsHome, paidDebt };