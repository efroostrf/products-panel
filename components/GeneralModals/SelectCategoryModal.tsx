import { Button, List, Stack } from '@mui/material';
import FoldersList from 'components/FoldersList';
import SpringModal from 'components/SpringModal';
import { ModalHeader } from 'components/SpringModal/template';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { modalsSlice, MODALS_SELECT_CATEGORY } from 'utils/store/reducers/ModalsSlice';

const SelectCategoryModal = () => {
  const { isSelectingCategory } = useAppSelector(state => state.modalsReducer);
  const dispatch = useAppDispatch();

  const close = () => dispatch(modalsSlice.actions.hide(MODALS_SELECT_CATEGORY));
  const action = async () => {
    close();
  };

  return (
    <SpringModal isActive={isSelectingCategory} onClose={close} sx={{ zIndex: 999999 }} sxBox={{ p: 0, minWidth: '400px' }}>
      <ModalHeader title="Select category" onClose={close} sx={{ p: 4 }}/>
      <List component="nav" sx={{ minHeight: '350px', maxHeight: '350px', overflow: 'auto'  }} disablePadding>
        <FoldersList hideControls/>
      </List>
      <Stack sx={{ p: 4 }}>
        <Button variant="contained" fullWidth onClick={close}>Close</Button>
      </Stack>
    </SpringModal>
  )
}

export default SelectCategoryModal;
