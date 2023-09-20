$(function() {
	"use strict";

  
      $(document).ready(function() {
        var table = $('#departments').DataTable( {
            lengthChange: false,
            searching: false,
            buttons: [ 'copy', 'excel', 'pdf']
        } );
     
        table.buttons().container()
            .appendTo( '#departments_wrapper .col-md-6:eq(0)' );
    } );


});