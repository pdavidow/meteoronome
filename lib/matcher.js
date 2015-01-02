Matcher = {
    nonEmptyString: Match.Where(function(x) {
        check(x, String);
        return x.length > 0;
    }),
    positiveInteger: Match.Where(function(x) {
        check(x, Match.Integer);
        return x > 0;
    }),
    nonNegativeNumber: Match.Where(function(x) {
        check(x, Number);
        return x >= 0;
    })
};