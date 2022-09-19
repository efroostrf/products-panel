import { NextPage } from 'next';
import { Stack } from '@mui/material';
import SpringModal from 'components/SpringModal';
import { ModalHeader } from 'components/SpringModal/template';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { modalsSlice, MODALS_PRODUCT_EXPORT } from 'utils/store/reducers/ModalsSlice';

const ProductExportModal: NextPage = () => {
  const { isExporting } = useAppSelector(state => state.modalsReducer.products);
  const dispatch = useAppDispatch();

  const close = () => dispatch(modalsSlice.actions.hide(MODALS_PRODUCT_EXPORT));

  return (
    <SpringModal isActive={isExporting} onClose={close}>
      <ModalHeader title="Export products" onClose={close}/>
    </SpringModal>
  )
}

export default ProductExportModal;
