import { NextPage } from 'next';
import { ChangeEvent, useEffect, useState } from 'react';
import { TextField, Stack, Button } from '@mui/material';
import SpringModal from 'components/SpringModal';
import { ModalHeader, AutocompleteSizes } from 'components/SpringModal/template';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { modalsSlice, MODALS_CATEGORY_EDIT } from 'utils/store/reducers/ModalsSlice';
import { categoryApi } from 'services/CategoryService';
import { productApi } from 'services/ProductService';

const CategoryEditModal: NextPage = () => {
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [sizes, setSizes] = useState([]);
  const { selectedCategory } = useAppSelector(state => state.dataReducer);
  const { isEditing } = useAppSelector(state => state.modalsReducer.categories);
  const [editCategory, {}] = categoryApi.useEditCategoryMutation();
  const dispatch = useAppDispatch();

  const close = () => {
    dispatch(modalsSlice.actions.hide(MODALS_CATEGORY_EDIT));
    setName('');
    setSizes([]);
  };

  const action = async () => {
    await editCategory(Object.assign({...selectedCategory}, {
      name: name,
      sizes: sizes
    }));
    dispatch(productApi.util.invalidateTags(['Product']));
    close();
  };

  useEffect(() => {
    if (!selectedCategory) return;
    setName(selectedCategory.name);
    setSizes(selectedCategory.sizes);
  }, [selectedCategory]);

  useEffect(() => {
    if (String(name).trim().length === 0) return setError(true);
    else return setError(false);
  }, [name]);

  return (
    <SpringModal isActive={isEditing} onClose={close}>
      <ModalHeader title="Edit category" onClose={close}/>
      <Stack spacing={2}>
        <TextField 
          label="Collection name" 
          variant="outlined" 
          required
          fullWidth
          value={name}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
          error={error}
        />
        <AutocompleteSizes value={sizes} onSave={(event, value) => setSizes(value)}/>
        <Button variant="contained" color="secondary" onClick={action} disabled={error}>Finish editing</Button> 
      </Stack>
    </SpringModal>
  )
}

export default CategoryEditModal;
