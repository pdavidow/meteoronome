MetronomeTestModule = Object.create(AbstractSimpleTestModule);

_.extend(MetronomeTestModule, {
    test0: function () {
        console.log("MetronomeTest 0");
        var p1 = new LibraryPiece('n1', 'c1');
        var m1;
        var setting = p1.metronomeSetting;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        _.range(1, 241).forEach(function(each) {
            m1 = new Measure();
            m1.addBeats([new Beat(1,1)]);
            p1.addMeasures([m1]);
        });

        console.log("ASSERT: 241 == ticks.length", 241 == p1.metronome.ticks.length);
    },
    test1: function () {
        console.log("MetronomeTest 1");
        var p1 = new LibraryPiece('n1', 'c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(8,3),
            new Beat(11,3)
        ]);
        p1.addMeasures([m1]);

        console.log("ASSERT: 24 ticks in beat 0", 24 == p1.measures[0].beats[0].tickAmount);
        console.log("ASSERT: 33 ticks in beat 0", 33 == p1.measures[0].beats[1].tickAmount);
    }
});
