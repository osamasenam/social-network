import BioEditor from './bioeditor.js';
import { render, fireEvent, waitFor } from '@testing-library/react';

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



test('Clicking the "Add" button causes a textarea and a "Submit" button to be rendered', () => {
    const {container} = render(<BioEditor />);

    fireEvent.click(
        container.querySelector("#add")
    );

    expect(container.querySelector("#submit")).toBeTruthy();
    expect(container.querySelector("#bioInput")).toBeTruthy();
});

test('Clicking the "Save" button causes an HTTP request', async () => {

    const setBioMock = jest.fn(()=> {});

    global.fetch = jest.fn(async () => {
        return { 
            async json(){ 
                return [{
                    bio: "new bio entered"
                }];
            } 
        };
    });

    const {container} = render(<BioEditor setBio={setBioMock} />);

    fireEvent.click(
        container.querySelector("#add")
    );

    fireEvent.click(
        container.querySelector("#submit")
    );

    
    
    
    expect(fetch.mock.calls.length).toBe(1);
    await waitFor(
        () => expect(setBioMock.mock.calls.length).toBe(1)
    );

});
