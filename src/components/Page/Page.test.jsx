import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Page from './Page';

describe('Page', () => {
  const props = {
    children: <div> some very important subject like Clojure.</div>,
    title: 'Amazing title',
  };

  beforeEach(() => {
    cleanup();
  });

  it('Should scroll to the View', () => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    const { getByTestId } = render(<Page {...props} />);
    getByTestId('page-container');
    expect(scrollIntoViewMock).toBeCalled();
  });

  it('Should show the title', () => {
    const { getByText } = render(<Page {...props} />);
    getByText(props.title);
  });

  it('Should not show the title', () => {
    const propsWithoutTitle = { ...props, title: null };
    const { queryByText } = render(<Page {...propsWithoutTitle} />);

    expect(queryByText(props.title)).toBe(null);
  });

  it('Should show the page body', () => {
    const { getByText } = render(<Page {...props} />);
    getByText('some very important subject like Clojure.');
  });
});
