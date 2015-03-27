var isRunTests = true;

Meteor.startup(function () {
    if (Meteor.isClient) {
        Audio.initializeSound_onFinishedLoading(function () {
            console.log("audio finished loading");
        });
        //if (isRunTests) {SimpleTestModuleRunner.run()};
        //Librarian.ensureLibraryLoaded();
        Librarian.reset();
    }
})

