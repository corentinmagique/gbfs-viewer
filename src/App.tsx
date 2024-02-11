import React from 'react';

import useGbfs  from './Loader/useGbfs';

const App = () : React.JSX.Element => {

  const {loading, status, gbfs } = useGbfs("https://gbfs.citibikenyc.com/gbfs/2.3/gbfs.json");
  console.log(gbfs)
  return (
    <div className="App">
      {
        loading ? <h1>Loading ....</h1> : <h1>Loaded !! {status}</h1> 
      }
      {
        !loading && <>
          <h1>Available languages : </h1>
          <ul>
            {
              gbfs?.languages?.map((lang, index)=>
                <li key={index}>
                  {lang}
                </li>
              )
            }
          </ul>
        </>
      }
    </div>
  );
}

export default App;
