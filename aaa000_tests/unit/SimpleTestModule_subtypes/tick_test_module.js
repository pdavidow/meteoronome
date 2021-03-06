TickTestModule = Object.create(AbstractSimpleTestModule);

_.extend(TickTestModule, {
    test_0: function () {
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([new Beat(3,4)]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerBeat = 1;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceBy_Name_Composer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);
        p1.metronome.validate();

        var ticks = p1.metronome.ticks;
        var range = _.range(0,12);

        console.log("ASSERT: a", 12+1 == ticks.length);
        console.log("ASSERT: b", _.isEqual([0], range.filter(function(each){return ticks[each].isClassic})));
        console.log("ASSERT: c", _.isEqual([0,4,8], range.filter(function(each){return ticks[each].isRightHand})));
        console.log("ASSERT: d", _.isEqual([0,3,6,9], range.filter(function(each){return ticks[each].isLeftHand})));
        console.log("ASSERT: e", _.isEqual([1,2,5,7,10,11], range.filter(function(each){return ticks[each].isBackground})));
    },
    test_1: function () {
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([new Beat(3,4)]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerBeat = 3;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceBy_Name_Composer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);
        p1.metronome.validate();

        var ticks = p1.metronome.ticks;
        var range = _.range(0,12);

        console.log("ASSERT: a", 12+1 == ticks.length);
        console.log("ASSERT: b", _.isEqual([0,4,8], range.filter(function(each){return ticks[each].isClassic})));
        console.log("ASSERT: c", _.isEqual([0,4,8], range.filter(function(each){return ticks[each].isRightHand})));
        console.log("ASSERT: d", _.isEqual([0,3,6,9], range.filter(function(each){return ticks[each].isLeftHand})));
        console.log("ASSERT: e", _.isEqual([1,2,5,7,10,11], range.filter(function(each){return ticks[each].isBackground})));
    },
    test_2: function () {
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([new Beat(3,4)]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerBeat = 4;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceBy_Name_Composer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);
        p1.metronome.validate();

        var ticks = p1.metronome.ticks;
        var range = _.range(0,12);

        console.log("ASSERT: a", 12+1 == ticks.length);
        console.log("ASSERT: b", _.isEqual([0,3,6,9], range.filter(function(each){return ticks[each].isClassic})));
        console.log("ASSERT: c", _.isEqual([0,4,8], range.filter(function(each){return ticks[each].isRightHand})));
        console.log("ASSERT: d", _.isEqual([0,3,6,9], range.filter(function(each){return ticks[each].isLeftHand})));
        console.log("ASSERT: e", _.isEqual([1,2,5,7,10,11], range.filter(function(each){return ticks[each].isBackground})));
    }
});



