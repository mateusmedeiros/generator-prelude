import { assert } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import App from 'containers/app';

function setup(children) {
  return shallow(
    <App>
      {children}
    </App>
  );
}

describe('<App />', () => {
  it('should render children', () => {
    const component = setup("div");
    assert.equal(component.length, 1);
  });
});
