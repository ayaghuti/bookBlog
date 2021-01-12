import React from 'react';
import { Container } from 'reactstrap';
import PostList from '../posts/PostList';
import JumbotronC from './Jumbotron';

const Dashboard = () => {

  return (
    <Container>
      <JumbotronC />
      <PostList />
    </Container>    
  );

}
 
export default Dashboard;