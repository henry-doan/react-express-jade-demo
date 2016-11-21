'use strict';

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

router.get('/', (req, res) => {
	Comment.find({}, null, {sort: '-updated_at'}, ( err, comments) => {
		res.json(comments);
	});
});

router.post('/', (req, res) => {
	new Comment({
		author: req.body.author,
		content: req.body.content,
		updated_at: Date.now()
	}).save( (err, comment) => {
		res.json(comment);
	});
});

router.put('/:id', (req, res) => {
	Comment.findByIdAndUpdate(
		req.params.id,
		{ $set: { content: req.body.content }},
		function(err, comment) {
			res.json(comment);
		});
});

module.exports = router;