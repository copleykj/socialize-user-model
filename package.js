Package.describe({
    name: "socialize:user-model",
    summary: "A social user package",
    version: "0.1.2",
    git: "https://github.com/copleykj/socialize-user-model.git"
});

Package.onUse(function(api) {
    api.versionsFrom("1.0.2.1");

    api.use([
        "socialize:base-model@0.2.0",
        "accounts-base"
    ]);

    api.imply(["socialize:base-model", "accounts-base"]);

    //Add the user-model files
    api.addFiles("common/user-model.js");

    api.export("User");
});
