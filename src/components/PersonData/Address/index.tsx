import React from 'react';
import { PersonDetailsAddressType } from '../../componentTypes/personTypes';
import { TextBox } from 'devextreme-react';

const PersonAddress: React.FC<PersonDetailsAddressType> = ({ data }) => {
  return (
    <div className="dx-fieldset">
      <div className="dx-field">
        <div className="dx-field-label">Адрес</div>
        <div className="dx-field-value">
          <TextBox
            value={data.address ? data.address : ''}
            placeholder={'Информация отсутствует'}
            readOnly
          />
        </div>
      </div>
      <div className="dx-field">
        <div className="dx-field-label">Регистрация</div>
        <div className="dx-field-value">
          <TextBox
            value={data.regPlace ? data.regPlace : ''}
            placeholder={'Информация отсутствует'}
            readOnly
          />
        </div>
      </div>
      <div className="dx-field">
        <div className="dx-field-label">Место жительства</div>
        <div className="dx-field-value">
          <TextBox
            value={data.livePlace ? data.livePlace : ''}
            placeholder={'Информация отсутствует'}
            readOnly
          />
        </div>
      </div>
      <div className="dx-field">
        <div className="dx-field-label">Место рожд ения</div>
        <div className="dx-field-value">
          <TextBox
            value={data.birthPlace ? data.birthPlace : ''}
            placeholder={'Информация отсутствует'}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default PersonAddress;
