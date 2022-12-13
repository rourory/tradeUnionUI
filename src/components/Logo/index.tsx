import { Icon } from '@mui/material';
import React from 'react';
import logo from './logo.png';

type LogoType = {
  height: number;
};
const Logo: React.FC<LogoType> = ({ height }) => {
  return <img style={{ height: height }} src="/img/logo.png" alt="logo" />;
};
export default Logo;
