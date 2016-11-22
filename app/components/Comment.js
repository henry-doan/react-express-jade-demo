import React, {Component} from 'react';
import $ from 'jquery';

class Comment extends React.Component{
	constructor(props) {
		super(props);
		this.state = { edit: false }
		this.toggleEdit = this.toggleEdit.bind(this);
		this.editComment = this.editComment.bind(this);
	}

	edit() {
		return(
			<div>
				<h2>{this.props.author}</h2>
				<input ref='editAuthor' defualtValue={this.props.author} />
				<input ref='editContent' defualtValue={this.props.content} />
				<button onClick={this.toggleEdit}>Cancel</button>
				<button onClick={this.editComment}>Save</button>
			</div>
		);
	}

	toggleEdit() {
		this.setState({ edit: !this.state.edit});
	}

	editComment() {

		$.ajax({
			url: `/comments/${this.props._id}`,
			type: 'PUT',
			dataType: 'JSON',
			data: { author: this.refs.editAuthor.value, content: this.refs.editContent.value }
		}).done( comment => {
		 	this.toggleEdit();
		 	this.props.refresh();
		}).fail( msg => {
		 console.log(msg);
		});
 	}

	comment() {
		return(
			<div onClick={this.toggleEdit}>
				<h2>{this.props.author}</h2>
				<h4>{this.props.content}</h4>
				<p>{moment(this.props.updated_at).format("MM/DD/YYYY")}</p>
			</div>
		);
	}

	render() {
		if(this.state.edit)
			return this.edit();
		else
			return this.comment();
	}
}
