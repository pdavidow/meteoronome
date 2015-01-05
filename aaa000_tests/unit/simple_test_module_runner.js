// unnecessarily complicated to test programming skill :)

SimpleTestModuleRunner = (function() {
    var _testModules = function() {
        return [ // AbstractSimpleTestModule subtypes
            TickTestModule,
            MetronomeTestModule
        ];
    };
    var _run = function() {
        _testModules().forEach(function(each) {
            each.run();
        })
    };

    return {
        run: _run
    }
})();