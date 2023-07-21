$(document).ready(function() {
var a = document.getElementById('pfc_document_input_file').getAttribute('onchange').replace('s\'ha', 'ha');
document.getElementById('pfc_document_input_file').setAttribute('onchange',a);
});