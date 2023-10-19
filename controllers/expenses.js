
const conn = require('../database');



const expensesHome = async (req, res) => {

    const [users] = await (await conn).query("SELECT * FROM tbl_workforce");
    const [expenses] = await (await conn).query("SELECT * FROM tbl_expenses ORDER BY id DESC");

    for(i in expenses){
        const [user] = await (await conn).query("SELECT * FROM tbl_workforce WHERE id = ?", [expenses[i].sender]);
        expenses[i].sender_names = user.length ? user[0].first_name + ' ' + user[0].last_name : '';
    }

    let page_data = {
        title: "Expenses",
        currrentPath: "expenses",
        users: users,
        expenses: expenses
    };

    res.render('dashboard/expenses', page_data);
};


const expensesNew = async (req, res) => {

    let description = req.body.description;
    let amount = req.body.amount;
    let sender = req.body.sender;
    let note = req.body.note;

    const [i] = await (await conn).query("INSERT INTO tbl_expenses (description, amount, sender, note) VALUES (?,?,?,?)", [description, amount, sender, note]);

    req.flash('success', 'New expense successfully recorded!');
    res.redirect('/dashboard/expenses');


};

const expensesDelete = async (req, res) => {

    let id = req.query.id;
    const [d] = await (await conn).query("  DELETE FROM tbl_expenses WHERE id = ?", [id]);

    req.flash('success', 'Expense successfully deleted!');
    res.redirect('/dashboard/expenses');


};

const expensesEdit = async (req, res) => {


    let description = req.body.description;
    let amount = req.body.amount;
    let sender = req.body.sender;
    let note = req.body.note;

    let id = req.body.expense_id

    const [i] = await (await conn).query("UPDATE tbl_expenses SET description = ?, amount = ?, sender = ?, note = ? WHERE  id = ?", [description, amount, sender, note, id]);

    req.flash('success', 'Expense successfully updated!');
    res.redirect('/dashboard/expenses');


};

module.exports = { expensesHome, expensesNew, expensesDelete, expensesEdit };