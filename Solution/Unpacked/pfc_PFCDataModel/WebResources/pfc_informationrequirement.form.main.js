var InformationRequirement;
(function (InformationRequirement) {
    var FormEvents;
    (function (FormEvents) {
        var LogicalName = "pfc_informationrequirement";
        function onLoad(ec) {
            "use strict";
            var fc = ec.getFormContext();
            //ec.getFormContext().data.process.addOnStageSelected(InformationRequirement.Functions.BusinessLogic.setQueryState);
            InformationRequirement.FormEvents.OnLoad.pfc_queryid(ec);
        }
        FormEvents.onLoad = onLoad;
    })(FormEvents = InformationRequirement.FormEvents || (InformationRequirement.FormEvents = {}));
})(InformationRequirement || (InformationRequirement = {}));
(function (InformationRequirement) {
    var FormEvents;
    (function (FormEvents) {
        var OnLoad;
        (function (OnLoad) {
            function pfc_queryid(ec) {
                "use strict";
                var fc = ec.getFormContext();
                InformationRequirement.Functions.BusinessLogic.setQueryFields(fc);
            }
            OnLoad.pfc_queryid = pfc_queryid;
        })(OnLoad = FormEvents.OnLoad || (FormEvents.OnLoad = {}));
    })(FormEvents = InformationRequirement.FormEvents || (InformationRequirement.FormEvents = {}));
})(InformationRequirement || (InformationRequirement = {}));
(function (InformationRequirement) {
    var Functions;
    (function (Functions) {
        var BusinessLogic;
        (function (BusinessLogic) {
            function setQueryFields(fc) {
                var lookupRegardingObjectId, regardingObjectId;
                lookupRegardingObjectId = fc.getAttribute(InformationRequirement.Constants.Fields.RegardingObjectId).getValue();
                if (lookupRegardingObjectId != null) {
                    regardingObjectId = lookupRegardingObjectId[0].id;
                    Xrm.WebApi.online.retrieveMultipleRecords(InformationRequirement.Constants.Entities.Query.LogicalName, InformationRequirement.Queries.QueriesToRetrieveQueryId(fc, regardingObjectId)).then(function success(result) {
                        var lookupAccountId = new Array();
                        lookupAccountId[0] = new Object();
                        lookupAccountId[0].id = result.entities[0]._pfc_accountid_value;
                        lookupAccountId[0].name = result.entities[0]["_pfc_accountid_value@OData.Community.Display.V1.FormattedValue"];
                        lookupAccountId[0].entityType = "account";
                        fc.getAttribute(InformationRequirement.Constants.Fields.Entitat).setValue(lookupAccountId);
                        var lookupApplicantId = new Array();
                        lookupApplicantId[0] = new Object();
                        lookupApplicantId[0].id = result.entities[0]._pfc_applicantid_value;
                        lookupApplicantId[0].name = result.entities[0]["_pfc_applicantid_value@OData.Community.Display.V1.FormattedValue"];
                        lookupApplicantId[0].entityType = "contact";
                        fc.getAttribute(InformationRequirement.Constants.Fields.Peticionari).setValue(lookupApplicantId);
                    }, function error(error) {
                        Xrm.Navigation.openAlertDialog(error.message);
                    });
                }
            }
            BusinessLogic.setQueryFields = setQueryFields;
        })(BusinessLogic = Functions.BusinessLogic || (Functions.BusinessLogic = {}));
    })(Functions = InformationRequirement.Functions || (InformationRequirement.Functions = {}));
})(InformationRequirement || (InformationRequirement = {}));
(function (InformationRequirement) {
    var Constants;
    (function (Constants) {
        var Fields;
        (function (Fields) {
            Fields.RegardingObjectId = "regardingobjectid";
            Fields.Subject = "subject";
            Fields.AssignedId = "pfc_assignedid";
            Fields.Peticionari = "pfc_applicantid";
            Fields.StartDate = "scheduledstart";
            Fields.Entitat = "pfc_accountid";
        })(Fields = Constants.Fields || (Constants.Fields = {}));
    })(Constants = InformationRequirement.Constants || (InformationRequirement.Constants = {}));
})(InformationRequirement || (InformationRequirement = {}));
(function (InformationRequirement) {
    var Constants;
    (function (Constants) {
        var Entities;
        (function (Entities) {
            var Contact;
            (function (Contact) {
                Contact.LogicalName = "contact";
            })(Contact = Entities.Contact || (Entities.Contact = {}));
        })(Entities = Constants.Entities || (Constants.Entities = {}));
    })(Constants = InformationRequirement.Constants || (InformationRequirement.Constants = {}));
})(InformationRequirement || (InformationRequirement = {}));
(function (InformationRequirement) {
    var Constants;
    (function (Constants) {
        var Entities;
        (function (Entities) {
            var Entitat;
            (function (Entitat) {
                Entitat.LogicalName = "account";
            })(Entitat = Entities.Entitat || (Entities.Entitat = {}));
        })(Entities = Constants.Entities || (Constants.Entities = {}));
    })(Constants = InformationRequirement.Constants || (InformationRequirement.Constants = {}));
})(InformationRequirement || (InformationRequirement = {}));
(function (InformationRequirement) {
    var Constants;
    (function (Constants) {
        var Entities;
        (function (Entities) {
            var Query;
            (function (Query) {
                Query.LogicalName = "pfc_query";
            })(Query = Entities.Query || (Entities.Query = {}));
        })(Entities = Constants.Entities || (Constants.Entities = {}));
    })(Constants = InformationRequirement.Constants || (InformationRequirement.Constants = {}));
})(InformationRequirement || (InformationRequirement = {}));
(function (InformationRequirement) {
    var Queries;
    (function (Queries) {
        function QueriesToRetrieveQueryId(fc, fieldValue) {
            "use strict";
            var fetchXml = [
                "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' no-lock='true'>\
            <entity name='pfc_query'>\
            <attribute name='pfc_applicantid' />\
            <attribute name ='pfc_queryid' />\
            <attribute name='pfc_accountid' />\
            <filter>\
            <condition attribute='pfc_queryid' operator='eq' value='" + fieldValue + "' />\
            </filter>\
            </entity>\
            </fetch>",
            ].join("");
            fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
            return fetchXml;
        }
        Queries.QueriesToRetrieveQueryId = QueriesToRetrieveQueryId;
    })(Queries = InformationRequirement.Queries || (InformationRequirement.Queries = {}));
})(InformationRequirement || (InformationRequirement = {}));
