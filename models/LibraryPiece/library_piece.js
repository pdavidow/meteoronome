var className = "LibraryPiece";

LibraryPiece = function (name, composer, catalogReference) {
    catalogReference = catalogReference || "";

    check(name, Matcher.nonEmptyString);
    check(composer, Matcher.nonEmptyString);
    check(catalogReference, String);

    this.name = name;
    this.composer = composer;
    this.catalogReference = catalogReference;
};

LibraryPiece.fromJSONValue = function(value) {
    var measures = EJSON.fromJSONValue(value.measures);
    var libraryPiece =  new LibraryPiece(
        EJSON.fromJSONValue(value.name),
        EJSON.fromJSONValue(value.composer),
        EJSON.fromJSONValue(value.catalogReference)
    );
    libraryPiece.addMeasures(measures);
    return libraryPiece;
};

LibraryPiece.prototype = {
    typeName: function() {
        return className;
    },
    toJSONValue: function() {
        return {
            name: EJSON.toJSONValue(this.name),
            composer: EJSON.toJSONValue(this.composer),
            catalogReference: EJSON.toJSONValue(this.catalogReference),
            measures: EJSON.toJSONValue(this.measures)
        };
    },
    get measures() {
        return this._measures = this._measures || [];
    },
    addMeasure: function(measure) {
        check(measure, Measure);
        measure.piece = this;
        this.measures.push(measure);
    },
    addMeasures: function(measures) {
        var that = this;
        measures.forEach(function(each) {
            that.addMeasure(each); // ES6 fat arrow
        });
    },
    get metronome() {
      return this.metronomeSetting.metronome;
    },
    get metronomeSetting() {
        return this._metronomeSetting = this._metronomeSetting || new MetronomeSetting(this);
    },
    get beats() {
        return _.flatten(this.measures.map(function(each) {
            return each.beats;
        }));
    },
    startMetronome: function() {
        this.metronomeSetting.startMetronome();
    },
    stopMetronome: function() {
        this.metronomeSetting.stopMetronome();
    },
    reset: function() {
        this.beats.forEach(function(each) {
            each.reset();
        });
    },
    loadDisplayCaches: function() {
        this.beats.forEach(function(each) {
            each.loadDisplayCaches();
        });
    }

    /*,
    displayString: function () {
        var value, result;
        result = this.name + ', ' + this.composer;
        if (value = this.catalogReference) {result += ', ' + value};
        result += '[';
        this.measures.forEach(function(each) {result += each.displayString() + ', '});
        result.slice(-2); //slice off trailing comma
        result += ']';
        return result;
    }*/
};

EJSON.addType(className, LibraryPiece.fromJSONValue);