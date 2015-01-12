MetronomeSetting_Exception = function(message) {
    Metronome_Exception.call(this, message);
};

MetronomeSetting_Exception.prototype = Object.create(Metronome_Exception.prototype);
MetronomeSetting_Exception.prototype.constructor = MetronomeSetting_Exception;