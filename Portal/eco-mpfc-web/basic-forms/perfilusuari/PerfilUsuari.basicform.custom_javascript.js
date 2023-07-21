$(document).ready(function () {
    AddRefreshOnModalClose();
    disableAndEnableUpdateButton();
    $('#Entitats_vinculades')[0].addEventListener("click", hideDeleteActionCurrentEntity , true);
    $("#pfc_conditionaccceptance").click(disableAndEnableUpdateButton);
    {% assign conditionaccceptance = user.pfc_conditionaccceptance %}
    if ({{conditionaccceptance}}){
        $('#pfc_conditionaccceptance').parent().parent().parent().parent().parent().parent().hide(); 
    }else{
        $('#Entitats_vinculades').parent().parent().parent().parent().hide(); 
        $('#pfc_contactaccount').parent().parent().parent().parent().hide(); 
    }
});

var AddRefreshOnModalClose = function () {
    $('#Entitats_vinculades').find('.modal-form, .modal-delete').on("hidden.bs.modal", function () {
        window.location.reload(true);
    });
};

var hideDeleteActionCurrentEntity = function(){
        $('#Entitats_vinculades tr td[data-value*="{{user.parentcustomerid.id}}"]').parent().find('.delete-link').hide();
};

var disableAndEnableUpdateButton = function(){
    if ($( "#pfc_conditionaccceptance_1" ).is(":checked" )){
            $('.btn-envia').prop('disabled', false);
        }else{
            $('.btn-envia').prop('disabled', true);
        }
};