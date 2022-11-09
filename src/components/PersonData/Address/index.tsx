import React from 'react';
import { PersonDetailsAddressType } from '../../componentTypes/personTypes';
import { Form, Item, SimpleItem } from 'devextreme-react/form';
import { TextBox } from 'devextreme-react';

const PersonAddress: React.FC<PersonDetailsAddressType> = ({ data }) => {
  console.log(data);
  return (
    <div className="dx-fieldset">
      <div className="dx-field">
        <div className="dx-field-label">Адрес</div>
        <div className="dx-field-value">
          <TextBox value={data.address ? data.address : ''} placeholder={'Введите адрес...'} />
        </div>
      </div>
      <div className="dx-field">
        <div className="dx-field-label">Регистрация</div>
        <div className="dx-field-value">
          <TextBox
            value={data.regPlace ? data.regPlace : ''}
            placeholder={'Введите место регистрации...'}
          />
        </div>
      </div>
      <div className="dx-field">
        <div className="dx-field-label">Место жительства</div>
        <div className="dx-field-value">
          <TextBox
            value={data.livePlace ? data.livePlace : ''}
            placeholder={'Введите место жительства...'}
          />
        </div>
      </div>
      <div className="dx-field">
        <div className="dx-field-label">Место рожд ения</div>
        <div className="dx-field-value">
          <TextBox
            value={data.birthPlace ? data.birthPlace : ''}
            placeholder={'Введите место рождения...'}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonAddress;
