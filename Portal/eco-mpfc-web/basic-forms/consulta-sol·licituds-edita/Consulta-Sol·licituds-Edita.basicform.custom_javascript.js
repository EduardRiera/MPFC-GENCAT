$(document).ready(function() {

    document.getElementById('pfc_document').style.display = 'none';
    document.getElementById('pfc_document_delete_button').style.display = 'none';
    document.getElementById('pfc_seconddocument').style.display = 'none';
    document.getElementById('pfc_seconddocument_delete_button').style.display = 'none';

    var a = document.getElementById('pfc_thirddocument_input_file').getAttribute('onchange').replace('s\'ha', 'ha');
    document.getElementById('pfc_thirddocument_input_file').setAttribute('onchange',a);

    var b = document.getElementById('pfc_fourthdocument_input_file').getAttribute('onchange').replace('s\'ha', 'ha');
    document.getElementById('pfc_fourthdocument_input_file').setAttribute('onchange',b);

});


