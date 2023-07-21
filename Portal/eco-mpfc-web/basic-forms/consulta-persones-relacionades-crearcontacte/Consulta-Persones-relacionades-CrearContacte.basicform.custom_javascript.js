/*
{% fetchxml accountByContactIdFetchXML %}
<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" no-lock="true">
  <entity name="account">
    <attribute name="name" />
    <attribute name="pfc_descriptivename" />
    <attribute name="accountid" />
    <link-entity name="contact" from="parentcustomerid" to="accountid">
      <filter>
        <condition attribute="contactid" operator="eq" value="{{user.id}}" />
      </filter>
    </link-entity>
  </entity>
</fetch>
{% endfetchxml %}

{% for result in accountByContactIdFetchXML.results.entities %}
        {% assign accoutName = result.name %}
        {% assign accountDescriptiveName = result.pfc_descriptivename %}
        {% assign accountId = result.accountid %}
{% endfor %}

$(document).ready(function(){
    if (document.getElementById('parentcustomerid')){
        $('#parentcustomerid').val('{{accountId}}');
        $('#parentcustomerid_entityname').val('account');
        $('#parentcustomerid_name').val('{{accoutName}}');
        if ('{{accountId}}'){
            $('#parentcustomerid_name').attr("readonly", true);
            $('#parentcustomerid_name').attr("disabled", true);
            $('#parentcustomerid_name').siblings('div.input-group-btn').find('button').prop('disabled', true);
            $('#parentcustomerid_name').siblings('div.input-group-btn').hide();
        }
    }
});
*/