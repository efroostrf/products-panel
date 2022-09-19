import { NextPage } from 'next';
import { Stack, Typography, Button } from '@mui/material';
import SpringModal from 'components/SpringModal';
import { ModalHeader } from 'components/SpringModal/template';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { modalsSlice, MODALS_CATEGORY_DELETE } from 'utils/store/reducers/ModalsSlice';
import { categoryApi } from 'services/CategoryService';
import { dataSlice } from 'utils/store/reducers/DataSlice';
import { productApi } from 'services/ProductService';

const CategoryDeleteModal: NextPage = () => {
  const { selectedCategory } = useAppSelector(state => state.dataReducer);
  const { isDeleting } = useAppSelector(state => state.modalsReducer.categories);
  const [deleteCategory, {}] = categoryApi.useDeleteCategoryMutation();
  const dispatch = useAppDispatch();

  const close = () => dispatch(modalsSlice.actions.hide(MODALS_CATEGORY_DELETE));
  const action = async () => {
    await deleteCategory(selectedCategory);
    dispatch(productApi.util.invalidateTags(['Product']));
    close();
    setTimeout(() => {
      dispatch(dataSlice.actions.selectCategory(null));
    }, 250);
  };

  return (
    <SpringModal isActive={isDeleting} onClose={close}>
      <ModalHeader title="Delete category" onClose={close}/>
      <Stack spacing={2}>
        <Typography variant="subtitle1">
          Category "{selectedCategory ? selectedCategory.name : ''}" and all products will be permanently deleted. Are you sure?
        </Typography>
        <Button variant="contained" color="error" onClick={action}>Yeah, delete it</Button>
      </Stack>
    </SpringModal>
  )
}

export default CategoryDeleteModal;
