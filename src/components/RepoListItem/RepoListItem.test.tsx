import { ReactNode } from 'react';
import { fireEvent, render as rtlRender, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../stateManagement/store';
import { RepoListItem } from './RepoListItem';
import { RepoListType } from '../../types';

const mockListItem: RepoListType = {
    id: 1,
    owner: {
        avatar_url: ""
    }, 
    full_name: "test name", 
    description: "test description", 
    html_url: ""
};

const render = (component: ReactNode) => rtlRender(
    <Provider store={store}>
      {component}
    </Provider>
)

describe('RepoListItem component', () => {
    test('render RepoListItem component successfully', () => {
        render(<RepoListItem {...mockListItem}/>);
        const element = screen.getByTestId("listItem");
        expect(element).toBeInTheDocument();
        expect(screen.getByAltText("avatar")).toBeInTheDocument();
        expect(screen.getByTestId("repoName")).toHaveTextContent(mockListItem.full_name);
        expect(screen.getByTestId("repoDescription")).toHaveTextContent(mockListItem.description);
    });
    
    test('displays repo details', () => {
        render(<RepoListItem {...mockListItem}/>);
        expect(screen.getByAltText("avatar")).toBeInTheDocument();
        expect(screen.getByTestId("repoName")).toHaveTextContent(mockListItem.full_name);
        expect(screen.getByTestId("repoDescription")).toHaveTextContent(mockListItem.description);
    });
});
