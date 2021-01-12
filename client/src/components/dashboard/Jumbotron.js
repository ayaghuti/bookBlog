import { Jumbotron, Container } from 'reactstrap';

const JumbotronC = () => {
  return (
    <Container>
      <Jumbotron className="jtron">
        <h1 className="display-3">Welcome to BookBlog!</h1>
        <p className="lead">This is a place for exchanging information on books. Share your experience from books with others!</p>
      </Jumbotron>
    </Container>
  );
}
 
export default JumbotronC;