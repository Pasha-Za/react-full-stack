import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom'
import Note from './Note';

test('Note', () => {
    const note = {
        important: true,
        content: 'some text'
    }
    const mockHandler = jest.fn();

    const component = render(<Note note={note} toggleImportance={mockHandler}/>)
    const button = component.container.querySelector('button');

    // component.debug()
    fireEvent.click(button)


    expect(component.container).toHaveTextContent('some text')
    expect(mockHandler.mock.calls.length).toBe(1);
})