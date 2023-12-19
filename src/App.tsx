import { Provider } from 'react-redux';
import './App.css';
import { GitHubRepoContainer } from './components/GitHubRepoContainer/GitHubRepoContainer';
import { store } from './stateManagement/store';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Provider store={store}>
          <GitHubRepoContainer />
        </Provider>
      </header>
    </div>
  );
}

export default App;
