var className = "Measure";

Measure = function() {
};

Measure.fromJSONValue = function(value) {
    var beats = EJSON.fromJSONValue(value.beats);
    var measure = new Measure();
    measure.addBeats(beats);
    return measure;
};

Measure.prototype = {
    typeName: function() {
        return className;
    },
    toJSONValue: function() {
        return {
            beats: EJSON.toJSONValue(this.beats)
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
        return this.index + Constants.displayIndexOffset;
    },
    get index() {
        return this.piece.measures.indexOf(this);
    }
    /*,
     displayString: function () {
     var result;
     result = '[';
     this.beats.forEach(function(each) {result += each.displayString() + ','});
     result.slice(-1); //slice off trailing comma
     result += ']';
     return result;
     }*/
};

EJSON.addType(className, Measure.fromJSONValue);