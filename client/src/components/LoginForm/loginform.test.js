/* @jest-environment jsdom */
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { LoginForm } from './index'
import { loginFunction } from '../../actions';
import axios from 'axios'


describe('LoginForm', () => {

    beforeEach(() => {
        render (<LoginForm />, {wrapper: MemoryRouter})
    })

    test('it renders a form', () => {
        const form = screen.getByRole('form');
        expect(form).toBeInTheDocument();
    })

    test('updates username state on user typing', async() => {
        const username = screen.getByLabelText('Username')
        await waitFor(()=>userEvent.type(username, 'u'))
        expect(username).toHaveValue('u')
        await waitFor(()=>userEvent.type(username, 's'))
        expect(username).toHaveValue('us')
        await waitFor(()=>userEvent.type(username, 'e'))
        expect(username).toHaveValue('use')
        await waitFor(()=>userEvent.type(username, 'r'))
        expect(username).toHaveValue('user')
    })

    test('updates password state on user typing', async() => {
        const password = screen.getByLabelText('Password')
        await waitFor(()=>userEvent.type(password, 'h'))
        expect(password).toHaveValue('h')
        await waitFor(()=>userEvent.type(password, 'e'))
        expect(password).toHaveValue('he')
        await waitFor(()=>userEvent.type(password, 'y'))
        expect(password).toHaveValue('hey')
    })

    
    // test('on submit a loading message renders', async() => {
    //     const username = screen.getByLabelText('Username')
    //     const password = screen.getByLabelText('Password')
    //     await waitFor(() => userEvent.type(username ,'username'))
    //     await waitFor(() => userEvent.type(password, 'password{enter}'))
    //     const loading = screen.getByTestId('loading')
    //     expect(loading).toBeInTheDocument()
    // })
   

    // test('onSubmit is called when submit button is clicked', async() => {
    //     const onSubmit = jest.fn
    //     const submit = screen.getByLabelText('Submit')
    //     await waitFor(()=>userEvent.click(submit))
    //     expect(onSubmit.mock.calls.length).toBe(1)
        
    // })


    test('onSubmit is called when submit button is clicked', async() => {
        const onSubmit = jest.fn()
        const submit = screen.getByLabelText('Submit')
        await waitFor(()=>userEvent.click(submit), { timeout: 5000 })
        expect(onSubmit).toHaveBeenCalled()
        
    })

})


