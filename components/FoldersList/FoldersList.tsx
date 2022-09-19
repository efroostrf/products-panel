import { NextPage } from 'next';
import { LinearProgress, Typography } from '@mui/material';
import { categoryApi } from 'services/CategoryService';
import FolderButton from 'components/FolderButton';
import folderIcon from 'assets/folder.png';
import damagedFolderIcon from 'assets/damagedFolder.webp';
import styles from 'styles/FolderList.module.scss';

interface Props {
  startFolder?: number | null;
  shiftSize?: number;
  hideControls?: boolean;
}

const FoldersList: NextPage<Props> = ({ startFolder = null, shiftSize = 0, hideControls = false }) => {
  const { data, isSuccess, isFetching, isError } = categoryApi.useFetchCategoriesQuery(startFolder);

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
        !isError && startFolder === null && data && data.length === 0 &&
        <div className={styles.popOver}>
          <img src={folderIcon.src} width="150" height="150" alt="Create new category" />
          <Typography variant="body1">Create your first category!</Typography>
        </div>
      }
      {
        isError && startFolder === null &&
        <div className={styles.popOver}>
          <img src={damagedFolderIcon.src} width="150" height="150" alt="Create new category" />
          <Typography className={styles.text} variant="body1">WOops, an error arose when loading categories. Try to update the list.</Typography>
        </div>
      }
      {
        isError && startFolder !== null &&
        <div className={styles.errorMessage}>
          <Typography className={styles.text} variant="body1">WOops, an error arose when loading categories. Try to update the list.</Typography>
        </div>
      }
    </>
  )
}

export default FoldersList;
