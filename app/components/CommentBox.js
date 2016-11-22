import React, {Component} from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import $ from 'jquery';

class CommentBox extends React.Component{
	constructor(props) {
		super(props);
		this.state = { comments: [] };
		this.getAllComments = this.getAllComments.bind(this);
		this.addComment = this.addComment.bind(this);
	}

	componentWillMount() {
		this.getAllComments();
	}

	addComment(comment){
		this.setState({ comments: [comment, ...this.state.comments] });
	}

	getAllComments() {
		$.ajax({
			url: '/comments',
			typr: 'GET',
			dataType: 'JSON'
		}).done( comments => {
			this.setState({ comments: comments });
		}).fail( msg => {
			console.log(msg);
		});
	}

	render() {
		return(
			<div className='commentBox'>
				<CommentForm addComment={this.addComment}/>
				<h1>Comments</h1>
				<CommentList refresh={this.getAllComments} comments={this.state.comments} />
			</div>
		);
	}
}

export default CommentBox