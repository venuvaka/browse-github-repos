import { ReactNode } from 'react';
import { render as rtlRender, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { GitHubRepoContainer } from './GitHubRepoContainer';
import { store } from '../../stateManagement/store';

const render = (component: ReactNode) => rtlRender(
    <Provider store={store}>
      {component}
    </Provider>
);

const server = setupServer(
    http.get('', ({ request, params, cookies }) => {
      return HttpResponse.json([
        {
            id: 1,
            owner: {
                avatar_url: ""
            }, 
            full_name: "test name", 
            description: "test description", 
            html_url: ""
        }
      ])
    }),
);
  
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
  

describe('Githu Repo Container', () => {
    test('it should should show heading', () => {
        render(<GitHubRepoContainer />);
        const element = screen.getByRole("heading", {level: 1, name: /Browse GitHub/i});
        expect(element).toBeInTheDocument();

    });

    test('it should show overlay on initial mount', async  () => {
        render(<GitHubRepoContainer/>);
        expect(screen.getByTestId("overlay")).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByTestId("listItem")).toBeGreaterThan(0);
        })
        expect(screen.getByTestId("overlay")).not.toBeInTheDocument();
    });
});
