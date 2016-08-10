'use strict';

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema;

const AdminUser = new UserSchema({
  email: String
});

module.exports = AdminUser;
