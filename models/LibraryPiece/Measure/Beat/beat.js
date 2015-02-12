var className = "Beat";

Beat = function(rightHand, leftHand) {
    check(rightHand, Matcher.positiveInteger);
    check(leftHand, Matcher.positiveInteger);

    this.rightHand = rightHand;
    this.leftHand = leftHand;
};

Beat.fromJSONValue = function(value) {
    return new Beat(
        value.rightHand,
        value.leftHand
    );
};

Beat.prototype = {
    typeName: function() {
        return className;
    },
    toJSONValue: function() {
        return {
            rightHand: this.rightHand,
            leftHand: this.leftHand
        };
    },
    get measure() {
        return this._measure;
    },
    set measure(measure) {
        check(measure, Measure);
        this._measure = measure;
    },
    get metronomeSetting() {
        return this.measure.metronomeSetting;
    },
    get ticks() {
        return this._ticks = this._ticks || this.metronomeSetting.ticksForBeat(this);
    },
    resetTicks: function() {
        this._ticks = null;
    },
    get tickAmount() {
        return this._tickAmount = this._tickAmount || Mathjs_local.lcm(this.rightHand, this.leftHand);
    },
    ticksForWaitSeconds: function(waitSeconds) {
        var ticks = this.rawTicksForWaitSeconds(waitSeconds);
        this.embellishTicks(ticks);
        return ticks;
    },
    rawTicksForWaitSeconds: function(waitSeconds) {
        var first = this.firstTickForWaitSeconds(waitSeconds);
        var remaining = this.remainingTicksForWaitSeconds(waitSeconds);
        return [first].concat(remaining);
    },
    firstTickForWaitSeconds: function(waitSeconds) {
        return new BeatFirstTick(this, waitSeconds);
    },
    remainingTicksForWaitSeconds: function(waitSeconds) {
        return _.range(2, this.tickAmount + 1).map(function(each) {
            return new Tick(waitSeconds);
        });
    },
    embellishTicks: function(ticks) {
        this.rightHandIndicies.forEach(function(each) {
            ticks[each].isRightHand = true;
        });
        this.leftHandIndicies.forEach(function(each) {
            ticks[each].isLeftHand = true;
        });
        this.classicIndicies.forEach(function(each) {
            ticks[each].isClassic = true;
        });
    },
    get rightHandIndicies() {
        return this._rightHandIndicies = this._rightHandIndicies || this.spacedIndiciesForAmount(this.rightHand);
    },
    get leftHandIndicies() {
        return this._leftHandIndicies = this._leftHandIndicies || this.spacedIndiciesForAmount(this.leftHand);
    },
    get classicIndicies() {
        return this._classicIndicies = this._classicIndicies || this.spacedIndiciesForAmount(this.metronomeSetting.classicTicksPerBeat);
    },
    spacedIndiciesForAmount: function(amount) {
        var interval = this.tickAmount / amount;
        var index = 0;
        var indicies = [];
        while (index < this.tickAmount) {
            indicies.push(index);
            index += interval;
        }
        return indicies;
    },
    get description() {
        return '{' + this.rightHand.toString() + ',' + this.leftHand.toString() + '}';
    },
    get displayLocationDescription() {
        return this._displayLocationDescription = this._displayLocationDescription || (
            "Beat " + this.displayIndex.toString() + " " + this.description +
            ", Measure " + this.displayMeasureIndex.toString()
        );
    },
    resetDisplayLocationDescription: function() {
        this._displayLocationDescription = null;
    },
    get displayMeasureIndex() {
        return this.measure.displayIndex;
    },
    get displayIndex() {
        return IndexAdaptor.shiftUp(this.index);
    },
    get index() {
        return this.measure.beats.indexOf(this);
    },
    onStarted: function() {
        this.metronome.currentBeat = this;
        console.log("beat onStarted", this.displayLocationDescription);
    },
    get metronome() {
        return this.metronomeSetting.metronome;
    },
    displayString: function () {
        return this.description;
    },
    reset: function() {
        this.resetTicks();
        this.resetDisplayLocationDescription();
    },
    loadDisplayCaches: function() {
        this.resetDisplayLocationDescription(); // thus don't have to rely on prior reset, play it safe
        this.displayLocationDescription;
    }
};