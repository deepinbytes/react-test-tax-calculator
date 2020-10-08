import React from 'react';
import renderer from 'react-test-renderer';

import TaxBracket from './TaxBracket';

it('taxbracket renders correctly', () => {
    const tree = renderer.create(<TaxBracket />).toJSON();
    expect(tree).toMatchSnapshot();
});