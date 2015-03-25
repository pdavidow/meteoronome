Template.setting.helpers({
    measureAmount: function() {
        return Helper.currentPiece().measures.length;
    },
    isDisableIndexField: function() {
        return false; // todo
        return Helper.isMetronomeStarted() || Helper.isUseEntirePiece();
    }
});

Template.setting.events({
    "change #classicTicksPerMinute": function () {
        var int = parseInt($('#classicTicksPerMinute').val(), 10);
        Helper.metronomeSetting().classicTicksPerMinute = int;
    },
    "change #classicTicksPerBeat": function () {
        var int = parseInt($('#classicTicksPerBeat').val(), 10);
        Helper.metronomeSetting().classicTicksPerBeat = int;
    },
    "click .check#isLoop": function () {
        Helper.metronomeSetting().toggleIsLoop();
    },
    "click .check#isUseEntirePiece": function () {
        Helper.metronomeSetting().toggleIsUseEntirePiece();
    },
    "change #beginBeatIndex": function () {
        var int = parseInt($('#beginBeatIndex').val(), 10);
        Helper.metronomeSetting().beginBeatIndex_setFromUI(int);
    },
    "change #endBeatIndex": function () {
        var int = parseInt($('#endBeatIndex').val(), 10);
        Helper.metronomeSetting().endBeatIndex_setFromUI(int);
    },
    "change #beginMeasureIndex": function () {
        var int = parseInt($('#beginMeasureIndex').val(), 10);
        Helper.metronomeSetting().beginMeasureIndex_setFromUI(int);
    },
    "change #endMeasureIndex": function () {
        var int = parseInt($('#endMeasureIndex').val(), 10);
        Helper.metronomeSetting().endMeasureIndex_setFromUI(int);
    }
});

