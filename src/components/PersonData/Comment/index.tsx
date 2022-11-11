import { TextArea } from 'devextreme-react';
import React from 'react';
import { PersonDetailsCommentType } from '../../componentTypes/personTypes';

const PersonCommentInfo: React.FC<PersonDetailsCommentType> = ({ data }) => {
  return (
    <div className="dx-fieldset">
      <TextArea
        height={190}
        value={data.comment}
        placeholder="Информация отсутствует"
        label="Дополнительная информация"
      />
    </div>
  );
};

export default PersonCommentInfo;
