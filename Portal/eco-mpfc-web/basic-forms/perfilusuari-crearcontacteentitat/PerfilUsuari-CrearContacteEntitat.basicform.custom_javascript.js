{% fetchxml accountFetchXML %}
	<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" no-lock="true">
		<entity name="account">
			<attribute name="name" />
			<attribute name="accountid" />
			<attribute name="pfc_entitytype" />
	  </entity>
	</fetch>
{% endfetchxml %}

{% fetchxml companyLevelFetchXML %}
	<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" no-lock="true">
		<entity name="pfc_companylevel">
			<attribute name="pfc_name" />
			<attribute name="pfc_entitytype" />
			<attribute name="pfc_companylevelid" />
		</entity>
	</fetch>
{% endfetchxml %}

$(document).ready(function(){
  let accountid;
  DisableElements(true);
  $("#pfc_accountid").change(ChangeAccountId);
});

function ChangeAccountId(){
  if ($("#pfc_accountid_name").val()){
        DisableElements(false);
        DeleteDropDownElementsByEntityType();
      }
      else{
        DisableElements(true);
      }
}

function DisableElements(value){
	$("#pfc_entityposition").attr("readonly",value);
  $("#pfc_entityposition").attr("disabled",value);
  $("#pfc_entityposition").val("");
	$("#pfc_companylevelid").attr("readonly",value);
	$("#pfc_companylevelid").attr("disabled",value);
	$("#pfc_companylevelid").val("");
	$(".text-muted").remove();
}

function DeleteDropDownElementsByEntityType(){
  $("#pfc_companylevelid option").show();
	{% for result1 in accountFetchXML.results.entities %}
		{%- assign accountid = result1.accountid %}
		if ('{{accountid}}' == $("#pfc_accountid").val()){
			{%- assign pfc_entitytype1 = result1.pfc_entitytype.value %}
			{% for result2 in companyLevelFetchXML.results.entities %}
				{%- assign pfc_entitytype2 = result2.pfc_entitytype.value %}
				{%- assign pfc_entitytype2Name = result2.pfc_name %}
				if ('{{pfc_entitytype1}}' != '{{pfc_entitytype2}}'){
					{%- assign pfc_companylevelid = result2.pfc_companylevelid %}
					$("#pfc_companylevelid option").each(function() {
						if (this.value == '{{pfc_companylevelid}}'){
							$("#pfc_companylevelid option[value=" + '{{pfc_companylevelid}}' + "]").hide();
						}
					});	
				}
			{% endfor %}
		}
	{% endfor %}
}