var QueryRibbon;
(function (QueryRibbon) {
    var FormEvents;
    (function (FormEvents) {
        var LogicalName = "pfc_query";
        function OnLoad(ec) {
            "use strict";
            var fc = ec.getFormContext();
        }
        FormEvents.OnLoad = OnLoad;
    })(FormEvents = QueryRibbon.FormEvents || (QueryRibbon.FormEvents = {}));
})(QueryRibbon || (QueryRibbon = {}));
(function (QueryRibbon) {
    var Functions;
    (function (Functions) {
        var BusinessLogic;
        (function (BusinessLogic) {
            function cloneQuery(fc) {
                var queryId = fc.data.entity.getId();
                var url = Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.2/pfc_clonequeryapi?queryId";
                this.postData(fc, url, queryId);
            }
            BusinessLogic.cloneQuery = cloneQuery;
            function postData(fc, url, queryId) {
                var result;
                var options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "queryid": queryId
                    }),
                };
                fetch(url, options).then(function (response) {
                    response.json().then(function (response) {
                        Xrm.Utility.openEntityForm("pfc_query", response["clonequeryapiresult"]);
                        var alertStrings = { confirmButtonLabel: "D'acord", text: "La consulta s'ha clonat correctament.", title: "Clone Consulta" };
                        var alertOptions = { height: 120, width: 260 };
                        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function (success) {
                            console.log("Alert dialog closed");
                        }, function (error) {
                            console.log(error.message);
                        });
                    });
                }).then(function (data) {
                }).catch(function (e) {
                    var alertStrings = { confirmButtonLabel: "D'acord", text: "Ha ocurrido un error inesperado.", title: "Clone Consulta" };
                    var alertOptions = { height: 120, width: 260 };
                    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function (success) {
                        console.log("Alert dialog closed");
                    }, function (error) {
                        console.log(error.message);
                    });
                });
            }
            BusinessLogic.postData = postData;
            function AnonymousQuery(fc) {
                var queryId = fc.data.entity.getId();
                var url = Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.2/pfc_anonymousquery?queryId";
                this.postDataAnonymous(fc, url, queryId);
            }
            BusinessLogic.AnonymousQuery = AnonymousQuery;
            function postDataAnonymous(fc, url, queryId) {
                var options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "queryid": queryId
                    }),
                };
                fetch(url, options).then(function (response) {
                    response.json().then(function (response) {
                        Xrm.Utility.openEntityForm("pfc_anonymizedrecord", response["anonymousqueryapiresult"]);
                        var alertStrings = { confirmButtonLabel: "D'acord", text: "La consulta s'ha anonimitzat correctament.", title: "Anonimitzar consulta" };
                        var alertOptions = { height: 120, width: 260 };
                        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function (success) {
                            console.log("Alert dialog closed");
                        }, function (error) {
                            console.log(error.message);
                        });
                    });
                }).then(function (data) {
                }).catch(function (e) {
                    var alertStrings = { confirmButtonLabel: "D'acord", text: "Ha ocurrido un error inesperado.", title: "Anonimitzar consulta" };
                    var alertOptions = { height: 120, width: 260 };
                    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function (success) {
                        console.log("Alert dialog closed");
                    }, function (error) {
                        console.log(error.message);
                    });
                });
            }
            BusinessLogic.postDataAnonymous = postDataAnonymous;
        })(BusinessLogic = Functions.BusinessLogic || (Functions.BusinessLogic = {}));
    })(Functions = QueryRibbon.Functions || (QueryRibbon.Functions = {}));
})(QueryRibbon || (QueryRibbon = {}));
