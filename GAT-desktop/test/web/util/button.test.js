import renderer from 'react-test-renderer';
import React from "react";
import Button from '../../../src/web/util/button';
import {render, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";


describe("Test Button Component", () => {
    it('it displays children as text', () => {
        const child = "TEST";
        const button = renderer.create(<Button>{child}</Button>);
        expect(button.toJSON().children[0]).toEqual(child);
    });

    it('it calls supplied onclick method on click',  () => {
        const callBack = jest.fn();
        render(
            <Button onClick={callBack}>TEST</Button>
        );
        userEvent.click(screen.getByText("TEST"));
        expect(callBack).toHaveBeenCalled();
    });
})
