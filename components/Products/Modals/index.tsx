import ProductCreateModal from './ProductCreateModal';
import ProductEditModal from './ProductEditModal';
import ProductDeleteModal from './ProductDeleteModal';
import ProductImportModal from './ProductImportModal';
import ProductExportModal from './ProductExportModal';

const ProductsModals = () => {
  return (
    <>
      <ProductCreateModal/>
      <ProductEditModal/>
      <ProductDeleteModal/>
      <ProductImportModal/>
      <ProductExportModal/>
    </>
  )
}

export default ProductsModals;
