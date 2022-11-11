import { TextBox } from 'devextreme-react';
import React from 'react';
import { PersonDetailsMainType } from '../../componentTypes/personTypes';

const PersonMainInfo: React.FC<PersonDetailsMainType> = ({ data }) => {
  return (
    <div className="dx-fieldset">
      <div className="dx-field">
        <div className="dx-field-label">Образование</div>
        <div className="dx-field-value">
          <TextBox
            value={data.education ? data.education : ''}
            placeholder={'Информация отсутствует'}
            readOnly
          />
        </div>
      </div>
      <div className="dx-field">
        <div className="dx-field-label">Регистрация</div>
        <div className="dx-field-value">
          <TextBox
            value={data.phone ? data.phone : ''}
            placeholder={'Информация отсутствует'}
            readOnly
          />
        </div>
      </div>
      <div className="dx-field">
        <div className="dx-field-label">Семейное положение</div>
        <div className="dx-field-value">
          <TextBox
            value={data.maritalState ? data.maritalState.toString() : ''}
            placeholder={'Информация отсутствует'}
            readOnly
          />
        </div>
      </div>
      <div className="dx-field">
        <div className="dx-field-label">Гражданство</div>
        <div className="dx-field-value">
          <TextBox
            value={data.citizenship ? data.citizenship : ''}
            placeholder={'Информация отсутствует'}
            readOnly
          />
        </div>
      </div>{' '}
      <div className="dx-field">
        <div className="dx-field-label">Национальность</div>
        <div className="dx-field-value">
          <TextBox
            value={data.nationality ? data.nationality : ''}
            placeholder={'Информация отсутствует'}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default PersonMainInfo;
