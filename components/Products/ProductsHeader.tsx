import { NextPage } from 'next';
import { Stack, Button, Typography } from '@mui/material';
import { FileCopy, Download, Upload } from '@mui/icons-material';
import { useAppDispatch } from 'hooks/redux';
import { 
  modalsSlice,
  MODALS_PRODUCT_EXPORT,
  MODALS_PRODUCT_IMPORT,
  MODALS_PRODUCT_NEW
} from 'utils/store/reducers/ModalsSlice';
import styles from 'styles/Products.module.scss'

const ProductsHeader: NextPage = () => {
  const dispatch = useAppDispatch();

  const openNewModal = () => dispatch(modalsSlice.actions.show(MODALS_PRODUCT_NEW));

  return (
    <Stack className={styles.header} direction="row">
      <Typography variant="h5">Products</Typography>
      <Stack direction="row" spacing={1}>
        <Button variant="contained" color="success" size="small" startIcon={<FileCopy/>} onClick={openNewModal}>Add new</Button>
      </Stack>
    </Stack>
  )
}

export default ProductsHeader;
