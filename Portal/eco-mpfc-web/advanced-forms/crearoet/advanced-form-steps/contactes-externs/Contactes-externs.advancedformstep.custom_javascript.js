$(document).ready(function(){
    $("#pfc_interestedpeople").change(function() {
        if($("#pfc_interestedpeople").val()!= ""){
            if (/^([a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?;)*([a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/.test($("#pfc_interestedpeople").val()) == false){
                $("#NextButton").prop("disabled", true);
                alert("El format de correu electrònic és incorrecte.Només estan permesos correus electrònics vàlids separats per ';'");
            }else{
                $("#NextButton").prop("disabled", false);
            }
        }else{
            $("#NextButton").prop("disabled", false);
        }
    });
    
    $("#pfc_interestedpeople").bind('input propertychange', function() {
        if($("#pfc_interestedpeople").val()== ""){
            $("#NextButton").prop("disabled", false);
        }
    });
});
