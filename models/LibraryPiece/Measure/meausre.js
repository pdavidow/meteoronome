var className = "Measure";

Measure = function() {
};

Measure.fromJSONValue = function(value) {
    var measure = new Measure();
    var beats = value.beats.map(function(each) {
        return Beat.fromJSONValue(each);
    });
    measure.addBeats(beats);
    return measure;
};

Measure.prototype = {
    typeName: function() {
        return className;
    },
    toJSONValue: function() {
        return {
            beats: this.beats.map(function(each) {
                return each.toJSONValue();
            })
        };
    },
    get piece() {
        return this._piece;
    },
    set piece(piece) {
        check(piece, LibraryPiece);
        this._piece = piece;
    },
    get metronomeSetting() {
        return this.piece.metronomeSetting;
    },
    get beats() {
        return this._beats = this._beats || [];
    },
    addBeat: function(beat) {
        check(beat, Beat);
        beat.measure = this;
        this.beats.push(beat);
    },
    addBeats: function(beats) {
        var that = this;
        beats.forEach(function(each) {
            that.addBeat(each); // ES6 fat arrow
        });
    },
    get displayIndex() {
        return IndexAdaptor.shiftUp(this.index);
    },
    get index() {
        return this.piece.measures.indexOf(this);
    },
    displayString: function () {
        var result;
        result = '[';
        this.beats.forEach(function (each) {
            result += each.displayString() + ','
        });
        result.slice(-1); //slice off trailing comma
        result += ']';
        return result;
    }
};