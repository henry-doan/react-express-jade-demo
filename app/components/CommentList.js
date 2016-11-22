import React, {Component} from 'react';
import Comment from './Comment';

class CommentList extends React.Component{
	constructor(props){
		super(props);
	}

	render() {
		let comments = this.props.comments.map( comment => {
			let id = comment._id;
			return(<Comment refresh={this.props.refresh} key={id} id={id} {...comment} />);
		});

		return(
			<div>
				{ comments }
			</div>
		);
	}
}

export default CommentList;