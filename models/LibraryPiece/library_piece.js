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
    var libraryPiece =  new LibraryPiece(
        value.name,
        value.composer,
        value.catalogReference
    );
    var measures = value.measures.map(function(each) {
        return Measure.fromJSONValue(each);
    });
    libraryPiece.addMeasures(measures);
    //libraryPiece.publicationDate = Date.parse(value.publicationDateString);  todo needs work
    libraryPiece.metronomeSetting = MetronomeSetting.fromJSONValue(value.metronomeSetting);
    return libraryPiece;
};

LibraryPiece.prototype = {
    typeName: function() {
        return className;
    },
    /*
    clone: function() { // todo: temp
        return _.clone(this);
    },
    equals: function(other) { //todo: temp
        return _.isEqual(this, other);
    },
    */
    toJSONValue: function() {
        return {
            name: this.name,
            composer: this.composer,
            catalogReference: this.catalogReference,
            measures: this.measures.map(function(each) {
                return each.toJSONValue();
            }),
            //publicationDateString: this.publicationDate.toISOString(),
            metronomeSetting: (this.metronomeSetting.toJSONValue())
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
    set metronomeSetting(setting) {
        setting.piece = this;
        this._metronomeSetting = setting;
    },
    get publicationDate() {
        return this._publicationDate = this._publicationDate || new Date();
    },
    set publicationDate(date) {
        this._publicationDate = date;
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
    },
    displayString: function () {
        var value, result;
        result = this.composer + ', ' + this.name;
        if (value = this.catalogReference) {result += ', ' + value};
        //result += '[';
        //this.measures.forEach(function(each) {result += each.displayString() + ', '});
        //result.slice(-2); //slice off trailing comma
        //result += ']';
        return result;
    }
};