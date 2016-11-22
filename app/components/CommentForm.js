import React, {Component} from 'react';
import $ from 'jquery';

class CommentForm extends React.Component{
	constructor(props) {
		super(props);
		this.addComment = this.addComment.bind(this);
	}

	addComment(e) {
		e.preventDefault();
		$.ajax({
			url: '/comments',
			type: 'POST',
			dataType: 'JSON',
			data: { author: this.refs.author.value, content: this.refs.content.value }
		}).done( comment => {
			this.props.addComment(comment);
			this.refs.form.reset();
		}).fail( msg => {
			console.log(msg);
		});
	}

	render() {
		return(
			<div>
				<form ref='form' onSubmit={this.addComment}>
					<input ref='author' placeholder='author' />
					<input ref='content' placeholder='content'/>
					<button type='submit'>Add Comment</button>
				</form>
			</div>
		);
	}
}

export default CommentForm;