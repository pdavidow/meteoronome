MetronomeTestModule = Object.create(AbstractSimpleTestModule);

_.extend(MetronomeTestModule, {
    test0: function () {
        console.log("MetronomeTest 0");
        var p1 = new LibraryPiece('n1','c1');
        var m1;
        var setting = p1.metronomeSetting;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        _.range(1, 241).forEach(function(each) {
            m1 = new Measure();
            m1.addBeats([new Beat(1,1)]);
            p1.addMeasures([m1]);
        });

        console.log("ASSERT: 240+1 == ticks.length", 240+1 == p1.metronome.ticks.length);
    },
    test1: function () {
        console.log("MetronomeTest 1");
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(8,3),
            new Beat(11,3)
        ]);
        p1.addMeasures([m1]);

        console.log("ASSERT: 24 ticks in beat 0", 24 == p1.measures[0].beats[0].tickAmount);
        console.log("ASSERT: 33 ticks in beat 0", 33 == p1.measures[0].beats[1].tickAmount);
    },
    test2: function () {
        console.log("MetronomeTest 2");
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(1,3),
            new Beat(8,3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 60;
        setting.classicTicksPerBeat = 3;

        var ticks0 = p1.metronome.beats[0].ticks;
        var ticks1 = p1.metronome.beats[1].ticks;

        console.log("ASSERT: 3 == ticks0.length", 3 == ticks0.length);
        console.log("ASSERT: 24 == ticks1.length", 24 == ticks1.length);
        ticks0.forEach(function(each) {
            console.log("ASSERT: ticks0: 1 == each.waitSeconds", 1 == each.waitSeconds);
        });
        ticks1.forEach(function(each) {
            console.log("ASSERT: ticks1: 3/24 == each.waitSeconds", 3/24 == each.waitSeconds);
        });

        var ticks0Time = ticks0.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        var ticks1Time = ticks1.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});

        console.log("ASSERT: ticks0Time == ticks1Time", ticks0Time == ticks1Time);
    }
});
