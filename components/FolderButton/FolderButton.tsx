import { NextPage } from 'next';
import { useMemo, useState } from 'react';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import { ICategory } from 'models/Category';
import FolderButtonIndication from './FolderButtonIndication';
import FolderButtonControls from './FolderButtonControls';
import FoldersList from 'components/FoldersList';
import styles from 'styles/FolderButton.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { dataSlice } from 'utils/store/reducers/DataSlice';

interface Props {
  data: ICategory;
  shiftSize: number;
  hideControls?: boolean;
}

const FolderButton: NextPage<Props> = ({ data, shiftSize = 0, hideControls = false }) => {
  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { selectedCategory } = useAppSelector(state => state.dataReducer);
  const dispatch = useAppDispatch();

  const isSelected: boolean = useMemo(() => {
    if (selectedCategory === data) return true;
    return false;
  }, [selectedCategory]);

  const click = () => {
    if (isSelected) setIsOpen(!isOpen);
    else dispatch(dataSlice.actions.selectCategory(data));
  };

  return (
    <>
      <ListItemButton
        className={styles.button}
        onClick={click}
        onMouseEnter={() => setIsHover(true)}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        selected={isSelected}
        sx={{
          paddingLeft: shiftSize !== 0 ? `calc(${shiftSize} * var(--folders-padding))` : null,
        }}
      >
        <FolderButtonIndication isOpen={isOpen} isSubfolders={data.next.length > 0}/>
        <ListItemText>{ data.name }</ListItemText>
        <FolderButtonControls isActive={hideControls ? false : isHover} data={data}/>
      </ListItemButton>
      {
        isOpen &&
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <FoldersList startFolder={data._id} shiftSize={shiftSize + 1} hideControls={hideControls}/>
          </List>
        </Collapse>
      }
    </>
  )
}

export default FolderButton;
