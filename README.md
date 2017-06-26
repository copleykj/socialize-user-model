# User Model #

A model for a user which contains useful methods and can be extended by other packages by extending it's prototype to add methods that add functionality that are pertinent to their purpose. For example the socialize:friendships package extends the user model to provide helpers which return friend requests and friends for the user.

## Supporting the Project ##
In the spirit of keeping this and all of the packages in the [Socialize](https://atmospherejs.com/socialize) set alive, I ask that if you find this package useful, please donate to it's development.

[Bitcoin](https://www.coinbase.com/checkouts/4a52f56a76e565c552b6ecf118461287) / [Patreon](https://www.patreon.com/user?u=4866588) / [Paypal](https://www.paypal.me/copleykj)

## Installation ##

```
meteor add socialize:user-model
```

## Basic Usage ##

> __Note__
>    
> _This package completely disables updates to the users collection from the client to remove the ability of users to arbitrarily update the profile field on the user document._

Once you have installed the package using it is rather simple. Because the `User` class is a decendent of `BaseModel`, the users collection is attached to the class, so `Meteor.users.findOne` will return an instance of the class, and the cursor returned from `Meteor.users.find` will return instances of the class when iterated over.

Once you have an instance of the `User` class, you can then call it's methods.

```javascript
let user = Meteor.user();

user.displayName(); // => "You"

user.isSelf(user); // => true

user.defaultEmail(); // => "something@example.com"
```

## Extending ##

The user model is made to be extended with custom methods, and some of the other packages in the `Socialize` set do this already. If you wish to extend it for your application or a package, this is made simple using `BaseModel`'s `methods` method.

```javascript
User.methods({
    profile:function(){
        // `this` will be bound to the current User instance
        return ProfilesCollection.findOne({userId:this._id})
    }
});
```

## Advanced Usage ##

The `User` class extends the `LinkParent` class provided by _socialize:linkable-model_. This allows you to extend the `User` class using linkable packages such as _socialize:likeable_, _socialize:commentable_, and _socialize:postable_.

For example you could create a user that would allow other users to add posts to it.

```javascript
import { PostableModel } from 'meteor/socialize:postable';
import { Profile } from 'meteor/socialize:user-profile';
import { LinkableModel } from 'meteor/socialize:linkable-model';

export class PostableUser extends PostableModel(Profile){
    constructor(document){
        super(document);
    }
}

PostableUser.updateTransformFunction();

LinkableModel.registerParentModel(PostableUser);
```
