import React from 'react';
import { TabPanel, Item } from 'devextreme-react/tab-panel';
import PersonMainInfo from '../PersonData/Main';
import PersonAddress from '../PersonData/Address';
import { useSelector } from 'react-redux';
import { personDetailsSelector, fetchByIdData } from '../../redux/slices/personDetailsSlice';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';

const PersonDataDetails: React.FC = (props: any) => {
  const { data } = useSelector(personDetailsSelector);
  const id: number = props.data.data.id;
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(fetchByIdData(id));
  }, []);

  const renderAddressComponent = () => {
    return data ? (
      <PersonAddress
        data={{
          address: data.address,
          birthPlace: data.birthPlace,
          livePlace: data.livePlace,
          regPlace: data.regPlace,
        }}
      />
    ) : null;
  };

  const renderPersonMainInfo = () => {
    return data ? (
      <PersonMainInfo
        data={{
          education: data.education,
          phone: data.phone,
          maritalState: data.maritalState,
          citizenship: data.citizenship,
          nationality: data.nationality,
          comment: data.comment,
        }}
      />
    ) : null;
  };
  return (
    <>
      <TabPanel>
        <Item title={'Адрес'} render={renderAddressComponent} />
        <Item title={'Основные'} render={renderPersonMainInfo} />
      </TabPanel>
    </>
  );
};

export default PersonDataDetails;
