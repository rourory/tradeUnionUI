import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
      {'Copyright © '}
      <Link to="http://localhost:3000/">Trade Unions</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
