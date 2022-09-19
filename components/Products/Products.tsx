import {
  DataGrid,
  GridCellEditCommitParams,
  GridSelectionModel,
  GridToolbarContainer,
  GridToolbarExport
} from '@mui/x-data-grid';
import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { Box, LinearProgress, Stack, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import ProductsHeader from './ProductsHeader';
import ProductsModals from './Modals';
import ProductsColumns from 'components/Products/ProductColumns';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { productApi } from 'services/ProductService';
import { dataSlice } from 'utils/store/reducers/DataSlice';
import { IProduct } from 'models/Product';
import styles from 'styles/Products.module.scss';

const Products: NextPage = () => {
  const [rows, setRows] = useState([]);
  const [deleteProducts, {}] = productApi.useDeleteProductsMutation();
  const [editProduct, {}] = productApi.useEditProductMutation();
  const { selectedCategory, selectedProducts } = useAppSelector(state => state.dataReducer);
  const { data, isFetching } = productApi.useFetchProductQuery(selectedCategory ? selectedCategory._id : null);
  const dispatch = useAppDispatch();

  const updateSelectedProducts = (model: GridSelectionModel) => {
    dispatch(dataSlice.actions.setSelectedProducts(model.map((item) => Number(item))));
  };

  const deleteSelected = async () => {
    deleteProducts(selectedProducts);
  };

  const onProductChange = ({ id, field, value }: GridCellEditCommitParams) => {
    var product: IProduct = { name: '', barcode: 0, category: 0 };
    var change = {};

    change[field] = value;

    data.forEach((_product: IProduct) => {
      if (_product._id === id) product = _product;
    });

    if (change[field] === product[field]) return;
    if (product) editProduct({...product, ...change});
  };

  useEffect(() => {
    if (!data) return setRows([]);
  
    var rows = [];
    data.forEach((row) => {
      rows.push({
        ...row,
        id: row._id,
        createdAt: new Date(row.createdAt),
        updatedAt: new Date(row.updatedAt),
        image: `${window.location.origin}/api/product/image/${row._id}`
      });
    });
  
    setRows(rows);
  }, [data]);

  return (
    <>
      <ProductsModals/>
      <Box className={styles.products}>
        <Stack>
          <ProductsHeader/>
          <Box className={styles.dataGrid}>
            <DataGrid 
              columns={ProductsColumns}
              rows={rows}
              checkboxSelection={true} 
              pagination
              loading={isFetching}
              components={{
                Toolbar: () => (
                  <GridToolbarContainer className={styles.gridToolbar}>
                    {
                      selectedProducts.length > 0 &&
                      <Button size="small" sx={{ marginRight: '10px' }} startIcon={<Delete/>} onClick={deleteSelected}>
                        Delete selected
                      </Button>
                    }
                    <GridToolbarExport/>
                  </GridToolbarContainer>
                ),
                LoadingOverlay: LinearProgress
              }}
              onSelectionModelChange={updateSelectedProducts}
              onCellEditCommit={onProductChange}
            />
          </Box>
        </Stack>
      </Box>
    </>
  )
}

export default Products;
