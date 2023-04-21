import React from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  TextareaAutosize,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Stack,
} from "@mui/material";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const ProductForm = () => {
  const formik = useFormik({
    initialValues: {
      productName: "",
      productDescription: "",
      productImages: [],
      productPrice: "",
      productAvailability: true,
      shippingInformation: "",
      productDimensions: "",
      productWeight: "",
      materialAndConstruction: "",
      productFeatures: "",
      relatedProducts: "",
      frequentlyAskedQuestions: "",
      warrantyInformation: "",
      returnPolicy: "",
    },
    validationSchema: Yup.object().shape({
      productName: Yup.string().required("Product name is required").max(15, "Product name must be less than 15 characters"),
      productDescription: Yup.string().required("Product description is required").max(50, "Product description must be less than 50 characters"),
      productPrice: Yup.number().required("Price is required").min(0, "Price must be greater than 0").max(1000000, "Price must be less than 100000"),
      productAvailability: Yup.boolean().required("Required"),
      shippingInformation: Yup.string().max(50, "Shipping information must be less than 50 characters"),
      productDimensions: Yup.string().max(20, "Product dimensions must be less than 20 characters"),
      productWeight: Yup.string().max(20, "Product weight must be less than 20 characters"),
      materialAndConstruction: Yup.string().max(50, "Material and construction must be less than 50 characters"),
      productFeatures: Yup.string().required("Product features are required").max(50, "Product features must be less than 50 characters"),
      relatedProducts: Yup.string().max(15, "Related products must be less than 50 characters"),
      frequentlyAskedQuestions: Yup.string().max(100, "Frequently asked questions must be less than 100 characters"),
      warrantyInformation: Yup.string().max(50, "Warranty information must be less than 50 characters"),
      returnPolicy: Yup.string().max(50, "Return policy must be less than 50 characters"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleImageUpload = (event) => {
    const files = event.target.files;
    formik.setFieldValue("productImages", [...formik.values.productImages, ...files]);
  };

  const handleEditorChange = (editorValue) => {
    formik.setFieldValue("frequentlyAskedQuestions", editorValue);
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container style={{ gap: '20px' }} >
          {/*  Product Name */}
          <Grid item xs={12}>
            <InputLabel style={{ marginBottom: '8px', color: 'black' }} >Product Name</InputLabel>
            <TextField
              fullWidth
              id="productName"
              name="productName"
              placeholder='type here..'
              value={formik.values.productName}
              onChange={formik.handleChange}
            />
            {
              formik.errors.productName && formik.touched.productName && (
                <div style={{ color: 'red', fontSize: '12px', margin: '5px' }}>{formik.errors.productName}</div>
              )
            }
          </Grid>

          {/*  Product Description */}
          <Grid item xs={12}>
            <InputLabel style={{ marginBottom: '8px', color: 'black' }} >Product Description</InputLabel>
            <TextareaAutosize
              style={
                {
                  resize: 'none',
                  width: "100%",
                  padding: "10px",
                  fontSize: '16px',
                  borderRadius: '4px',
                  borderColor: 'lightgrey',
                  borderWidth: '1px',
                }
              }
              minRows={5}
              fullWidth
              placeholder='type here..'
              id="productDescription"
              name="productDescription"
              label="Product Description"
              value={formik.values.productDescription}
              onChange={formik.handleChange}
            />
            {
              formik.errors.productDescription && formik.touched.productDescription && (
                <div style={{ color: 'red', fontSize: '12px', margin: '5px' }}>{formik.errors.productDescription}</div>
              )
            }
          </Grid>


          {/*  Product Images */}
          <Grid item xs={12}>
            <InputLabel id="demo-simple-select-label" style={{ marginBottom: '8px', color: "black" }} >Product Images (Maximum 10)</InputLabel>
            <Stack direction="row" spacing={2}>
              {formik.values.productImages.map((image, index) => (
                <img key={index} src={URL.createObjectURL(image)} alt={`image-${index}`} width="100" height="100" />
              ))}
            </Stack>
            <input
              style={{ marginTop: '10px' }}
              accept="image/*"
              multiple
              type="file"
              id="productImages"
              name="productImages"
              label="Product Images"
              onChange={((event) => handleImageUpload(event))}
            />
            {
              formik.errors.productImages && formik.touched.productImages && (
                <div style={{ color: 'red', fontSize: '12px', margin: '5px' }}>{formik.errors.productImages}</div>
              )
            }
          </Grid>

          <Grid container spacing={2}>
            {/*  Product Price */}
            <Grid item xs={6}>
              <InputLabel style={{ marginBottom: '8px', color: 'black' }} >Price</InputLabel>
              <TextField
                fullWidth
                id="productPrice"
                name="productPrice"
                placeholder='type here..'
                type="number"
                value={formik.values.productPrice}
                onChange={formik.handleChange}
              />
              {
                formik.errors.productPrice && formik.touched.productPrice && (
                  <div style={{ color: 'red', fontSize: '12px', margin: '5px' }}>{formik.errors.productPrice}</div>
                )
              }
            </Grid>

            {/*  Product Availability */}
            <Grid item xs={6}>
              <InputLabel style={{ marginBottom: '8px', color: 'black' }} >Availability</InputLabel>
              <FormControl fullWidth>
                {/* <InputLabel id="demo-simple-select-label">Availability</InputLabel> */}
                <Select
                  labelId="demo-simple-select-label"
                  id="productAvailability"
                  name="productAvailability"
                  value={formik.values.productAvailability}
                  onChange={formik.handleChange}
                >
                  <MenuItem value={true}>In Stock</MenuItem>
                  <MenuItem value={false}>Out of Stock</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/*  Shipping Information */}
          <Grid item xs={12}>
            <InputLabel style={{ marginBottom: '8px', color: 'black' }} >Shipping Information</InputLabel>
            <TextareaAutosize
              style={
                {
                  resize: 'none',
                  width: "100%",
                  padding: "10px",
                  fontSize: '16px',
                  borderRadius: '4px',
                  borderColor: 'lightgrey',
                  borderWidth: '1px',
                }
              }
              minRows={5}
              fullWidth
              id="shippingInformation"
              name="shippingInformation"
              label="Shipping Information"
              placeholder='type here..'
              value={formik.values.shippingInformation}
              onChange={formik.handleChange}
            />
            {
              formik.errors.shippingInformation && formik.touched.shippingInformation && (
                <div style={{ color: 'red', fontSize: '12px', margin: '5px' }}>{formik.errors.shippingInformation}</div>
              )
            }
          </Grid>

          <Grid container spacing={2}>
            {/*  Product Dimensions */}
            <Grid item md={6} xs={12}>
              <InputLabel style={{ marginBottom: '8px', color: 'black' }} >Product Dimensions</InputLabel>
              <TextField
                fullWidth
                id="productDimensions"
                name="productDimensions"
                placeholder='type here..'
                value={formik.values.productDimensions}
                onChange={formik.handleChange}
              />
              {
                formik.errors.productDimensions && formik.touched.productDimensions && (
                  <div style={{ color: 'red', fontSize: '12px', margin: '5px' }}>{formik.errors.productDimensions}</div>
                )
              }
            </Grid>

            {/*  Product Weight */}
            <Grid item md={6} xs={12}>
              <InputLabel style={{ marginBottom: '8px', color: 'black' }} >Product Weight</InputLabel>
              <TextField
                fullWidth
                id="productWeight"
                name="productWeight"
                placeholder='type here..'
                value={formik.values.productWeight}
                onChange={formik.handleChange}
              />
              {
                formik.errors.productWeight && formik.touched.productWeight && (
                  <div style={{ color: 'red', fontSize: '12px', margin: '5px' }}>{formik.errors.productWeight}</div>
                )
              }
            </Grid>
          </Grid>


          <Grid container spacing={2}>
            {/*  Material and Construction */}
            <Grid item md={6} xs={12}>
              <InputLabel style={{ marginBottom: '8px', color: 'black' }} >Material and Construction</InputLabel>
              <TextareaAutosize
                style={
                  {
                    resize: 'none',
                    width: "100%",
                    padding: "10px",
                    fontSize: '16px',
                    borderRadius: '4px',
                    borderColor: 'lightgrey',
                    borderWidth: '1px',
                  }
                }
                minRows={5}
                fullWidth
                id="materialAndConstruction"
                name="materialAndConstruction"
                placeholder='type here..'
                value={formik.values.materialAndConstruction}
                onChange={formik.handleChange}
              />
              {
                formik.errors.materialAndConstruction && formik.touched.materialAndConstruction && (
                  <div style={{ color: 'red', fontSize: '12px', margin: '5px' }}>{formik.errors.materialAndConstruction}</div>
                )
              }
            </Grid>

            {/*  Product Features */}
            <Grid item md={6} xs={12}>
              <InputLabel style={{ marginBottom: '8px', color: 'black' }} >Product Features</InputLabel>
              <TextareaAutosize
                style={
                  {
                    resize: 'none',
                    width: "100%",
                    padding: "10px",
                    fontSize: '16px',
                    borderRadius: '4px',
                    borderColor: 'lightgrey',
                    borderWidth: '1px',
                  }
                }
                minRows={5}
                fullWidth
                id="productFeatures"
                name="productFeatures"
                placeholder='type here..'
                value={formik.values.productFeatures}
                onChange={formik.handleChange}
              />
              {
                formik.errors.productFeatures && formik.touched.productFeatures && (
                  <div style={{ color: 'red', fontSize: '12px', margin: '5px' }}>{formik.errors.productFeatures}</div>
                )
              }
            </Grid>
          </Grid>

          {/*  Related Products */}
          <Grid item xs={12}>
            <InputLabel id="demo-simple-select-label" style={{ marginBottom: '8px', color: 'black' }} >Related Products (cooma seperated. For example: 1, 2, 3, etc.)</InputLabel>
            <TextField
              fullWidth
              id="relatedProducts"
              name="relatedProducts"
              placeholder='type here..'
              value={formik.values.relatedProducts}
              onChange={formik.handleChange}
            />
            {
              formik.errors.relatedProducts && formik.touched.relatedProducts && (
                <div style={{ color: 'red', fontSize: '12px', margin: '5px' }}>{formik.errors.relatedProducts}</div>
              )
            }
          </Grid>

          {/* Product Frequently asked questions */}
          <Grid item xs={12}>
            <InputLabel id="demo-simple-select-label" style={{ marginBottom: '8px', color: 'black' }} >Frequently asked questions</InputLabel>
            <ReactQuill
              height="1000px"
              id='frequentlyAskedQuestions'
              name='frequentlyAskedQuestions'
              placeholder='type here..'
              onChange={(value) => { handleEditorChange(value) }}
              value={formik.values.frequentlyAskedQuestions}
            />
            {
              formik.errors.frequentlyAskedQuestions && formik.touched.frequentlyAskedQuestions && (
                <div style={{ color: 'red', fontSize: '12px', margin: '5px' }}>{formik.errors.frequentlyAskedQuestions}</div>
              )
            }
          </Grid>

          <Grid container spacing={2}>
            {/*  Warranty Information */}
            <Grid item md={6} xs={12}>
              <InputLabel id="demo-simple-select-label" style={{ marginBottom: '8px', color: 'black' }} >Warranty Information</InputLabel>
              <TextareaAutosize
                style={
                  {
                    resize: 'none',
                    width: "100%",
                    padding: "10px",
                    fontSize: '16px',
                    borderRadius: '4px',
                    borderColor: 'lightgrey',
                    borderWidth: '1px',
                  }
                }
                minRows={5}
                fullWidth
                id="warrantyInformation"
                name="warrantyInformation"
                label="Warranty Information"
                placeholder="type here.."
                value={formik.values.warrantyInformation}
                onChange={formik.handleChange}
              />
              {
                formik.errors.warrantyInformation && formik.touched.warrantyInformation && (
                  <div style={{ color: 'red', fontSize: '12px', margin: '5px' }}>{formik.errors.warrantyInformation}</div>
                )
              }
            </Grid>

            {/*  Return Policy */}
            <Grid item md={6} xs={12}>
              <InputLabel id="demo-simple-select-label" style={{ marginBottom: '8px', color: 'black' }} >Return Policy</InputLabel>
              <TextareaAutosize
                style={
                  {
                    resize: 'none',
                    width: "100%",
                    padding: "10px",
                    fontSize: '16px',
                    borderRadius: '4px',
                    borderColor: 'lightgrey',
                    borderWidth: '1px',
                  }
                }
                minRows={5}
                fullWidth
                id="returnPolicy"
                name="returnPolicy"
                placeholder="type here.."
                value={formik.values.returnPolicy}
                onChange={formik.handleChange}
              />
              {
                formik.errors.returnPolicy && formik.touched.returnPolicy && (
                  <div style={{ color: 'red', fontSize: '12px', margin: '5px' }}>{formik.errors.returnPolicy}</div>
                )
              }
            </Grid>
          </Grid>

          {/*  Submit Button */}
          <Grid item xs={12}>
            <Stack direction='row'>
              <Grid lg={4}></Grid>
              <Grid xs={4}>
                <Button color="primary" variant="contained" fullWidth type="submit">Submit</Button>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </form >
    </>
  )
}

export default ProductForm