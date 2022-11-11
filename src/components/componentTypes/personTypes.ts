export type PersonDetailsAddressType = {
  data: {
    address: string | null | undefined;
    birthPlace: string | null | undefined;
    livePlace: string | null | undefined;
    regPlace: string | null | undefined;
  };
};

export type PersonDetailsMainType = {
  data: {
    education: string | null | undefined;
    phone: string | null | undefined;
    maritalState: string | undefined;
    citizenship: string | null | undefined;
    nationality: string | null | undefined;
  };
};

export type PersonDetailsCommentType = {
  data: {
    comment: string | undefined;
  };
};

export type PersonEntityDetails = {
  mainData: {
    id: number | undefined;
    lastName: string | undefined;
    firstName: string | undefined;
    middleName: string | undefined;
    birthDate: string | undefined;
    education: string | null | undefined;
    phone: string | null | undefined;
    maritalState: string | undefined;
    citizenship: string | null | undefined;
    nationality: string | null | undefined;
    comment: string | undefined;
    address: string | null | undefined;
    birthPlace: string | null | undefined;
    livePlace: string | null | undefined;
    regPlace: string | null | undefined;
  };
};
