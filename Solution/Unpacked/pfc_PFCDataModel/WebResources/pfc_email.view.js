var Email;
(function (Email) {
    var FormEvents;
    (function (FormEvents) {
        var LogicalName = "email";
        function OnLoad(ec) {
            var fc = ec.getFormContext();
            var createForm = fc.ui.getFormType();
            if (createForm == 1) {
                Email.Functions.BusinessLogic.setSubject(fc);
                Email.Functions.BusinessLogic.setForm(fc);
                Email.Functions.BusinessLogic.setAc(fc);
            }
        }
        FormEvents.OnLoad = OnLoad;
    })(FormEvents = Email.FormEvents || (Email.FormEvents = {}));
})(Email || (Email = {}));
(function (Email) {
    var Functions;
    (function (Functions) {
        var BusinessLogic;
        (function (BusinessLogic) {
            function setSubject(fc) {
                "use strict";
                var regardingObject = fc.getAttribute(Email.Constants.Fields.RegardingObjectId).getValue();
                if (!fc.getAttribute(Email.Constants.Fields.Subject).getValue() && regardingObject) {
                    var regardingObjectId = regardingObject[0].id;
                    var regardingObjectName_1 = regardingObject[0].name;
                    switch (regardingObject[0].entityType) {
                        case Email.Constants.Entities.QueryDGT.LogicalName:
                            Xrm.WebApi.online.retrieveMultipleRecords(Email.Constants.Entities.Entitat.LogicalName, Email.Queries.QueriesToRetrieveAccountByQueryDgtId(fc, regardingObjectId)).then(function success(result) {
                                fc.getAttribute(Email.Constants.Fields.Subject).setValue(regardingObjectName_1 + ': ' + result.entities[0].name);
                            }, function error(error) {
                                Xrm.Navigation.openAlertDialog(error.message);
                            });
                            break;
                        case Email.Constants.Entities.Query.LogicalName:
                            Xrm.WebApi.online.retrieveMultipleRecords(Email.Constants.Entities.Entitat.LogicalName, Email.Queries.QueriesToRetrieveAccountByQueryId(fc, regardingObjectId)).then(function success(result) {
                                fc.getAttribute(Email.Constants.Fields.Subject).setValue(regardingObjectName_1 + ': ' + result.entities[0].name);
                            }, function error(error) {
                                Xrm.Navigation.openAlertDialog(error.message);
                            });
                            break;
                        case Email.Constants.Entities.OET.LogicalName:
                            Xrm.WebApi.online.retrieveMultipleRecords(Email.Constants.Entities.Entitat.LogicalName, Email.Queries.QueriesToRetrieveAccountByOET(fc, regardingObjectId)).then(function success(result) {
                                fc.getAttribute(Email.Constants.Fields.Subject).setValue(regardingObjectName_1 + ': ' + result.entities[0].name);
                            }, function error(error) {
                                Xrm.Navigation.openAlertDialog(error.message);
                            });
                            break;
                    }
                }
            }
            BusinessLogic.setSubject = setSubject;
            function setAc(fc) {
                "use strict";
                var regardingObject = fc.getAttribute(Email.Constants.Fields.RegardingObjectId).getValue();
                var regex = /^(([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)(\s*;\s*|\s*$))*/;
                var j = 0;
                var partlist = new Array();
                if (!fc.getAttribute(Email.Constants.Fields.Ac).getValue() && regardingObject) {
                    var regardingObjectId = regardingObject[0].id;
                    var regardingObjectLogicalName = regardingObject[0].entityType;
                    Xrm.WebApi.online.retrieveMultipleRecords(regardingObjectLogicalName, Email.Queries.QueriesToRetrieveContactById(fc, regardingObjectId, regardingObjectLogicalName)).then(function success(result) {
                        var validString = regex.test(result.entities[0]["pfc_interestedpeople"]);
                        if (validString) {
                            var str = result.entities[0]["pfc_interestedpeople"];
                            var arraySplitted_1 = str.split(";");
                            var _loop_1 = function (i) {
                                Xrm.WebApi.online.retrieveMultipleRecords(Email.Constants.Entities.Contact.LogicalName, Email.Queries.QueriesToRetrieveContactByEmail(fc, arraySplitted_1[i])).then(function success(result2) {
                                    var regex2 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                                    if (regex2.test(arraySplitted_1[i])) {
                                        if (result2.entities.length > 0) {
                                            partlist[j] = new Object();
                                            partlist[j].id = result2.entities[0].contactid;
                                            partlist[j].name = result2.entities[0].fullname;
                                            partlist[j].entityType = Email.Constants.Entities.Contact.LogicalName;
                                            j++;
                                            fc.getAttribute(Email.Constants.Fields.Ac).setValue(partlist);
                                        }
                                        else {
                                            partlist[j] = new Object();
                                            partlist[j].id = "{00000000-0000-0000-0000-000000000000}";
                                            partlist[j].name = arraySplitted_1[i];
                                            partlist[j].entityType = "unresolvedaddress";
                                            fc.getAttribute(Email.Constants.Fields.Ac).setValue(partlist);
                                            j++;
                                        }
                                    }
                                }, function error(error) {
                                    Xrm.Navigation.openAlertDialog(error.message);
                                });
                            };
                            for (var i = 0; i < arraySplitted_1.length; i++) {
                                _loop_1(i);
                            }
                        }
                    }, function error(error) {
                        Xrm.Navigation.openAlertDialog(error.message);
                    });
                }
            }
            BusinessLogic.setAc = setAc;
            function setForm(fc) {
                "use strict";
                Xrm.WebApi.online.retrieveMultipleRecords(Email.Constants.Entities.Configuracio.LogicalName, Email.Queries.QueriesToRetrieveConfiguracio(fc)).then(function success(result) {
                    var lookupUsuari = new Array();
                    lookupUsuari[0] = new Object();
                    lookupUsuari[0].name = result.entities[1].pfc_value;
                    lookupUsuari[0].id = result.entities[0].pfc_value;
                    lookupUsuari[0].entityType = "systemuser";
                    fc.getControl(Email.Constants.Fields.From).setDisabled(true);
                    fc.getAttribute(Email.Constants.Fields.From).setValue(lookupUsuari);
                    fc.getAttribute(Email.Constants.Fields.Propietari).setValue(lookupUsuari);
                }, function error(error) {
                    Xrm.Navigation.openAlertDialog(error.message);
                });
            }
            BusinessLogic.setForm = setForm;
        })(BusinessLogic = Functions.BusinessLogic || (Functions.BusinessLogic = {}));
    })(Functions = Email.Functions || (Email.Functions = {}));
})(Email || (Email = {}));
(function (Email) {
    var Queries;
    (function (Queries) {
        function QueriesToRetrieveContactByEmail(fc, fieldValue) {
            "use strict";
            var fetchXml = [
                "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' no-lock='true'>\
                    <entity name='contact' >\
                    <attribute name='contactid' />\
                    <attribute name='fullname' />\
                    <filter>\
                    <condition attribute='emailaddress1' operator='eq' value='" + fieldValue + "'/>\
                    </filter>\
                    </entity>\
                    </fetch>",
            ].join("");
            fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
            return fetchXml;
        }
        Queries.QueriesToRetrieveContactByEmail = QueriesToRetrieveContactByEmail;
        ;
        function QueriesToRetrieveContactById(fc, fieldValue, logicalName) {
            "use strict";
            var fetchXml = [
                "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' no-lock='true'>\
                    <entity name='" + logicalName + "' >\
                    <attribute name='pfc_interestedpeople' />\
                    <filter>\
                    <condition attribute='" + logicalName + "id' operator='eq' value='" + fieldValue + "' />\
                    </filter>\
                    </entity>\
                    </fetch>",
            ].join("");
            fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
            return fetchXml;
        }
        Queries.QueriesToRetrieveContactById = QueriesToRetrieveContactById;
        ;
        function QueriesToRetrieveAccountByQueryDgtId(fc, fieldValue) {
            "use strict";
            var fetchXml = [
                "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' no-lock='true'>\
                <entity name= 'account'>\
                    <attribute name = 'name' />\
                    <attribute name= 'accountid' />\
                    <link-entity name='pfc_query_dgt' from='pfc_accountid' to='accountid' link-type='inner'>\
                        <filter>\
                            <condition attribute='pfc_query_dgtid' operator = 'eq' value = '" + fieldValue + "' />\
                        </filter>\
                    </link-entity>\
                </entity>\
            </fetch>",
            ].join("");
            fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
            return fetchXml;
        }
        Queries.QueriesToRetrieveAccountByQueryDgtId = QueriesToRetrieveAccountByQueryDgtId;
        ;
        function QueriesToRetrieveAccountByOET(fc, fieldValue) {
            "use strict";
            var fetchXml = [
                "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' no-lock='true'>\
                <entity name= 'account'>\
                    <attribute name = 'name' />\
                    <attribute name= 'accountid' />\
                        <link-entity name='pfc_tax_transcendence_operation' from='pfc_accountid' to='accountid' link-type='inner'>\
                        <filter>\
                            <condition attribute='pfc_tax_transcendence_operationid' operator = 'eq' value = '" + fieldValue + "' />\
                        </filter>\
                    </link-entity>\
                </entity>\
            </fetch>",
            ].join("");
            fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
            return fetchXml;
        }
        Queries.QueriesToRetrieveAccountByOET = QueriesToRetrieveAccountByOET;
        ;
        function QueriesToRetrieveAccountByQueryId(fc, fieldValue) {
            "use strict";
            var fetchXml = [
                "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' no-lock='true'>\
                <entity name= 'account'>\
                    <attribute name = 'name' />\
                    <attribute name= 'accountid' />\
                    <link-entity name='pfc_query' from='pfc_accountid' to='accountid' link-type='inner'>\
                        <filter>\
                            <condition attribute='pfc_queryid' operator = 'eq' value = '" + fieldValue + "' />\
                        </filter>\
                    </link-entity>\
                </entity>\
            </fetch>",
            ].join("");
            fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
            return fetchXml;
        }
        Queries.QueriesToRetrieveAccountByQueryId = QueriesToRetrieveAccountByQueryId;
        function QueriesToRetrieveConfiguracio(fc) {
            "use strict";
            var fetchXml = [
                "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' no-lock='true'>\
                <entity name='pfc_settings' >\
                    <attribute name='pfc_value' />\
                    <filter>\
                        <condition attribute='pfc_configuration_group_name' operator = 'eq' value = 'Bustia_Correu' />\
                    </filter>\
                </entity>\
            </fetch>",
            ].join("");
            fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
            return fetchXml;
        }
        Queries.QueriesToRetrieveConfiguracio = QueriesToRetrieveConfiguracio;
    })(Queries = Email.Queries || (Email.Queries = {}));
})(Email || (Email = {}));
(function (Email) {
    var Constants;
    (function (Constants) {
        var Entities;
        (function (Entities) {
            var Entitat;
            (function (Entitat) {
                Entitat.LogicalName = "account";
            })(Entitat = Entities.Entitat || (Entities.Entitat = {}));
        })(Entities = Constants.Entities || (Constants.Entities = {}));
    })(Constants = Email.Constants || (Email.Constants = {}));
})(Email || (Email = {}));
(function (Email_1) {
    var Constants;
    (function (Constants) {
        var Entities;
        (function (Entities) {
            var Email;
            (function (Email) {
                Email.LogicalName = "email";
            })(Email = Entities.Email || (Entities.Email = {}));
        })(Entities = Constants.Entities || (Constants.Entities = {}));
    })(Constants = Email_1.Constants || (Email_1.Constants = {}));
})(Email || (Email = {}));
(function (Email) {
    var Constants;
    (function (Constants) {
        var Entities;
        (function (Entities) {
            var Contact;
            (function (Contact) {
                Contact.LogicalName = "contact";
            })(Contact = Entities.Contact || (Entities.Contact = {}));
        })(Entities = Constants.Entities || (Constants.Entities = {}));
    })(Constants = Email.Constants || (Email.Constants = {}));
})(Email || (Email = {}));
(function (Email) {
    var Constants;
    (function (Constants) {
        var Entities;
        (function (Entities) {
            var QueryDGT;
            (function (QueryDGT) {
                QueryDGT.LogicalName = "pfc_query_dgt";
            })(QueryDGT = Entities.QueryDGT || (Entities.QueryDGT = {}));
        })(Entities = Constants.Entities || (Constants.Entities = {}));
    })(Constants = Email.Constants || (Email.Constants = {}));
})(Email || (Email = {}));
(function (Email) {
    var Constants;
    (function (Constants) {
        var Entities;
        (function (Entities) {
            var Configuracio;
            (function (Configuracio) {
                Configuracio.LogicalName = "pfc_settings";
            })(Configuracio = Entities.Configuracio || (Entities.Configuracio = {}));
        })(Entities = Constants.Entities || (Constants.Entities = {}));
    })(Constants = Email.Constants || (Email.Constants = {}));
})(Email || (Email = {}));
(function (Email) {
    var Constants;
    (function (Constants) {
        var Entities;
        (function (Entities) {
            var Query;
            (function (Query) {
                Query.LogicalName = "pfc_query";
            })(Query = Entities.Query || (Entities.Query = {}));
        })(Entities = Constants.Entities || (Constants.Entities = {}));
    })(Constants = Email.Constants || (Email.Constants = {}));
})(Email || (Email = {}));
(function (Email) {
    var Constants;
    (function (Constants) {
        var Entities;
        (function (Entities) {
            var OET;
            (function (OET) {
                OET.LogicalName = "pfc_tax_transcendence_operation";
            })(OET = Entities.OET || (Entities.OET = {}));
        })(Entities = Constants.Entities || (Constants.Entities = {}));
    })(Constants = Email.Constants || (Email.Constants = {}));
})(Email || (Email = {}));
(function (Email) {
    var Constants;
    (function (Constants) {
        var Fields;
        (function (Fields) {
            Fields.RegardingObjectId = "regardingobjectid";
            Fields.Subject = "subject";
            Fields.From = "from";
            Fields.Propietari = "ownerid";
            Fields.Ac = "cc";
        })(Fields = Constants.Fields || (Constants.Fields = {}));
    })(Constants = Email.Constants || (Email.Constants = {}));
})(Email || (Email = {}));
