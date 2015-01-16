DuplicateFound_Exception = function(id) {
    check(id, String);
    this.id = id;
};

DuplicateFound_Exception.prototype = Object.create(Metronome_Exception.prototype);
DuplicateFound_Exception.prototype.constructor = DuplicateFound_Exception;