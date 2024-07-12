import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledNavButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
  '&.Mui-disabled': {
    color: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  '&:visited': {
    color: '#fff',
  },
}));

export default StyledNavButton;