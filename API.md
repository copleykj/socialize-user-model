# User() - Extends LinkParent #

## Instance Methods ##

__User.prototype.displayName()__ - A representation of the user. "You" if the instance is the same as the current user, instance.username otherwise.

__User.prototype.isSelf(user)__ - Checks if one user is another user by comparing \_id's.

__User.prototype.defaultEmail__ - Returns the first email address in the list of emails.
