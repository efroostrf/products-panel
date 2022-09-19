import { NextPage } from 'next';
import { Stack } from '@mui/material';
import SpringModal from 'components/SpringModal';
import { ModalHeader } from 'components/SpringModal/template';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { modalsSlice, MODALS_PRODUCT_EDIT } from 'utils/store/reducers/ModalsSlice';

const ProductEditModal: NextPage = () => {
  const { isEditing } = useAppSelector(state => state.modalsReducer.products);
  const dispatch = useAppDispatch();

  const close = () => dispatch(modalsSlice.actions.hide(MODALS_PRODUCT_EDIT));

  return (
    <SpringModal isActive={isEditing} onClose={close}>
      <ModalHeader title="Edit products" onClose={close}/>
    </SpringModal>
  )
}

export default ProductEditModal;
