import { ReactNode } from 'react';
import { fireEvent, render as rtlRender, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../stateManagement/store';
import { Pagination } from '../Pagination/Pagination';

const render = (component: ReactNode) => rtlRender(
    <Provider store={store}>
      {component}
    </Provider>
  )

describe('Pagination component', () => {
    test('render Pagination container successfully', () => {
        render(<Pagination />);
        const element = screen.getByTestId("paginationContainer");
        expect(element).toBeInTheDocument();
    });

    test('Initial count to be 1', () => {
        render(<Pagination />);
        expect(screen.getByTestId("countLabel")).toHaveTextContent('1');
        expect(screen.getByTestId("decrement")).toBeDisabled();
    });

    test('Invoke increment button click and count value to be 2', () => {
        render(<Pagination />);
        const incrementBtn = screen.getByTestId("increment");
        expect(incrementBtn).toBeDefined();
        fireEvent.click(incrementBtn);
        expect(screen.getByTestId("countLabel")).toHaveTextContent('2');
        expect(screen.getByTestId("decrement")).toBeEnabled();
    });

    test('Invoke decrement button click and count value to be 1', () => {
        render(<Pagination />);
        const decrementBtn = screen.getByTestId("decrement");
        expect(decrementBtn).toBeDefined();
        fireEvent.click(decrementBtn);
        expect(screen.getByTestId("countLabel")).toHaveTextContent('1');
        expect(screen.getByTestId("decrement")).toBeDisabled();
    });
});
