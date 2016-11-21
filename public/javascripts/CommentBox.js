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
				<input ref='editContent' defualtValue={this.props.content} />
				<button onClick={() => this.toggleEdit}>Cancel</button>
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
			data: { content: this.refs.editContent.value }
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

ReactDOM.render(<CommentBox />, document.getElementById('content'));
