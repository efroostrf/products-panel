import { NextPage } from 'next';
import { MouseEventHandler } from 'react';
import { ListItemIcon } from '@mui/material';
import { ExpandLess, ExpandMore, FolderOpen, Folder } from '@mui/icons-material';

interface Props {
  readonly isOpen: boolean;
  readonly isSubfolders: boolean;
  onArrowClick?: (event: any) => void;
}

const FolderButtonIndication: NextPage<Props> = ({ isOpen = false, isSubfolders = false, onArrowClick = function () {} }) => {
  return (
    <ListItemIcon>
      {
        isSubfolders
        ? (isOpen ? <ExpandLess onClick={onArrowClick}/> : <ExpandMore onClick={onArrowClick}/>)
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
