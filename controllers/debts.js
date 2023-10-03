
const conn = require('../database');
var mv = require('mv');
const upload = require('../upload');



const debtsHome = async (req, res) => {

    const [debts] = await (await conn).query("SELECT * FROM tbl_debts ORDER BY id DESC");

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
        debts: all_debts
    };

    res.render('dashboard/debts', page_data);
};

module.exports = { debtsHome };