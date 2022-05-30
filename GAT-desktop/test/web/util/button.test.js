import renderer from 'react-test-renderer';
import React from "react";
import Button from '../../../src/web/util/button';


describe("Test Button Component", () => {
    it('it displays children as text', () => {
        const child = "TEST";
        const button = renderer.create(<Button>{child}</Button>);
        expect(button.toJSON().children[0]).toEqual(child);
    });
})
