'username strict';

const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const Comment = new Schema({
	author: { type: String, required: true},
	content: { type: String, required: true},
	updated_at : Date
});

module.exports = mongoose.model( 'Comment', Comment );