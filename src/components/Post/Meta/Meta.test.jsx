import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { formatDate } from '../../../utils';
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
    const expectedDateFormat = formatDate({ date, mask: 'D MMM YYYY'});
    const { getByTestId } = render(<Meta {...props} />);
    const meta = getByTestId('publish-meta');

    expect(meta.textContent).toContain(expectedDateFormat);
  });

  it('Should show the right status', () => {
    const { getByTestId } = render(<Meta {...props} />);
    const meta = getByTestId('publish-meta');
    expect(meta.textContent).toBe("Published 3 Sep 2020");
  });
});
