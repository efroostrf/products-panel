import { NextPage } from 'next';
import { MouseEvent } from 'react';
import { Stack, IconButton } from '@mui/material';
import { CreateNewFolder, Edit, Delete } from '@mui/icons-material';
import { useAppDispatch } from 'hooks/redux';
import { 
  modalsSlice,
  MODALS_CATEGORY_DELETE,
  MODALS_CATEGORY_EDIT,
  MODALS_CATEGORY_NEW
} from 'utils/store/reducers/ModalsSlice';
import styles from 'styles/FolderButton.module.scss';
import { dataSlice } from 'utils/store/reducers/DataSlice';

interface Props {
  readonly isActive: boolean;
  readonly data?: any;
}

const FolderButtonControls: NextPage<Props> = ({ isActive = false, data }) => {
  const dispatch = useAppDispatch();
  const { show } = modalsSlice.actions;
  const { selectCategory } = dataSlice.actions;

  const createFolder = (event: MouseEvent) => {
    event.stopPropagation();
    dispatch(selectCategory(data));
    dispatch(show(MODALS_CATEGORY_NEW));
  };

  const editFolder = (event: MouseEvent) => {
    event.stopPropagation();
    dispatch(selectCategory(data));
    dispatch(show(MODALS_CATEGORY_EDIT));
  };

  const deleteFolder = (event: MouseEvent) => {
    event.stopPropagation();
    dispatch(selectCategory(data));
    dispatch(show(MODALS_CATEGORY_DELETE));
  };

  return (
    isActive &&
    <Stack className={styles.controls} direction="row" spacing={1}>
      <IconButton size="small" onClick={editFolder}>
        <Edit/>
      </IconButton>
      <IconButton size="small" onClick={createFolder}>
        <CreateNewFolder/>
      </IconButton>
      <IconButton size="small" onClick={deleteFolder}>
        <Delete/>
      </IconButton>
    </Stack>
  )
}

export default FolderButtonControls;
