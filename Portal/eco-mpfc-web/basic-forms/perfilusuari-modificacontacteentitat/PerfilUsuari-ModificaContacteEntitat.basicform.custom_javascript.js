{% fetchxml accountFetchXML %}
    <fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" no-lock="true">
        <entity name="account">
            <attribute name="name"></attribute>
            <attribute name="accountid"></attribute>
            <attribute name="pfc_entitytype"></attribute>
            <link-entity name="pfc_contact_account" from="pfc_accountid" to="accountid">
                <link-entity name="contact" from="pfc_contactaccount" to="pfc_contact_accountid">
                    <filter>
                        <condition attribute="contactid" operator="eq" value="{{user.id}}"/>
                    </filter>
                </link-entity>
            </link-entity>
        </entity>
    </fetch>
{% endfetchxml %}

$(document).ready(function(){
    {% for result1 in accountFetchXML.results.entities %}
        {% assign entitytype = result1.pfc_entitytype.value %}

        {% fetchxml companyLevelFetchXML %}
            <fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' no-lock='true'>
                <entity name='pfc_companylevel'>
                    <attribute name='pfc_name'></attribute>
                    <attribute name='pfc_entitytype'></attribute>
                    <attribute name='pfc_companylevelid'></attribute>
                    <filter>
                        <condition attribute='pfc_entitytype' operator='ne' value='{{entitytype}}'></condition>
                    </filter>
                </entity>
            </fetch>
        {% endfetchxml %}

        {% for result2 in companyLevelFetchXML.results.entities %}
            {% assign companylevelid = result2.pfc_companylevelid %}
            $("#pfc_companylevelid option").each(function() {
                if (this.value == '{{pfc_companylevelid}}'){
                    $("#pfc_companylevelid option[value=" + '{{companylevelid}}' + "]").hide();
                }
            });	    
        {% endfor %}
    {% endfor %}

});



