/* eslint-disable import/no-unresolved */
import SimpleSchema from 'simpl-schema';
/* eslint-enable import/no-unresolved */


export default ({ Meteor, Package, check, LinkableModel, LinkParent }) => {
    /**
    * Represents a User
    * @class User
    * @param {Object} document An object representing a user ususally a Mongo document
    */
    class User extends LinkParent { //eslint-disable-line
        static fieldsToPublish = { username: true };

        static addFieldsToPublish(fieldsObj) {
            Object.assign(this.fieldsToPublish, fieldsObj);
        }

        /**
        * The personal name of the user account, You if the the user represents the
        * currently logged in user, or this.username otherwise
        * @returns {String} A name representation of the user account
        */
        displayName() {
            return this.isSelf() ? 'You' : this.username;
        }

        /**
        * Check if the this user is the current logged in user or the specified user
        * @param   {Object}  user The user to check against
        * @returns {Boolean} Whether or not this user is the same as the specified user
        */
        isSelf(user) {
            const userId = (user && user._id) || Meteor.userId();

            return this._id === userId;
        }
    }

    User.attachCollection(Meteor.users);

    const UsersSchema = new SimpleSchema({
        username: {
            type: String,
            // For accounts-password, either emails or username is required, but not both. It is OK to make this
            // optional here because the accounts-password package does its own validation.
            // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
            optional: true,
        },
        emails: {
            type: Array,
            // For accounts-password, either emails or username is required, but not both. It is OK to make this
            // optional here because the accounts-password package does its own validation.
            // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
            optional: true,
        },
        'emails.$': {
            type: Object,
        },
        'emails.$.address': {
            type: String,
            regEx: SimpleSchema.RegEx.Email,
        },
        'emails.$.verified': {
            type: Boolean,
        },
        'emails.$.default': {
            type: Boolean,
            optional: true,
        },
        createdAt: {
            type: Date,
        },
        // Make sure this services field is in your schema if you're using any of the accounts packages
        services: {
            type: Object,
            optional: true,
            blackbox: true,
        },
        heartbeat: {
            type: Date,
            optional: true,
        },
    });

    User.attachSchema(UsersSchema);

    LinkableModel.registerParentModel(User);


    if (Package['accounts-password']) {
        Meteor.methods && Meteor.methods({
            /**
            * Sets the default email for the currently logged in users
            * @param {String} emailAddress The email address to set as the current
            */
            setDefaultEmail(emailAddress) {
                check(emailAddress, String);
                if (this.userId) {
                    const user = Meteor.users.findOne({ _id: this.userId, 'emails.address': emailAddress });
                    if (user) {
                        Meteor.users.update({ _id: this.userId, 'emails.default': true }, { $set: { 'emails.$.default': false } });
                        Meteor.users.update({ _id: this.userId, 'emails.address': emailAddress }, { $set: { 'emails.$.default': true } });
                    }
                } else {
                    throw new Meteor.Error('NotAuthorized', 'You must be logged in to perform this operation.');
                }
            },
        });

        User.methods({
            /**
            * Set the default email address for the user
            * @param {[type]} emailAddress [description]
            */
            setDefaultEmail(emailAddress) {
                if (Meteor.user().isSelf()) {
                    Meteor.call('setDefaultEmail', emailAddress);
                }
            },
            /**
            * Get the default email address for the user
            * @returns {String} The users default email address
            */
            defaultEmail() {
                const obj = this.emails.find(rec => rec.default === true);
                return (obj && obj.address) || this.emails[0].address;
            },
        });
    }

    return User;
};
