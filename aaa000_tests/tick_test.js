TickTest = {
    test1: function () {
        console.log("test1");
        var p1 = new LibraryPiece('n1', 'c1');
        var m1 = new Measure();
        m1.addBeats([new Beat(3, 4)]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerBeat = 3;
        var ticks = p1.metronome.ticks;
        var range = _.range(0, 12); // http://underscorejs.org/#range

        console.log("ASSERT: 12 = ticks.length", 12 == ticks.length);
        console.log("ASSERT: [0,4,8] isClassic}))", _.isEqual([0,4,8], range.filter(function(each){return ticks[each].isClassic})));
        console.log("ASSERT: [0,4,8] isRightHand}))", _.isEqual([0,4,8], range.filter(function(each){return ticks[each].isRightHand})));
        console.log("ASSERT: [0,3,6,9] isLeftHand}))", _.isEqual([0,3,6,9], range.filter(function(each){return ticks[each].isLeftHand})));
        console.log("ASSERT: [1,2,5,7,10,11] isBackground}))", _.isEqual([1,2,5,7,10,11], range.filter(function(each){return ticks[each].isBackground})));
    }
}

