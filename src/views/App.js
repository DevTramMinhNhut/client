import logo from './logo.svg';
import './App.scss';
import Welcome from './example/test';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Xin chao ban toi la nhut
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Welcome name='nhut' ho='tram' />
      </header>
    </div>
  );
}

export default App;
