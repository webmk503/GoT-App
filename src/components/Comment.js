import React, {Component} from 'react';
import {Form, Button} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import '../styles/global.css';
import {updateAuthor, updateComments} from "../utils/localStorage";
import DateOptions from '../HOC/DateOptions';

class Comment extends Component {

  state = {
    commentsAuthor: '',
    comment: '',
  };

  componentWillMount() {
    const {loggedUser,} = this.props;
    this.setState({
      commentsAuthor: loggedUser.nickname,
    })
  }

  handleEditText = (field) => (e) => {
    this.setState({
      [field]: e.target.value,
    });
  };

  creating = () => {
    const { createComment, createAuthor, id} = this.props;
    const newAuthor = {
      id: Math.random(),
      name: this.state.commentsAuthor,
    };
    const newComment = {
      id: Math.random(),
      comment: this.state.comment,
      bookId: id,
      authorId: newAuthor.id
    };

    createAuthor(newAuthor);
    createComment(newComment);
    updateComments(newComment);
    updateAuthor(newAuthor);
  };

  handleCreatingCommentAndAuthor = () => {
    const {authors, createComment, id} = this.props;
    const author = Object.values(authors).find((author) => (author.name === this.state.commentsAuthor));
    if (this.state.comment.length > 0 && !author) {
      this.creating();
    } else {
      const newComment = {
        id: Math.random(),
        comment: this.state.comment,
        bookId: id,
        authorId: author.id,
      };
      createComment(newComment);
      updateComments(newComment);
    }
    this.setState({
      comment: '',
    });
  };

  render() {
    return (
      <div>
        <Form.TextArea
          autoHeight
          placeholder='Enter a commentary'
          value={this.state.comment}
          onChange={this.handleEditText('comment')}
        />
        <Button
          content='Add Reply'
          onClick={this.handleCreatingCommentAndAuthor}
          labelPosition='left'
          icon='edit'
          primary
        />
      </div>
    );
  }
}

Comment.propTypes = {
  createComment: PropTypes.func,
  loggedUser: PropTypes.object,
  createAuthor: PropTypes.func,
  id: PropTypes.string,
  authors: PropTypes.object,
};

export default DateOptions(Comment);
