import { NextPage } from 'next';
import { ListItemIcon } from '@mui/material';
import { ExpandLess, ExpandMore, FolderOpen, Folder } from '@mui/icons-material';

interface Props {
  readonly isOpen: boolean;
  readonly isSubfolders: boolean;
}

const FolderButtonIndication: NextPage<Props> = ({ isOpen = false, isSubfolders = false }) => {
  return (
    <ListItemIcon>
      {
        isSubfolders
        ? (isOpen ? <ExpandLess/> : <ExpandMore/>)
        : <ExpandLess sx={{ opacity: 0 }}/>
      }
      {
        isOpen && isSubfolders
        ? <FolderOpen/>
        : <Folder/>
      }
    </ListItemIcon>
  )
}

export default FolderButtonIndication;
