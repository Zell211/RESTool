import React from 'react';
import { create } from 'react-test-renderer';

import { Table } from './table.comp';

describe('Table', () => {

  test('should render', () => {
    create(<Table
      items={[]}
      callbacks={{
        delete: null,
        put: null,
        details: null,
        action: (item, action) => { },
        getPreviousPage: null,
        getNextPage: null,
      }}
      fields={[]}
    />);
  });

});
