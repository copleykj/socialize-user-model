/* eslint-disable import/no-unresolved */
import Meteor from '@socialize/react-native-meteor';
import { LinkableModel, LinkParent } from '@socialize/linkable-model';
/* eslint-enable import/no-unresolved */

import construct from './common/user-model.js';

const Package = {
    'accounts-password': {},
};

const { User, UsersCollection } = construct({ Meteor, Package, LinkableModel, LinkParent });

export { User, UsersCollection };
