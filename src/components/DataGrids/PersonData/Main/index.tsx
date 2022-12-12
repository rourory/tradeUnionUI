import { SelectBox, TextBox } from 'devextreme-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { PersonDetailsMainType } from '../../../../@types/personTypes';
import { classificationsSelector } from '../../../../redux/slices/classification-slice';

const PersonMainInfo: React.FC<PersonDetailsMainType> = ({ data }) => {
  const { maritalState } = useSelector(classificationsSelector);
  return (
    <div className="dx-fieldset">
      <div className="dx-field">
        <div className="dx-field-label">Образование</div>
        <div className="dx-field-value">
          <TextBox
            value={data.education ? data.education : ''}
            placeholder={'Информация отсутствует'}
            readOnly
            disabled={data.education ? false : true}
          />
        </div>
      </div>
      <div className="dx-field">
        <div className="dx-field-label">Телефон</div>
        <div className="dx-field-value">
          <TextBox
            value={data.phone ? data.phone : ''}
            placeholder={'Информация отсутствует'}
            readOnly
            disabled={data.phone ? false : true}
            mask="+375(XX)000-00-00"
            maskRules={{ X: /[1-9]/ }}
          />
        </div>
      </div>
      <div className="dx-field">
        <div className="dx-field-label">Семейное положение</div>
        <div className="dx-field-value">
          <SelectBox
            value={data.maritalState}
            items={maritalState}
            displayExpr="name"
            valueExpr="id"
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
            disabled={data.citizenship ? false : true}
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
            disabled={data.nationality ? false : true}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonMainInfo;
