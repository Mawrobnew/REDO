import logo from './logo.svg';
import './App.css';
import DataList from './component/DataList';
import Menu from './component/Menu';

function App() {
  return (
    <div className="App">
      <div id='prueba'>
        <Menu/>
        <DataList></DataList>
      </div>
    </div>
  );
}

export default App;
