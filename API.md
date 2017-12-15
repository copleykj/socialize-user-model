# User() - Extends LinkParent #

## Static Methods ##

**addFieldsToPublish(fieldsObj)** - Takes an object of fields, each with a true/false value signifying whether to publish that field from the user document. Whenever packages in the Socialize set publish records from the user collection, the fields defined here will be published. Any fields previously defined will be overwritten by subsequent ones specified in calls to this function. By default the only field that will be published is the username.

```javascript
import { User } from  'meteor/socialize:user-model';

User.addFieldsToPublish({
    status: true,
    avatar: true,
});
```

## Static Properties ##

**fieldsToPublish** - An object containing a fields definition meant to be passed to a mongo query when publishing user documents.

```javascript
import { User } from 'meteor/socialize:user-model';

Meteor.publish('usersWithRestrictedFields', function(){
    return Meteor.users.find({}, { fields: User.fieldsToPublish })
})
```

## Instance Methods ##

**displayName()** - A representation of the user. "You" if the instance is the same as the current user, instance.username otherwise.

**isSelf(user)** - Checks if one user is another user by comparing \_id's.

**defaultEmail** - Returns the first email address in the array of users emails emails.
