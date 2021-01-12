import { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';
import PostDetails from './PostDetails';
// import PropTypes from 'prop-types';

class PostList extends Component {
  // static propTypes = {
  //   post: PropTypes.object.isRequired,
  //   getPosts: PropTypes.func.isRequired,
  // }
  componentDidMount() {
    this.props.getPosts();
  }

  render() { 
    const { posts } = this.props.post;
    return (
      <div>
      { posts.length ? (
        posts.map( post => <PostDetails key={post._id} post={post} />)
      ) : 'No post yet...' }
    </div> 
    );
  }
}

const mapstateToProps = state => ({
  post: state.post
});

export default connect(mapstateToProps, { getPosts })(PostList);