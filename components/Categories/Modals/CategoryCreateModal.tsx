import { NextPage } from 'next';
import { ChangeEvent, useState, useEffect } from 'react';
import { Stack, TextField, Button } from '@mui/material';
import SpringModal from 'components/SpringModal';
import { ModalHeader, AutocompleteSizes } from 'components/SpringModal/template';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { modalsSlice, MODALS_CATEGORY_NEW } from 'utils/store/reducers/ModalsSlice';
import { categoryApi } from 'services/CategoryService';

const CategoryCreateModal: NextPage = () => {
  const [name, setName] = useState('');
  const [sizes, setSizes] = useState([]);
  const [error, setError] = useState(false);
  const { selectedCategory } = useAppSelector(state => state.dataReducer);
  const [createCategory, {}] = categoryApi.useCreateCategoryMutation();
  const { isCreatingNew } = useAppSelector(state => state.modalsReducer.categories);
  const dispatch = useAppDispatch();

  const updateName = (value: string) => {
    if (String(value).trim().length === 0) setError(true);
    else setError(false);
    setName(value);
  };

  const updateSizes = (event: React.SyntheticEvent, value: string[]) => setSizes(value);
  
  const close = () => {
    dispatch(modalsSlice.actions.hide(MODALS_CATEGORY_NEW));
    clear();
  };

  const clear = () => {
    setName('');
    setSizes([]);
    setError(false);
  };
  
  const action = async () => {
    if (error) return;
    if (String(name).trim().length === 0) return setError(true);

    await createCategory({
      name: name,
      sizes: sizes,
      prev: selectedCategory ? selectedCategory._id : null,
      next: []
    });
    close();
    clear();
  };

  return (
    <SpringModal isActive={isCreatingNew} onClose={close}>
      <ModalHeader title="New category" onClose={close}/>
      <Stack spacing={2}>
        <TextField 
          label="Category name" 
          variant="outlined" 
          required
          fullWidth
          value={name || ''}
          onChange={(event: ChangeEvent<HTMLInputElement>) => updateName(event.target.value)}
          error={error}
        />
        <AutocompleteSizes value={sizes} onSave={updateSizes}/>
        <Button variant="contained" onClick={action} disabled={error}>Submit</Button> 
      </Stack>
    </SpringModal>
  )
}

export default CategoryCreateModal;
