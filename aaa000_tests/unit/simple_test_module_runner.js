SimpleTestModuleRunner = (function() {
    var _testModules = function() {
        return {
            TickTestModule: TickTestModule,
            MetronomeTestModule: MetronomeTestModule,
            MetronomeSettingTestModule: MetronomeSettingTestModule
        };
    };
    var _run = function() {
        var moduleDict = _testModules();
        for (moduleKey in moduleDict) {
            if (moduleDict.hasOwnProperty(moduleKey)) {
                var module = moduleDict[moduleKey];
                console.log("==============", moduleKey);
                module.run();
            }
        }
        console.log("==============");
        console.log("==============");
    };

    return {
        run: _run
    }
})();