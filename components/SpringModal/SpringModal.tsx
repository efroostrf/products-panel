import { ReactNode } from 'react';
import { NextPage } from 'next';
import { Backdrop, Box, Modal } from '@mui/material';
import SpringFade from './SpringFade';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface Props {
  readonly children: ReactNode;
  readonly isActive: boolean;
  readonly timeout?: number;
  readonly sx?: any;
  readonly sxBox?: any;
  onClose: Function;
}

const SpringModal: NextPage<Props> = ({ children, isActive, timeout = 250, sx, sxBox = {}, ...props }) => {
  const close = () => {
    if (props.onClose) props.onClose();
  }

  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={isActive}
      onClose={close}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: timeout,
      }}
      sx={sx}
    >
      <SpringFade in={isActive}>
        <Box sx={{...style, ...sxBox}}>
          { children }
        </Box>
      </SpringFade>
    </Modal>
  )
}

export default SpringModal;
