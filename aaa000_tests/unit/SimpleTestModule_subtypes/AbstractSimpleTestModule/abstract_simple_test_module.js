AbstractSimpleTestModule = {
    run: function() {
        for (funcName in this) {
            if (this.hasOwnProperty(funcName)) {
                var func = this[funcName];
                console.log("--------------", funcName);
                func();
            }
        }
    }
};
