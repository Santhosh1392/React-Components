import './App.css';
import { ToastMessage, ToggleSwitch } from './components';

const App = () =>{
  return (
    <div className="App">
      <h3>Toggle Switch</h3>
      <ToggleSwitch />
      <ToastMessage
        title="Success Toast!"
        description="Checking toast functionality"
        toastType="info"
      />
    </div>
  );
}

export default App;
