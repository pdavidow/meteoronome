MetronomeSetting = function(classicTicksPerMinute, classicTicksPerBeat) {
    check(classicTicksPerMinute, Matcher.positiveInteger);
    check(classicTicksPerBeat, Matcher.positiveInteger);

    this.classicTicksPerMinute = classicTicksPerMinute;
    this.classicTicksPerBeat = classicTicksPerBeat;
};


