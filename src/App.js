import { Container, Typography } from '@mui/material';
import ProductForm from './components/ProductForm';

function App() {
  return (
    <>
      <Container>
        <Container sx={
          {
            border: '1px solid lightgray',
            borderRadius: '5px',
            padding: '40px',
            margin: '50px auto',
          }
        } >
          <Typography variant="h3" component="h3" gutterBottom>
            Add Product Form
          </Typography>
          <Typography variant="body1" gutterBottom mb={4}>
            This form is used to add a new product or edit an existing product.
          </Typography>
          <ProductForm />
        </Container>
      </Container>
    </>
  );
}

export default App;
