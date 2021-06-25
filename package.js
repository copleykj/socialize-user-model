/* global Package */

Package.describe({
    name: 'socialize:user-model',
    summary: 'A social user package',
    version: '1.0.5',
    git: 'https://github.com/copleykj/socialize-user-model.git',
});

Package.onUse(function _(api) {
    api.versionsFrom(['1.10.2', '2.3']);

    api.use([
        'socialize:linkable-model@1.0.5',
        'accounts-base',
    ]);

    api.use('accounts-password', { weak: true });

    api.imply(['socialize:linkable-model', 'accounts-base']);

    api.mainModule('common/common.js');
});
