export const requestsMock = [
  {
    id: 1,
    created_at: '2022-11-08T21:47:05.254Z',
    updated_at: '2022-11-08T21:47:05.254Z',
    user_id: 1,
    user_name: 'TEST',
    user_surname: 'surname',
    user_position: 'software_engineer',
    type: 'vacation',
    start_date: '2022-12-01',
    end_date: '2022-12-07',
    status: 'processing',
    comment: null,
    reviewer_id: 2,
    reviewer_name: 'MООООООООООО',
    reviewer_surname: 'Pavlenko',
    reviewer_position: 'hr',
  },
  {
    id: 1,
    created_at: '2022-11-08T21:47:05.254Z',
    updated_at: '2022-11-08T21:47:05.254Z',
    user_id: 1,
    user_name: 'TEST',
    user_surname: 'surname',
    user_position: 'software_engineer',
    type: 'sickness',
    start_date: '2022-11-25',
    end_date: '2022-11-28',
    status: 'accepted',
    comment: null,
    reviewer_id: 2,
    reviewer_name: 'MООООООООООО',
    reviewer_surname: 'Pavlenko',
    reviewer_position: 'hr',
  },
];

export const requestsStatisticMock = [
  {
    id: 1,
    name: 'MООООООООООО',
    surname: 'Pavlenko',
    requests: {
      '2020': [
        {
          id: 1,
          created_at: '2020-11-08T21:47:05.254Z',
          updated_at: '2020-11-08T21:47:05.254Z',
          user_id: 1,
          user_name: 'TEST',
          user_surname: 'surname',
          user_position: 'software_engineer',
          type: 'vacation',
          start_date: '2020-12-01',
          end_date: '2020-12-07',
          status: 'processing',
          comment: null,
          reviewer_id: 2,
          reviewer_name: 'MООООООООООО',
          reviewer_surname: 'Pavlenko',
          reviewer_position: 'hr',
        },
        {
          id: 2,
          created_at: '2020-11-08T21:47:05.254Z',
          updated_at: '2020-11-08T21:47:05.254Z',
          user_id: 1,
          user_name: 'TEST',
          user_surname: 'surname',
          user_position: 'software_engineer',
          type: 'vacation',
          start_date: '2020-12-01',
          end_date: '2020-12-07',
          status: 'processing',
          comment: null,
          reviewer_id: 2,
          reviewer_name: 'MООООООООООО',
          reviewer_surname: 'Pavlenko',
          reviewer_position: 'hr',
        },
      ],
      '2021': [
        {
          id: 3,
          created_at: '2021-11-08T21:47:05.254Z',
          updated_at: '2021-11-08T21:47:05.254Z',
          user_id: 1,
          user_name: 'TEST',
          user_surname: 'surname',
          user_position: 'software_engineer',
          type: 'vacation',
          start_date: '2021-12-01',
          end_date: '2021-12-07',
          status: 'processing',
          comment: null,
          reviewer_id: 2,
          reviewer_name: 'MООООООООООО',
          reviewer_surname: 'Pavlenko',
          reviewer_position: 'hr',
        },
        {
          id: 4,
          created_at: '2021-11-08T21:47:05.254Z',
          updated_at: '2021-11-08T21:47:05.254Z',
          user_id: 1,
          user_name: 'TEST',
          user_surname: 'surname',
          user_position: 'software_engineer',
          type: 'vacation',
          start_date: '2021-12-01',
          end_date: '2021-12-07',
          status: 'processing',
          comment: null,
          reviewer_id: 2,
          reviewer_name: 'MООООООООООО',
          reviewer_surname: 'Pavlenko',
          reviewer_position: 'hr',
        },
      ],
      '2022': [],
    },
  },
  {
    id: 6,
    name: 'MООООООООООО',
    surname: 'Pavlenko',
    requests: {
      '2020': [
        {
          id: 1,
          created_at: '2020-11-08T21:47:05.254Z',
          updated_at: '2020-11-08T21:47:05.254Z',
          user_id: 6,
          user_name: 'TEST',
          user_surname: 'surname',
          user_position: 'software_engineer',
          type: 'vacation',
          start_date: '2020-12-01',
          end_date: '2020-12-07',
          status: 'processing',
          comment: null,
          reviewer_id: 2,
          reviewer_name: 'MООООООООООО',
          reviewer_surname: 'Pavlenko',
          reviewer_position: 'hr',
        },
        {
          id: 2,
          created_at: '2020-11-08T21:47:05.254Z',
          updated_at: '2020-11-08T21:47:05.254Z',
          user_id: 6,
          user_name: 'TEST',
          user_surname: 'surname',
          user_position: 'software_engineer',
          type: 'vacation',
          start_date: '2020-12-01',
          end_date: '2020-12-07',
          status: 'processing',
          comment: null,
          reviewer_id: 2,
          reviewer_name: 'MООООООООООО',
          reviewer_surname: 'Pavlenko',
          reviewer_position: 'hr',
        },
      ],
      '2021': [],
      '2022': [],
    },
  },
];

export const warehouseRequestMock = [
  {
    id: 1,
    created_at: '2022-11-11T00:41:24.424Z',
    updated_at: '2022-11-11T00:41:24.424Z',
    user_id: 1,
    item_id: {
      id: 1,
      created_at: '2022-11-11T00:41:15.425Z',
      updated_at: '2022-11-11T00:41:15.425Z',
      item_status: 'free',
      comment: 'NEW_COMMENT11',
      item_condition_type: 'new',
      item_name: 'mouse -test',
      item_type: 'mouse',
      item_number: '44321',
      model_number: '55215771',
      item_price: '100.00',
      item_currency_value: 'usd',
      item_vendor_type: 'kraken',
    },
    status: 'processing',
    comment: 'I want this good mouse',
    user_name: 'TEST',
    user_surname: 'surname',
    user_position: 'software_engineer',
    reviewer_id: 13,
    reviewer_name: 'MООООООООООО',
    reviewer_surname: 'Pavlenko',
    reviewer_position: 'hr',
  },
];