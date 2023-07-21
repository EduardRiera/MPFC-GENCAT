$(document).ready(function() {
    debugger;
    $( "#pfc_doubts" ).parent().parent().hide();
    document.getElementById('pfc_document').style.display = 'none';
    document.getElementById('pfc_document_delete_button').style.display = 'none';
    $('input[type=button]').prop('disabled', true);
    $('input[type=radio]').change(function(){
        var value = $( 'input[type=radio]:checked' ).val();
        $('input[type=button]').prop('disabled', false);
        if (value == 1)
        {
            $( "#pfc_doubts" ).parent().parent().hide();
        }
        else if(value == 0)
        {
            $( "#pfc_doubts" ).parent().parent().show();
        }
        });
});