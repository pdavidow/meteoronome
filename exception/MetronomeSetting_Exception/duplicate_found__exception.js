DuplicateFound_Exception = function(duplicate) {
    this.duplicate = duplicate;
};

DuplicateFound_Exception.prototype = Object.create(Metronome_Exception.prototype);
DuplicateFound_Exception.prototype.constructor = DuplicateFound_Exception;