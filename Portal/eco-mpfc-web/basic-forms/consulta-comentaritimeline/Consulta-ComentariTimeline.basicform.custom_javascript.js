{% assign queryId = request.params.id %}
{% fetchxml queryFetch %}
<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" no-lock="true">
  <entity name="pfc_query">
    <attribute name="pfc_webstatus" />
    <attribute name="statecode" />
    <attribute name="pfc_querystatus" />
    <attribute name="statuscode" />
    <attribute name="pfc_queryid" />
    <filter>
      <condition attribute="pfc_queryid" operator="eq" value="{{queryId}}" />
      <condition attribute="pfc_webstatus" operator="eq" value="470000003" />
    </filter>
  </entity>
</fetch>
{% endfetchxml %}
$(document).ready(function () {
    {% for query in queryFetch.results.entities %}
        $('div.timelineheader').hide();
    {% endfor %}
});


