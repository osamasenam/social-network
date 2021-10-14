import BioEditor from './bioeditor.js';
import { render, fireEvent } from '@testing-library/react';

test('When no bio is passed to it, an "Add" button is rendered', () => {
    const {container} = render(<BioEditor />);

    expect(
        container.querySelector('button')).toBeTruthy();
});

test('When a bio is passed to it, this bio shows up', () => {
    const {container} = render(<BioEditor bio="test bio"/>);

    expect(
        container.querySelector('h2').innerHTML).toContain("Latest Update: test bio");
});