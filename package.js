Package.describe({
    name: "socialize:user-model",
    summary: "A social user package",
    version: "0.1.1",
    git: "https://github.com/copleykj/socialize-user-model.git"
});

Package.onUse(function(api) {
    api.versionsFrom("1.0.2.1");

    api.use([
        "meteor", "mongo", "underscore", "socialize:base-model@0.1.3",
        "accounts-base", "aldeed:simple-schema@1.3.2", "meteorhacks:unblock@1.1.0", 
        "aldeed:collection2@2.3.3", "matb33:collection-hooks@0.7.13"
    ]);

    //Add the user-model files
    api.addFiles("common/user-model.js");

    api.export("User");
});
