Package.describe({
    name: "socialize:user-model",
    summary: "A social user package",
    version: "1.0.0",
    git: "https://github.com/copleykj/socialize-user-model.git"
});

Package.onUse(function(api) {
    api.versionsFrom("1.3");

    api.use([
        "socialize:linkable-model@1.0.0",
        "accounts-base"
    ]);

    api.imply(["socialize:linkable-model", "accounts-base"]);

    api.mainModule("common/user-model.js");;
});
