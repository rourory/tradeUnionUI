import React from 'react';
import { TabPanel, Item } from 'devextreme-react/tab-panel';
import PersonMainInfo from '../PersonData/Main';
import PersonAddressInfo from '../PersonData/Address';
import PersonCommentInfo from '../PersonData/Comment';
import { useSelector } from 'react-redux';
import { personDetailsSelector, fetchByIdData } from '../../../redux/slices/person-details-slice';
import { AppDispatch } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { FetchingStatus } from '../../../@types/fetchingStatus';
import { useWhyDidYouUpdate } from 'ahooks';
import styles from './person-data-details.module.scss';
import CustomLoadingIndicator from '../../LoadingIndicator';
import { Payments } from '../PersonData/Payments';
import { PersonEntityDataType } from '../../../@types/personTypes';

const PersonDataDetails: React.FC = (props: any) => {
  const { data, fetchStatus } = useSelector(personDetailsSelector);
  const id: number = props.data.data.id;
  const dispatch = useDispatch<AppDispatch>();

  useWhyDidYouUpdate('PersonDataDetails', props);

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(fetchByIdData(id));
    }, 1000);
  }, []);

  const renderAddressComponent = (data: PersonEntityDataType) => {
    return data ? (
      <PersonAddressInfo
        data={{
          address: data.address,
          birthPlace: data.birthPlace,
          livePlace: data.livePlace,
          regPlace: data.regPlace,
        }}
      />
    ) : null;
  };

  const renderPersonMainInfo = (data: PersonEntityDataType) => {
    return data ? (
      <PersonMainInfo
        data={{
          education: data.education,
          phone: data.phone,
          maritalState: data.maritalState,
          citizenship: data.citizenship,
          nationality: data.nationality,
        }}
      />
    ) : null;
  };

  const renderPersonCommentInfo = (data: PersonEntityDataType) => {
    return data ? (
      <PersonCommentInfo
        data={{
          comment: data.comment,
        }}
      />
    ) : null;
  };

  const renderPaymentsInfo = (id: number | undefined) => {
    return id ? <Payments id={id} /> : null;
  };

  const renderContent = (status: FetchingStatus): JSX.Element => {
    switch (status) {
      case FetchingStatus.LOADING:
        return <CustomLoadingIndicator />;
      case FetchingStatus.SUCCESS:
        return (
          <div className={styles.person_details_tab_wrapper}>
            <TabPanel>
              <Item title={'Адрес'} render={() => renderAddressComponent(data)} />
              <Item title={'Основные'} render={() => renderPersonMainInfo(data)} />
              <Item title={'Комментарии'} render={() => renderPersonCommentInfo(data)} />
              <Item title={'Платежи'} render={() => renderPaymentsInfo(data?.id)} />
            </TabPanel>
          </div>
        );
      case FetchingStatus.ERROR:
        return <>Что то пошло не так :(</>;
      case FetchingStatus.VALIDATION_ERROR:
        return <>Что то пошло не так :(</>;
    }
  };

  return renderContent(fetchStatus);
};

export default PersonDataDetails;
