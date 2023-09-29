import './App.css';
import Project from "./component/Project/Project"
import { Provider } from 'react-redux';
import store from "./store/store.js"
function App() {
  return (
    <Provider store={store }>
      <Project/>
    </Provider >
  );
}

export default App;
