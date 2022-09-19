import { NextPage } from 'next';
import { Stack, Typography, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

interface Props {
  readonly title: string;
  readonly sx?: any;
  onClose: () => void | void;
}

const ModalHeader: NextPage<Props> = ({ title = "Action required", sx = {}, onClose = function() {}, ...props }) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" pb="15px" sx={sx} {...props}>
      <Typography variant="h5" align="center">{ title }</Typography>
      <IconButton edge="end" onClick={onClose}>
        <Close/>
      </IconButton>
    </Stack>
  )
}

export default ModalHeader;
