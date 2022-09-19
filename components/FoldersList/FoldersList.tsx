import { NextPage } from 'next';
import { LinearProgress, Typography } from '@mui/material';
import { categoryApi } from 'services/CategoryService';
import FolderButton from 'components/FolderButton';
import folderIcon from 'assets/folder.png';
import styles from 'styles/FolderList.module.scss';

interface Props {
  startFolder?: number | null;
  shiftSize?: number;
  hideControls?: boolean;
}

const FoldersList: NextPage<Props> = ({ startFolder = null, shiftSize = 0, hideControls = false }) => {
  const { data, isSuccess, isFetching } = categoryApi.useFetchCategoriesQuery(startFolder);

  return (
    <>
      { isFetching && <LinearProgress/> }
      {
        isSuccess &&
        data.map((folder) => 
          <FolderButton 
            data={folder}
            shiftSize={shiftSize}
            hideControls={hideControls}
            key={folder._id}
          />
        )
      }
      {
        startFolder === null && data && data.length === 0 &&
        <div className={styles.notFound}>
          <img src={folderIcon.src} width="150" height="150" alt="Create new category" />
          <Typography variant="body1">Create your first category!</Typography>
        </div>
      }
    </>
  )
}

export default FoldersList;
