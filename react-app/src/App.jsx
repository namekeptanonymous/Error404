/* eslint-disable no-unused-vars */
import React,{ useState } from 'react'; // Ensure React and useState are imported
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import styles from './App.css'; // Adjusted import for CSS module
import ChannelMembers from './ChannelMembers'; // Assuming ChannelMembers is in the same directory

function App() {
  // eslint-disable-next-line no-undef
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {/* Here is where we add the ChannelMembers component to be rendered */}
      <ChannelMembers />
    </>
  );
}

export default App;
