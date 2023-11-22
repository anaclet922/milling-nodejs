$(function () {
    "use strict";


    $(document).ready(function () {

        var departments = $('#departments').DataTable();
        var dailyWorkforces = $('#dailyWorkforces').DataTable();
        var permanetWorkforces = $('#permanetWorkforces').DataTable();
        var systemUsers = $('#systemUsers').DataTable();
        var purchases = $('#purchases').DataTable();
        var sales = $('#sales').DataTable();
        var salesFlour = $('#sales-flour').DataTable();
        var salesBranda = $('#sales-branda').DataTable();


        
        var dailyReport = $('#daily-report').DataTable({
            footerCallback: function (row, data, start, end, display) {
                let api = this.api();
         
                // Remove the formatting to get integer data for summation
                let intVal = function (i) {
                    return typeof i === 'string'
                        ? i.replace(/[\$,]/g, '') * 1
                        : typeof i === 'number'
                        ? i
                        : 0;
                };
         
                // Total over all pages
                total = api
                    .column(2)
                    .data()
                    .reduce((a, b) => intVal(a) + intVal(b), 0);
         
                // Total over this page
                pageTotal = api
                    .column(2, { page: 'current' })
                    .data()
                    .reduce((a, b) => intVal(a) + intVal(b), 0);
         
                // Update footer
                api.column(2).footer().innerHTML =
                    '$' + pageTotal + ' ( $' + total + ' total)';
            }
            
        });
      

        var monthlyReport = $('#monthly-report').DataTable();
        var weeklyReport = $('#weekly-report').DataTable();
        var customReport = $('#custom-report').DataTable();
        
    });


});