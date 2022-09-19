import { NextPage } from 'next';
import { ChangeEvent, useState, useEffect } from 'react'; 
import { Stack, TextField, Button } from '@mui/material';
import SpringModal from 'components/SpringModal';
import { ModalHeader } from 'components/SpringModal/template';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { modalsSlice, MODALS_PRODUCT_NEW, MODALS_SELECT_CATEGORY } from 'utils/store/reducers/ModalsSlice';
import DragAndDrop from 'components/DragAndDrop';
import { productApi } from 'services/ProductService';

const ProductCreateModal: NextPage = () => {
  const [error, setError] = useState({ name: false, barcode: false, category: false, any: false });
  const [name, setName] = useState('');
  const [barcode, setBarcode] = useState('');
  const [file, setFile] = useState(null);
  const { selectedCategory } = useAppSelector(state => state.dataReducer);
  const { isCreatingNew } = useAppSelector(state => state.modalsReducer.products);
  const [createProduct, {}] = productApi.useCreateProductMutation();
  const dispatch = useAppDispatch();

  const updateBarcode = (event: ChangeEvent<HTMLInputElement>) => {
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');
    if (onlyNums.length > 0) setBarcode(onlyNums);
    else setBarcode('');
  };

  const fileUpload = (file: File, data: string | ArrayBuffer) => {
    setFile({
      file,
      data: data
    });
  };

  const close = () => {
    dispatch(modalsSlice.actions.hide(MODALS_PRODUCT_NEW));
    setTimeout(() => {
      setName('');
      setBarcode('');
      setFile(null);
    }, 250);
  };

  const openCategorySelect = () => dispatch(modalsSlice.actions.show(MODALS_SELECT_CATEGORY));
  const action = async () => {
    await createProduct({
      name: name,
      category: selectedCategory._id,
      barcode: Number(barcode),
      src: file ? {
        data: file.data,
        contentType: file.file.type
      } : null
    });
    close();
  };

  useEffect(() => {
    let _error = {
      name: false,
      barcode: false,
      category: false,
      any: false
    };

    if (String(name).trim().length === 0) _error.name = true;
    if (String(barcode).trim().length === 0) _error.barcode = true;
    if (!selectedCategory) _error.category = true;
    if (_error.name || _error.barcode || _error.category) _error.any = true;

    setError({..._error});
  }, [name, barcode, selectedCategory]);

  return (
    <SpringModal isActive={isCreatingNew} onClose={close}>
      <ModalHeader title="Create product" onClose={close}/>
      <Stack spacing={2}>
        <TextField 
            label="Product name" 
            variant="outlined"
            required 
            fullWidth
            value={name}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
            error={error.name}
        />
        <TextField 
            label="Barcode" 
            variant="outlined"
            required
            fullWidth
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            value={barcode}
            onChange={updateBarcode}
            error={error.barcode}
        />
        <Button 
          variant="outlined" 
          color={error.category ? 'error' : selectedCategory ? 'inherit' : 'primary'} 
          onClick={openCategorySelect}>
          { selectedCategory ? `Category: ${selectedCategory.name}` : 'Select category' }
        </Button>
        <DragAndDrop onUpload={fileUpload}/>
        <Button variant="contained" onClick={action} disabled={error.any}>Submit</Button> 
      </Stack>
    </SpringModal>
  )
}

export default ProductCreateModal;
