// material-ui
import { LoginOutlined } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  Stack,
  Typography,
} from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
};

const AuthFailureModal = ({ open, onClose }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      keepMounted
      maxWidth='xs'
      aria-labelledby='authorization-failure-title'
      aria-describedby='authorization-failure-description'
    >
      <DialogContent sx={{ mt: 2, my: 1 }}>
        <Stack alignItems='center' spacing={3.5}>
          <Avatar
            color='warning'
            sx={{ width: 72, height: 72, fontSize: '1.75rem' }}
          >
            <LoginOutlined />
          </Avatar>
          <Stack spacing={2}>
            <Typography variant='h4' align='center'>
              Login Required
            </Typography>
            <Typography align='center'>
              We&apos;ve encountered a problem with your session, and you need
              to login again to continue.
            </Typography>
          </Stack>

          <Stack direction='row' spacing={2} sx={{ width: 1 }}>
            <Button
              fullWidth
              onClick={onClose}
              color='secondary'
              variant='outlined'
            >
              Close
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AuthFailureModal;
