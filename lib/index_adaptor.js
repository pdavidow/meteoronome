IndexAdaptor = (function() {
    var _offset = 1;

    var _shiftUp = function(value) {
        return value + _offset;
    };
    var _shiftDown = function(value) {
        return value - _offset;
    };

    return {
        shiftUp: _shiftUp,
        shiftDown: _shiftDown
    };
})()
