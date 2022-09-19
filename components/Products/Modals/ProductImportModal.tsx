import { NextPage } from 'next';
import { Stack } from '@mui/material';
import SpringModal from 'components/SpringModal';
import { ModalHeader } from 'components/SpringModal/template';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { modalsSlice, MODALS_PRODUCT_IMPORT } from 'utils/store/reducers/ModalsSlice';

const ProductImportModal: NextPage = () => {
  const { isImporting } = useAppSelector(state => state.modalsReducer.products);
  const dispatch = useAppDispatch();

  const close = () => dispatch(modalsSlice.actions.hide(MODALS_PRODUCT_IMPORT));

  return (
    <SpringModal isActive={isImporting} onClose={close}>
      <ModalHeader title="Import products" onClose={close}/>
    </SpringModal>
  )
}

export default ProductImportModal;
