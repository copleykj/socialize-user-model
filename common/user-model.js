/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { LinkableModel, LinkParent } from 'meteor/socialize:linkable-model';
import SimpleSchema from 'simpl-schema';

/**
 * Represents a User
 * @class User
 * @param {Object} document An object representing a conversation ususally a Mongo document
 */
export class User extends LinkParent { //eslint-disable-line

    /**
    * The personal name of the user account, You if the the user represents the
    * currently logged in user, or this.username otherwise
    * @method name
    * @returns {String} A name representation of the user account
    */
    displayName() {
        return this.isSelf() ? 'You' : this.username;
    }

    /**
    * Check if the this user is the current logged in user or the specified user
    * @method isSelf
    * @param   {Object}  user The user to check against
    * @returns {Boolean} Whether or not this user is the same as the specified user
    */
    isSelf(user) {
        const userId = (user && user._id) || Meteor.userId();

        return this._id === userId;
    }

    /**
    * Get the default email address for the user
    * @method defaultEmail
    * @returns {String} The users default email address
    */
    defaultEmail() {
        return this.emails && this.emails[0].address;
    }

}

User.attachCollection(Meteor.users);

LinkableModel.registerParentModel(User);
