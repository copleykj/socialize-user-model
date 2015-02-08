/**
 * Represents a User
 * @class User
 * @param {Object} document An object representing a conversation ususally a Mongo document
 */
User = BaseModel.extend();

/**
 * The personal name of the user account, You if the the user represents the
 * currently logged in user, or this.username otherwise
 * @method name
 * @returns {S} A name representation of the user account
 */
User.prototype.displayName = function () {
    return this.isSelf() ? "You" : this.username;
};

/**
 * Check if the this user is the current logged in user or the specified user
 * @method isSelf
 * @param   {Object}  user The user to check against
 * @returns {Boolean} Whether or not this user is the same as the specified user
 */
User.prototype.isSelf = function (user) {
    var userId = user && user._id || Meteor.userId();

    if(this._id === userId){
        return true;
    }
};

/**
 * Get the default email address for the user
 * @method defaultEmail
 * @returns {String} The users default email address
 */
User.prototype.defaultEmail = function () {
    return this.emails && this.emails[0].address;
};

//Assign a reference from Meteor.users to User.prototype._collection so BaseModel knows how to access it
User.prototype._collection = Meteor.users;

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Meteor.users._transform = function (document) {
    return new User(document);
};
