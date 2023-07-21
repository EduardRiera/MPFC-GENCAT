"use strict";
var MainProcedure = { __namespace: true };
MainProcedure.LogicalName = "pfc_procedure";
MainProcedure.FormEvents = {
    OnLoad: function (ec) {
        var fc = ec.getFormContext();
    },
    OnChange: {
        Entitat: function (ec) {
            var fc = ec.getFormContext();
            MainProcedure.Functions.BusinessLogic.setSupervisorAndDepartamentalAgrupation(fc);
        }
    },
    __namespace: true
};
MainProcedure.Functions = {
    BusinessLogic: {
        setSupervisorAndDepartamentalAgrupation: function (fc) {
            var lookupAccountId, accountId;
            lookupAccountId = fc.getAttribute(MainProcedure.Constants.Fields.Entitat).getValue();
            if (lookupAccountId) {
                accountId = lookupAccountId[0].id;
                Xrm.WebApi.online.retrieveMultipleRecords(MainProcedure.Constants.Entities.Entitat.LogicalName, MainProcedure.Queries.QueriesToRetrieveAccount(fc, accountId)).then(function success(result) {
                    var lookupSupervisorId = new Array();
                    var lookupSupervisorIdItem = new Object();
                    if (result.entities[0] && result.entities[0]._pfc_responsableid_value && result.entities[0]["_pfc_responsableid_value@OData.Community.Display.V1.FormattedValue"]) {
                        lookupSupervisorIdItem.id = result.entities[0]._pfc_responsableid_value;
                        lookupSupervisorIdItem.name = result.entities[0]["_pfc_responsableid_value@OData.Community.Display.V1.FormattedValue"];
                        lookupSupervisorIdItem.entityType = "systemuser";
                        lookupSupervisorId[0] = lookupSupervisorIdItem;
                        fc.getAttribute(MainProcedure.Constants.Fields.Supervisor).setValue(lookupSupervisorId);
                    }
                    var lookupDepartamentalAgrupation = new Array();
                    var lookupDepartamentalAgrupationItem = new Object();
                    if (result.entities[0] && result.entities[0]._pfc_departamental_agrupationid_value && result.entities[0]["_pfc_departamental_agrupationid_value@OData.Community.Display.V1.FormattedValue"]) {
                        lookupDepartamentalAgrupationItem.id = result.entities[0]._pfc_departamental_agrupationid_value;
                        lookupDepartamentalAgrupationItem.name = result.entities[0]["_pfc_departamental_agrupationid_value@OData.Community.Display.V1.FormattedValue"];
                        lookupDepartamentalAgrupationItem.entityType = "pfc_departamental_agrupation";
                        lookupDepartamentalAgrupation[0] = lookupDepartamentalAgrupationItem;
                        fc.getAttribute(MainProcedure.Constants.Fields.DepartamentalAgrupation).setValue(lookupDepartamentalAgrupation);
                    }
                }, function error(error) {
                    Xrm.Navigation.openAlertDialog(error.message);
                });
            }
            else {
                fc.getAttribute(MainProcedure.Constants.Fields.DepartamentalAgrupation).setValue(null);
                fc.getAttribute(MainProcedure.Constants.Fields.Supervisor).setValue(null);
            }
        }
    }
};
MainProcedure.Queries = {
    QueriesToRetrieveAccount: function (fc, fieldValue) {
        var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' no-lock='true'>\
                <entity name='account'>\
                <attribute name='accountid' />\
                <attribute name='pfc_departamental_agrupationid' />\
                <attribute name='pfc_responsableid' />\
                <filter>\
                  <condition attribute='accountid' operator='eq' value='" + fieldValue + "' />\
                </filter>\
              </entity>\
            </fetch>";
        fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
        return fetchXml;
    }
};
MainProcedure.Constants =
    {
        Fields: {
            Supervisor: "pfc_supervisorid",
            Entitat: "pfc_accountid",
            DepartamentalAgrupation: "pfc_enrollmentdepartmentid"
        },
        Entities: {
            SystemUser: {
                LogicalName: "systemuser"
            },
            Entitat: {
                LogicalName: "account"
            },
            DepartamentalAgrupation: {
                LogicalName: "pfc_departamental_agrupation"
            }
        }
    };
