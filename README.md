# User Model

A model for a user which contains useful methods and can be extended by other packages by extending it's prototype to add methods that add functionality that are pertinent to their purpose. For example the socialize:friendships package extends the user model to provide helpers which return friend requests and friends for the user.

>This is a [Meteor][meteor] package with part of it's code published as a companion NPM package made to work with React Native. This allows your Meteor and React Native projects that use this package to share code between them to give you a competitive advantage when bringing your mobile and web application to market.

<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->
- [Supporting The Project](#supporting-the-project)
- [Meteor Installation](#meteor-installation)
- [React Native Installation](#react-native-installation)
- [Basic Usage](#basic-usage)
- [Extending](#extending)
- [Advanced Usage](#advanced-usage)
<!-- /TOC -->

## Supporting The Project

Finding the time to maintain FOSS projects can be quite difficult. I am myself responsible for over 30 personal projects across 2 platforms, as well as Multiple others maintained by the [Meteor Community Packages](https://github.com/meteor-community-packages) organization. Therfore, if you appreciate my work, I ask that you either sponsor my work through GitHub, or donate via Paypal or Patreon. Every dollar helps give cause for spending my free time fielding issues, feature requests, pull requests and releasing updates. Info can be found in the "Sponsor this project" section of the [GitHub Repo](https://github.com/copleykj/socialize-user-model)

## Meteor Installation

This package relies on the npm package `simpl-schema` so when using it with meteor, you will need to make sure it is installed as well.

```shell
meteor npm install --save simpl-schema
meteor add socialize:user-model
```

## React Native Installation

When using this package with React Native, the dependency tree ensures that `simpl-schema` is loaded so there's no need to install it as when using within Meteor.

```shell
npm install --save @socialize/user-model
```

> **Note**
>
> When using with React Native, you'll need to connect to a server which hosts the server side Meteor code for your app using `Meteor.connect` as per the [@socialize/react-native-meteor](https://www.npmjs.com/package/@socialize/react-native-meteor#example-usage) documentation.

## Basic Usage

Once you have installed the package using it is rather simple. Because the `User` class is a descendant of `BaseModel`, the users collection is attached to the class, so `Meteor.users.findOne` will return an instance of the class, and the cursor returned from `Meteor.users.find` will return instances of the class when iterated over.

Once you have an instance of the `User` class, you can then call it's methods.

```javascript
let user = Meteor.user();

user.displayName(); // => "You"

user.isSelf(user); // => true

user.defaultEmail(); // => "something@example.com"
```

## Extending

The user model is made to be extended with custom methods, and some of the other packages in the `Socialize` set do this already. If you wish to extend it for your application or a package, this is made simple using `BaseModel`'s static `methods` method.

First we import the `User` class for the environment we are developing in

```javascript
// Meteor Import
import { User } from 'meteor/socialize:user-model';
```

```javascript
// React Native Import
import { User } from '@socialize/user-model';
```

Then we extend the class for use in either environment.

```javascript
User.methods({
    profile:function(){
        // `this` will be bound to the current User instance
        return ProfilesCollection.findOne({userId:this._id})
    }
});
```

## Advanced Usage

The `User` class extends the `LinkParent` class provided by _socialize:linkable-model_. This allows you to extend the it using linkable packages such as _socialize:likeable_, _socialize:commentable_, and _socialize:postable_.

For example you could create a custom User class that would allow other users to add likes to it and bookmark that user as someone they are interested in.

To do this we'll first import the necessary classes depending on if we are in a Meteor or React Native environment.

```javascript
// Meteor Imports
import { LikeableModel } from 'meteor/socialize:likeable';
import { User } from 'meteor/socialize:user-model';
import { LinkableModel } from 'meteor/socialize:linkable-model';
```

```javascript
// Meteor Imports
import { LikeableModel } from '@socialize/likeable';
import { User } from '@socialize/user-model';
import { LinkableModel } from '@socialize/linkable-model';
```

Then we can write the rest of our code to be used in either Meteor or React Native

```javascript
export class MyAwesomeUser extends LikeableModel(User){}

//attach the LikeableSchema so the likeCount can be stored on the user
MyAwesomeUser.attachSchema(LikeableModel.LikeableSchema);
//update the transform function so LikeableUser's are returned when we call find or findOne on the users collection
MyAwesomeUser.updateTransformFunction();
//register MyAwesomeUser as a LinkParent
LinkableModel.registerParentModel(MyAwesomeUser);
```

For a more in depth explanation of how to use this package see [API.md](api)

[meteor]: https://meteor.com
[socialize]: https://atmospherejs.com/socialize
[api]: https://github.com/copleykj/socialize-user-model/blob/master/API.md
