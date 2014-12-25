// lifted from https://github.com/josdejong/mathjs

Mathjs_local = {
    lcm: function(arg0, arg1) {
        // https://github.com/josdejong/mathjs/blob/454efa15dc607bb7413a35d74a6f013c5d72f8ec/lib/function/arithmetic/lcm.js
        check(arg0, Match.Integer);
        check(arg1, Match.Integer);

        var a = arg0,
            b = arg1,
            t;

        if (a == 0 || b == 0) {
            return 0;
        };

        // http://en.wikipedia.org/wiki/Euclidean_algorithm
        // evaluate lcm here inline to reduce overhead
        var prod = a * b;
        while (b != 0) {
            t = b;
            b = a % t;
            a = t;
        }
        return Math.abs(prod / a);
    }
}
