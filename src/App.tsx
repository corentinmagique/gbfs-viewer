import React from 'react';

import Gbfs from './Types/GBFS/Gbfs';
import useGbfs  from './Loader/useGbfs';

const App = () : React.JSX.Element => {

  const {loading, status, gbfs } = useGbfs("https://gbfs.citibikenyc.com/gbfs/2.3/gbfs.json");
  console.log(gbfs)
  return (
    <div className="App">
      {
        loading ? <h1>Loading ....</h1> : <h1>Loaded !! {status}</h1> 
      }
    </div>
  );
}

export default App;
