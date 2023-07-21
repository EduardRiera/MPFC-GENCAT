var HistoricOfState;
(function (HistoricOfState) {
    var FormEvents;
    (function (FormEvents) {
        var LogicalName = "pfc_historyofstates";
        function OnLoad(ec) {
            "use strict";
            var fc = ec.getFormContext();
            HistoricOfState.Functions.HideLookups(fc);
        }
        FormEvents.OnLoad = OnLoad;
    })(FormEvents = HistoricOfState.FormEvents || (HistoricOfState.FormEvents = {}));
})(HistoricOfState || (HistoricOfState = {}));
(function (HistoricOfState) {
    var Functions;
    (function (Functions) {
        function HideLookups(fc) {
            if (fc.ui.getFormType() != HistoricOfState.Constants.Optionset.FormType.Create) {
                if (fc.getAttribute(HistoricOfState.Constants.Fields.Query).getValue() == null)
                    fc.getControl(HistoricOfState.Constants.Fields.Query).setVisible(false);
                else
                    fc.getControl(HistoricOfState.Constants.Fields.Query).setVisible(true);
                if (fc.getAttribute(HistoricOfState.Constants.Fields.QueryDGT).getValue() == null)
                    fc.getControl(HistoricOfState.Constants.Fields.QueryDGT).setVisible(false);
                else
                    fc.getControl(HistoricOfState.Constants.Fields.QueryDGT).setVisible(true);
                if (fc.getAttribute(HistoricOfState.Constants.Fields.OET).getValue() == null)
                    fc.getControl(HistoricOfState.Constants.Fields.OET).setVisible(false);
                else
                    fc.getControl(HistoricOfState.Constants.Fields.OET).setVisible(true);
                if (fc.getAttribute(HistoricOfState.Constants.Fields.TrainingRequest).getValue() == null)
                    fc.getControl(HistoricOfState.Constants.Fields.TrainingRequest).setVisible(false);
                else
                    fc.getControl(HistoricOfState.Constants.Fields.TrainingRequest).setVisible(true);
            }
        }
        Functions.HideLookups = HideLookups;
    })(Functions = HistoricOfState.Functions || (HistoricOfState.Functions = {}));
})(HistoricOfState || (HistoricOfState = {}));
(function (HistoricOfState) {
    var Constants;
    (function (Constants) {
        var Fields;
        (function (Fields) {
            Fields.Query = "pfc_queryid";
            Fields.OET = "pfc_tax_transcendence_operationid";
            Fields.QueryDGT = "pfc_querydgtid";
            Fields.TrainingRequest = "pfc_trainingrequestid";
        })(Fields = Constants.Fields || (Constants.Fields = {}));
    })(Constants = HistoricOfState.Constants || (HistoricOfState.Constants = {}));
})(HistoricOfState || (HistoricOfState = {}));
(function (HistoricOfState) {
    var Constants;
    (function (Constants) {
        var Optionset;
        (function (Optionset) {
            var FormType;
            (function (FormType) {
                FormType.Create = 1;
            })(FormType = Optionset.FormType || (Optionset.FormType = {}));
        })(Optionset = Constants.Optionset || (Constants.Optionset = {}));
    })(Constants = HistoricOfState.Constants || (HistoricOfState.Constants = {}));
})(HistoricOfState || (HistoricOfState = {}));
