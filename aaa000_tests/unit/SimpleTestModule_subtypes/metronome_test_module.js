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

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        console.log("ASSERT: a", 240+1 == p1.metronome.ticks.length);
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

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        console.log("ASSERT: a", 24 == p1.measures[0].beats[0].tickAmount);
        console.log("ASSERT: b", 33 == p1.measures[0].beats[1].tickAmount);
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
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks0 = p1.metronome.beats[0].ticks;
        var ticks1 = p1.metronome.beats[1].ticks;

        console.log("ASSERT: a", 3 == ticks0.length);
        console.log("ASSERT: b", 24 == ticks1.length);
        ticks0.forEach(function(each) {
            console.log("ASSERT: c", 1 == each.waitSeconds);
        });
        ticks1.forEach(function(each) {
            console.log("ASSERT: d", 3/24 == each.waitSeconds);
        });

        var ticks0Time = ticks0.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        var ticks1Time = ticks1.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: e", ticks0Time == ticks1Time);
    },
    test3: function () {
        console.log("MetronomeTest 3");
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(8,3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 60;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.beats[0].ticks;
        console.log("ASSERT: a1", 24 == ticks.length);
        console.log("ASSERT: a2", 24+1 == p1.metronome.ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 1.0);
    },
    test4: function () {
        console.log("MetronomeTest 4");
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(11,3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 60;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.beats[0].ticks;
        console.log("ASSERT: a1", 33 == ticks.length);
        console.log("ASSERT: a2", 33+1 == p1.metronome.ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 1.0);
    },
    test5: function () {
        console.log("MetronomeTest 5");
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(11,3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 10;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.beats[0].ticks;
        console.log("ASSERT: a1", 33 == ticks.length);
        console.log("ASSERT: a2", 33+1 == p1.metronome.ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 6.0);
    },
    test6: function () {
        console.log("MetronomeTest 6");
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(4,3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 120;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.beats[0].ticks;
        console.log("ASSERT: a1", 12 == ticks.length);
        console.log("ASSERT: a2", 12+1 == p1.metronome.ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 0.5);
    },
    test7: function () {
        console.log("MetronomeTest 7");
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(5,3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 120;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.beats[0].ticks;
        console.log("ASSERT: a1", 15 == ticks.length);
        console.log("ASSERT: a2", 15+1 == p1.metronome.ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 0.5);
    },
    test8: function () {
        console.log("MetronomeTest 8");
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(11,3),
            new Beat(4,3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 10;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.ticks;
        console.log("ASSERT: a", 45+1 == ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 12.0);
    },
    test9: function () {
        console.log("MetronomeTest 9");
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(11,3),
            new Beat(4,3),
            new Beat(4,3),
            new Beat(8,3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 20;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.ticks;
        console.log("ASSERT: a", 81+1 == ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 12.0);
    },
    test10: function () {
        console.log("MetronomeTest 10");
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(11,3),
            new Beat(4,3),
        ]);
        p1.addMeasures([m1]);
        m1 = new Measure();
        m1.addBeats([
            new Beat(8,3),
            new Beat(10,3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 20;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.ticks;
        console.log("ASSERT: a", 99+1 == ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 12.0);
    },
    test11: function () {
        console.log("MetronomeTest 11");
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(1,3)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 60;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.ticks;
        console.log("ASSERT: a", 3+1 == ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 1.0);
    },
    test12: function () {
        console.log("MetronomeTest 12");
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(3,4)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 20;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.ticks;
        console.log("ASSERT: a", 12+1 == ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 3.0);
    },
    test12: function () {
        console.log("MetronomeTest 12");
        var p1 = new LibraryPiece('n1','c1');
        var m1 = new Measure();
        m1.addBeats([
            new Beat(3,4),
            new Beat(7,4)
        ]);
        p1.addMeasures([m1]);
        var setting = p1.metronomeSetting;
        setting.classicTicksPerMinute = 20;
        setting.classicTicksPerBeat = 1;
        setting.isUseEntirePiece = true;

        LibraryPieceManager.insertLibraryPiece(p1);
        p1 = LibraryPieceManager.findLibraryPieceForNameComposer('n1','c1');
        LibraryPieceManager.removeLibraryPiece(p1);

        var ticks = p1.metronome.ticks;
        console.log("ASSERT: a", 40+1 == ticks.length);

        var ticksTime = ticks.map(function(each) {return each.waitSeconds}).reduce(function(prior,current) {return prior + current});
        console.log("ASSERT: b", Math.round(ticksTime*100)/100 == 6.0);
    }
});
