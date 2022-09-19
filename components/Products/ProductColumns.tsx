import { GridCellParams, GridCellValue, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import ReactTimeAgo from 'react-time-ago';
import styles from 'styles/Products.module.scss';

const ProductsColumns: GridColDef[] = [
  { 
    field: 'image',
    headerClassName: styles.imageHeader,
    maxWidth: 50,
    renderCell: (params: GridRenderCellParams) => (
      <a className={styles.imageButton} href={params.value} target="_blank">
        <img src={params.value} width="50" height="50" alt="Image"/>
      </a>
    )
  },
  {
    headerName: 'Name',
    field: 'name',
    flex: 1,
    editable: true,
    valueParser: (value: GridCellValue, params: GridCellParams) => {
      if (value === '') return params.value;
      return value;
    }
  },
  { headerName: 'Category', field: 'categoryName', flex: 1, },
  { 
    headerName: 'Barcode',
    field: 'barcode',
    flex: 1,
    editable: true,
    valueParser: (value: GridCellValue, params: GridCellParams) => {
      value = String(value).replace(/[^0-9]/g, '');
      if (value === '') return params.value;
      return value;
    }
  },
  { 
    field: 'createdAt',
    headerName: 'Created',
    headerAlign: 'center',
    align: 'center',
    type:'date',
    maxWidth: 150,
    flex: 0.8,
    renderCell: (params: GridRenderCellParams) => (
      <ReactTimeAgo date={params.value} locale="en-US"/>
    )
  },
  { 
    field: 'updatedAt', 
    headerName: 'Updated', 
    headerAlign: 'center',
    align: 'center',
    type: 'date', 
    maxWidth: 150,
    flex: 0.8,
    renderCell: (params: GridRenderCellParams) => (
      <ReactTimeAgo date={params.value} locale="en-US"/>
    )
  }
];

export default ProductsColumns;
