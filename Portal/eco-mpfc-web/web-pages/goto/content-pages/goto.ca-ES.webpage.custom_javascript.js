{% assign returnUrl = request.params['returnUrl'] | default:"/" %}
{% assign skipSub = request.params['skipSub'] | default:0 %}
{% if skipSub == 0 %}
    {% assign urltogo = "/centresubscripciopfc" | add_query:'returnUrl',returnUrl | add_query:'skipSub',1 %}
{% else %}
    {% assign urltogo = returnUrl %}
{% endif %}

{% if request.params.limpiar == '1' %}
(function() {
    fetch('/_services/about')
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const form = doc.querySelector('form');
        const token = form.querySelector('input[name="AboutProductHandlerXSRFToken"]').value;
        const clearCache = form.querySelector('input[name="clearCache"]').value;
        const data = {
        AboutProductHandlerXSRFToken: token,
        clearCache
        };

        fetch('/_services/about', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
        if (response.ok) {
            console.log('Post request successful!');
             window.location.replace('{{urltogo}}');
        } else {
            console.error('Post request failed!');
        }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
})();
{% else %}
   window.location.replace('{{urltogo}}');
{% endif %}



