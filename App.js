import {BrowserRouter ,Routes ,Route} from 'react-router-dom';

//pages & component 
import signup from './pages/signup';
function App() {
  return (

    <div className="App">
      <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route path="/" element={<signup/>}/>
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
