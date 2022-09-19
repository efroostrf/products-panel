import { NextPage } from 'next';
import { ListSubheader, Stack, IconButton } from '@mui/material';
import { CreateNewFolder, Home, Refresh } from '@mui/icons-material';
import { useAppDispatch } from 'hooks/redux';
import { dataSlice } from 'utils/store/reducers/DataSlice';
import { modalsSlice, MODALS_CATEGORY_NEW } from 'utils/store/reducers/ModalsSlice';
import { categoryApi } from 'services/CategoryService';
import { productApi } from 'services/ProductService';

const CategoriesSubheader: NextPage = () => {
  const dispatch = useAppDispatch();

  const openNewModal = () => {
    dispatch(dataSlice.actions.selectCategory(null));
    dispatch(modalsSlice.actions.show(MODALS_CATEGORY_NEW));
  };

  const home = () => dispatch(dataSlice.actions.selectCategory(null));

  const refresh = () => {
    dispatch(categoryApi.util.invalidateTags(['Category']));
    dispatch(productApi.util.invalidateTags(['Product']));
  };

  return (
    <ListSubheader component="div">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        Categories
        <Stack direction="row" spacing={2}>
          <IconButton onClick={home}>
            <Home/>
          </IconButton>
          <IconButton onClick={refresh}>
            <Refresh/>
          </IconButton>
          <IconButton onClick={openNewModal}>
            <CreateNewFolder/>
          </IconButton>
        </Stack>
      </Stack>
    </ListSubheader>
  )
}

export default CategoriesSubheader;
