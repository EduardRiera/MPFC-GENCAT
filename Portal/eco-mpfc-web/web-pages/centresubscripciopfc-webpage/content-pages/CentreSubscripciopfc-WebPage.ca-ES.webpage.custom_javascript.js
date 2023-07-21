{% assign returnUrl = request.params['returnUrl'] | default:"/" %}
{% assign skipSub = request.params['skipSub'] | default:0 %}
{% assign gotoUrl = "/goto/" | add_query:'returnUrl',returnUrl | add_query:'limpiar',1 | add_query:'skipSub',skipSub %}
MsCrmMkt.MsCrmFormLoader.on('afterFormSubmit', function (event) {
		window.location.replace("{{gotoUrl}}"); 
});