const Post = require('../models/Post');
const mongoose = require('mongoose');

const getPosts = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(404).json({ messsage: error.message }));
}

const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post(post);
  if(!newPost.title || !newPost.author || !newPost.message) {
    return res.status(400).json({ message: 'Please enter all feilds' });
  }
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  try {
    if(!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ message: 'No post with that id'});
    }

    const updatedPost = await Post
      .findByIdAndUpdate(_id, {...post, _id }, { new: true, useFindAndModify: false });
    
    res.json(updatedPost);
  } catch(error) { 
    res.status(404).json({ message: 'Update failed' })
  }
}

const likePost = async (req, res) => {
  const { id } = req.params;
  
  try {
    const found = await Post.findById(id);
    let likes = null;
    if(found.likes.find(like => like._id.toString() === req.user.id)) {
      likes = found.likes.filter(like => like._id.toString() !== req.user.id);
      // console.log(likes);
      found.likes = [...likes];
    } else {
      found.likes.unshift(req.user.id);
    }
    // console.log(found);
    updated = await Post.findByIdAndUpdate(id, found, { new: true, useFindAndModify: false });
    res.json(updated);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Success fail'});
    
  }
}

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send('No post with that id');
    } 
    
    await Post.findByIdAndRemove(id);
  
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(409).json({ message: 'Failed to delete' });
  }
}


module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost
}