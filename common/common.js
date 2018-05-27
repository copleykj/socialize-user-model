/* global Package */
/* eslint-disable import/no-unresolved */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { LinkableModel, LinkParent } from 'meteor/socialize:linkable-model';
/* eslint-enable import/no-unresolved */

import construct from './user-model.js';

const { User, UsersCollection } = construct({ Meteor, Package, check, LinkableModel, LinkParent });

export { User, UsersCollection };
