import React from 'react';
import moment from 'moment';
import { render, cleanup } from '@testing-library/react';
import Meta from './Meta';

describe('Meta', () => {
  const props = {
    date: '2020-09-03',
  };

  beforeEach(() => {
    cleanup();
  });

  it('Should show the date in the right format', () => {
    const { date } = props;
    const expectedDateFormat = moment(date).format('D MMM YYYY');
    const { getByTestId } = render(<Meta {...props} />);
    const meta = getByTestId('publish-meta');

    expect(meta.textContent).toContain(expectedDateFormat);
  });

  it('Should show the right status', () => {
    const { getByTestId } = render(<Meta {...props} />);
    const meta = getByTestId('publish-meta');
    expect(meta.textContent).toContain('Published');
  });
});
