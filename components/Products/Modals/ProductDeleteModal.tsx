import { NextPage } from 'next';
import { Stack } from '@mui/material';
import SpringModal from 'components/SpringModal';
import { ModalHeader } from 'components/SpringModal/template';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { modalsSlice, MODALS_PRODUCT_DELETE } from 'utils/store/reducers/ModalsSlice';

const ProductDeleteModal: NextPage = () => {
  const { isDeleting } = useAppSelector(state => state.modalsReducer.products);
  const dispatch = useAppDispatch();

  const close = () => dispatch(modalsSlice.actions.hide(MODALS_PRODUCT_DELETE));

  return (
    <SpringModal isActive={isDeleting} onClose={close}>
      <ModalHeader title="Delete products" onClose={close}/>
    </SpringModal>
  )
}

export default ProductDeleteModal;
