import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import axios from "axios";

import { apis } from "../../../constants";
import ViewProducts from "./ViewProducts";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";

export default function Products() {
  const [editProductModalOpen, setEditProductModalOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.get(`${apis.baseUrl}/products`);

      setProducts(data.products);

      setIsLoading(false);
    } catch (error) {
      console.error("Error in getting products", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      mx="auto"
      maxWidth={700}
    >
      <EditProductModal
        open={editProductModalOpen}
        onClose={() => {
          setEditProductId(null);
          setEditProductModalOpen(false);
          getProducts();
        }}
        productId={editProductId}
      />

      <DeleteProductModal
        open={!!deleteProductId}
        onClose={() => {
          setDeleteProductId(null);
          getProducts();
        }}
        productId={deleteProductId}
        setDeleteProductId={setDeleteProductId}
      />

      <Grid item ml="auto" mt={4} mb={3}>
        <Button
          variant="contained"
          onClick={() => setEditProductModalOpen(true)}
        >
          Add Product
        </Button>
      </Grid>

      <ViewProducts
        products={products}
        setEditProductId={(productId) => {
          setEditProductId(productId);
          setEditProductModalOpen(true);
        }}
        setDeleteProductId={setDeleteProductId}
      />
    </Grid>
  );
}
