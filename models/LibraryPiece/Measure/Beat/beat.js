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
    get tick_amount() {
        return this._tick_amount = this._tick_amount || Mathjs_local.lcm(this.rightHand, this.leftHand);
    },
    ticksForWaitSeconds: function(waitSeconds) {
        var ticks = this._rawTicksForWaitSeconds(waitSeconds);
        this.embellishTicks(ticks);
        return ticks;
    },
    _rawTicksForWaitSeconds: function(waitSeconds) {
        var first = this._firstTickForWaitSeconds(waitSeconds);
        var remaining = this._remainingTicksForWaitSeconds(waitSeconds);
        return [first].concat(remaining);
    },
    _firstTickForWaitSeconds: function(waitSeconds) {
        return new BeatFirstTick(this, waitSeconds);
    },
    _remainingTicksForWaitSeconds: function(waitSeconds) {
        return _.range(2, this.tick_amount).map(function(each) {
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
        var interval = this.tick_amount / amount;
        var index = 0;
        var indicies = [];
        while (index < this.tick_amount) {
            indicies.push(index);
            index += interval;
        };
        return indicies;
    },
    get displayString() {
        return '{' + this.rightHand + ',' + this.leftHand + '}';
    },
    onStarted: function() {
        this.metronome.currentBeat = this;
        console.log("beat onStarted", this.displayString); ////////////////////////////////////
    },
    get metronome() {
        return this.metronomeSetting.metronome;
    }
};

EJSON.addType(className, Beat.fromJSONValue);