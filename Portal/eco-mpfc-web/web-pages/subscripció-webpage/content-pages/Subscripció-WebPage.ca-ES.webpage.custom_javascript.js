{% fetchxml mySubscriptionList %}
<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" no-lock="true">
  <entity name="list">
    <attribute name="listname" />
    <attribute name="listid" />
    <filter>
      <condition attribute="msdyncrm_issubscription" operator="eq" value="1" />
    </filter>
    <filter>
      <condition attribute="statecode" operator="eq" value="0" />
    </filter>
    <link-entity name="listmember" from="listid" to="listid" link-type="outer" alias="member">
      <attribute name="entitytype" />
      <attribute name="entityid" />
      <filter>
        <condition attribute="entityid" operator="eq" value="{{user.id}}" />
      </filter>
    </link-entity>
  </entity>
</fetch>
{% endfetchxml %}

{% fetchxml myForm %}
<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" no-lock="true">
  <entity name="msdyncrm_marketingform">
    <attribute name="msdyncrm_name" />
    <attribute name="msdyncrm_marketingformid" />
    <filter>
      <condition attribute="msdyncrm_name" operator="eq" value="CentreSubscripcio" />
    </filter>
    <link-entity name="msdyncrm_marketingform_marketingformfield" from="msdyncrm_marketingformid" to="msdyncrm_marketingformid" link-type="outer" alias="camp" intersect="true">
      <attribute name="msdyncrm_marketingformfieldid" />
      <link-entity name="msdyncrm_marketingformfield" from="msdyncrm_marketingformfieldid" to="msdyncrm_marketingformfieldid" link-type="inner" alias="valor" intersect="true">
        <attribute name="msdyncrm_contactmapping" />
      </link-entity>
    </link-entity>
  </entity>
</fetch>
{% endfetchxml %}


$( document ).ready(function() {
    
    MsCrmMkt.MsCrmFormLoader.on('afterFormLoad', function () {
      {% for formEntry in myForm.results.entities %} 
        {% assign fieldName = formEntry['valor.msdyncrm_contactmapping'] %}
        {% assign myLiquidToEval = '{{user.' | append: fieldName | append: '}}' %}

        {% if (fieldName == 'pfc_conditionaccceptance') or (fieldName == 'msdyncrm_rememberme')) %}
            document.getElementById('{{formEntry['camp.msdyncrm_marketingformfieldid']}}').checked = {{ myLiquidToEval | liquid | boolean | default: false }};
        {% else %}
            document.getElementById('{{formEntry['camp.msdyncrm_marketingformfieldid']}}').value = '{{ myLiquidToEval | liquid | string }}';
        {% endif %}            
        
        {% if ((fieldName == 'adx_identity_username') or (fieldName == 'emailaddress1') or (fieldName == 'lastname') or (fieldName == 'firstname')) %}
            document.getElementById('{{formEntry['camp.msdyncrm_marketingformfieldid']}}').disabled  = true;
        {% endif %}            

        {% if (fieldName == 'pfc_conditionaccceptance') %}
            var checkBox = document.getElementById('{{formEntry['camp.msdyncrm_marketingformfieldid']}}');
            checkBox.disabled = checkBox.checked;

            var disableAndEnableUpdateButton = function() {
                if (checkBox.checked) {
                    $("button:submit").prop('disabled', false);
                } else {
                    $("button:submit").prop('disabled', true);
                }
            };                
            checkBox.onclick = disableAndEnableUpdateButton;
            disableAndEnableUpdateButton();

        {% endif %}            

      {% endfor %} 
      
      
      {% for listEntry in mySubscriptionList.results.entities %} 
        if (document.getElementById('{{listEntry.listid}}')) {
          {% if (listEntry['member.entityid'].id) %}
          document.getElementById('{{listEntry.listid}}').checked = true;
          {% else %}
          document.getElementById('{{listEntry.listid}}').checked = false;
          {% endif %}            
        }            
      {% endfor %} 

    });

    MsCrmMkt.MsCrmFormLoader.on('afterFormSubmit', function () {
        $("body").css("cursor", "default");
      {% if user.pfc_contactaccount.id == null %}
        window.location.href="{{'/Canvi-dentitat' | add_query: 'returnUrl', request.params.returnUrl | escape }}";
      {% else%}
        window.location.href="{{request.params.returnUrl | escape }}";
      {% endif %}
    });

    MsCrmMkt.MsCrmFormLoader.on('formSubmit', function () {
        $("body").css("cursor", "progress");
    });


});

