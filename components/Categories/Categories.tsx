import { NextPage } from 'next';
import { Box, List} from '@mui/material';
import CategoriesModals from './Modals';
import CategoriesSubheader from './CategoriesSubheader';
import FoldersList from 'components/FoldersList';
import styles from 'styles/Categories.module.scss';

const Categories: NextPage = () => {
  return (
    <>
      <CategoriesModals/>
      <Box className={styles.categories}>
        <List className={styles.list} component="nav" subheader={<CategoriesSubheader/>}>
          <FoldersList/>
        </List>
      </Box>
    </>
  )
}

export default Categories;
