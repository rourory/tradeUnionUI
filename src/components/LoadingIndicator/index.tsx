import { LoadIndicator } from 'devextreme-react';
import React from 'react';
import styles from './lodaing_indicator.module.scss';

const CustomLoadingIndicator: React.FC = () => {
  return (
    <div className={styles.load_person_details}>
      <LoadIndicator indicatorSrc="/Loading.svg" />
    </div>
  );
};

export default CustomLoadingIndicator;
