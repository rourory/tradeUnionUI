import React from 'react';
import { Link } from 'react-router-dom';
import styles from './appLink.module.scss';

type AppLinkType = {
  to: string;
  color: string;
  fontSize: string;
  text: string;
};

const AppLink: React.FC<AppLinkType> = ({ to, color = undefined, fontSize, text }) => {
  return (
    <span className={styles.appLink}>
      <Link style={{ color: `${color}`, fontSize: `${fontSize}`, textDecoration: 'none' }} to={to}>
        <p>{text}</p>
      </Link>
    </span>
  );
};

export default AppLink;
