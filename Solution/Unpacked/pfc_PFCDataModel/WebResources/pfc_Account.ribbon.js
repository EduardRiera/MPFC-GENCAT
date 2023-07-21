var AccountRibbon;
(function (AccountRibbon) {
    var FormEvents;
    (function (FormEvents) {
        var LogicalName = "account";
        function OnLoad(ec) {
            "use strict";
            var fc = ec.getFormContext();
        }
        FormEvents.OnLoad = OnLoad;
    })(FormEvents = AccountRibbon.FormEvents || (AccountRibbon.FormEvents = {}));
})(AccountRibbon || (AccountRibbon = {}));
(function (AccountRibbon) {
    var Functions;
    (function (Functions) {
        var BusinessLogic;
        (function (BusinessLogic) {
            function syncCatens(fc) {
                this.clrearAllNotifications(fc);
                var entityCode = fc.getAttribute("pfc_catalog_code").getValue();
                Xrm.WebApi.online.retrieveMultipleRecords(AccountRibbon.Constants.Fields.SettingsLogicalName, AccountRibbon.Query.RetrieveCatensUrl()).then(function success(result) {
                    var url = result.entities[0]["pfc_value"];
                    url = url.replace("ENTITYCODE", entityCode);
                    console.log(url);
                    postData(fc, url);
                }, function error(error) {
                    Xrm.Navigation.openAlertDialog(error.message);
                });
            }
            BusinessLogic.syncCatens = syncCatens;
            function postData(fc, url) {
                var _this = this;
                var result;
                var options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                fetch(url, options).then(function (response) {
                    switch (response.status) {
                        case 200:
                            fc.ui.setFormNotification("Sincronización con CATENS realizada con éxito", "INFO", _this.syncCantensOK);
                            break;
                        case 400:
                            fc.ui.setFormNotification("No se ha podido encontrar la entidad.", "ERROR", _this.syncCantensKO);
                            break;
                        case 404:
                            fc.ui.setFormNotification("Ha ocurrido un error al llamar al servicio", "ERROR", _this.syncCantensKO);
                            break;
                        default:
                            console.log("Respuesta desconocida");
                            break;
                    }
                }).then(function (data) {
                }).catch(function (e) {
                    fc.ui.setFormNotification("Ha ocurrido un error inesperado", "ERROR", _this.syncCantensKO);
                });
            }
            BusinessLogic.postData = postData;
            function clrearAllNotifications(fc) {
                fc.ui.clearFormNotification(this.syncCantensOK);
                fc.ui.clearFormNotification(this.syncCantensKO);
            }
            BusinessLogic.clrearAllNotifications = clrearAllNotifications;
        })(BusinessLogic = Functions.BusinessLogic || (Functions.BusinessLogic = {}));
    })(Functions = AccountRibbon.Functions || (AccountRibbon.Functions = {}));
})(AccountRibbon || (AccountRibbon = {}));
(function (AccountRibbon) {
    var Constants;
    (function (Constants) {
        var Fields;
        (function (Fields) {
            Fields.DefectType = "sgs_defecttypeid";
            Fields.DefectSubType = "sgs_defectsubtypeid";
            Fields.OtherDefectSubType = "sgs_other_defect_subtype";
            Fields.SettingsLogicalName = "pfc_settings";
        })(Fields = Constants.Fields || (Constants.Fields = {}));
    })(Constants = AccountRibbon.Constants || (AccountRibbon.Constants = {}));
})(AccountRibbon || (AccountRibbon = {}));
(function (AccountRibbon) {
    var Query;
    (function (Query) {
        function RetrieveDefectType(fc, fieldValue) {
            "use strict";
            var fetchXml = [
                "<fetch no-lock='true'>",
                "  <entity name='sgs_defecttype'>",
                "    <attribute name='sgs_allowfreetext' />",
                "    <filter>",
                "      <condition attribute='sgs_defecttypeid' operator='eq' value='", fieldValue, "'/>",
                "    </filter>",
                "  </entity>",
                "</fetch>",
            ].join("");
            fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
            return fetchXml;
        }
        Query.RetrieveDefectType = RetrieveDefectType;
        function RetrieveCatensUrl() {
            "use strict";
            var fetchXml = [
                "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' no-lock='true'>\
                <entity name='pfc_settings'>\
                    <attribute name='pfc_configuration_group_name'/>\
                    <attribute name='pfc_value'/>\
                    <filter type='or'>\
                        <condition attribute='pfc_configuration_group_name' operator='eq' value='SyncCatens_URL'/>\
                    </filter>\
                </entity>\
            </fetch>",
            ].join("");
            fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
            return fetchXml;
        }
        Query.RetrieveCatensUrl = RetrieveCatensUrl;
    })(Query = AccountRibbon.Query || (AccountRibbon.Query = {}));
})(AccountRibbon || (AccountRibbon = {}));
