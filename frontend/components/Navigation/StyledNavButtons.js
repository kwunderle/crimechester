import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledNavButton = styled(Button)(({ theme }) => ({
  color: '#feefce',
  '&:hover': {
    backgroundColor: '#292016',
  },
  '&.Mui-selected': {
    backgroundColor: '#835d3c',
  },
  '&.Mui-disabled': {
    color: '#000',
    backgroundColor: 'firebrick',
  },
  '&:visited': {
    color: '#feefce',
  },
}));

export default StyledNavButton;