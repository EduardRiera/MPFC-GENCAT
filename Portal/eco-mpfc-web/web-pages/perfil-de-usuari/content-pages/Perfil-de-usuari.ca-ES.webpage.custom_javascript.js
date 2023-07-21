
{% fetchxml contactFetchXML %}
  <fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" no-lock="true">
    <entity name="contact">
      <attribute name="fullname" />
      <attribute name="contactid" />
    </entity>
  </fetch>
{% endfetchxml %}

{% fetchxml accountFetchXML %}
<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" no-lock="true">
  <entity name="account">
    <attribute name="name" />
    <attribute name="accountid" />
    <link-entity name="pfc_contact_account" from="pfc_accountid" to="accountid">
      <link-entity name="contact" from="contactid" to="pfc_contactid">
        <filter>
          <condition attribute="contactid" operator="eq" value="{{user.id}}"></condition>
        </filter>
      </link-entity>
    </link-entity>
  </entity>
</fetch>
{% endfetchxml %}

$(document).ready(function(){
  let accountid;
  if ($("#parentcustomerid option:selected") && $("#parentcustomerid option:selected").val().length > 0) {
    $("#parentcustomerid > option").each(function() {
        let _delete = true;
          {% for result2 in accountFetchXML.results.entities %}
            {%- assign accountid = result2.accountid %}
            accountid ='{{accountid}}';
            if (accountid === this.value || this.value == ''){
              _delete = false;
            }
          {% endfor %}
          if(_delete){
            $('#parentcustomerid option[value="'+this.value+'"]').remove();
          }
    });
  }

  {% for result in contactFetchXML.results.entities %}
      {% assign fullName = result.fullname %}
      {% assign contactid = result.contactid %}
      $("#parentcustomerid option:contains('{{fullName}}')").remove();
  {% endfor %}
});