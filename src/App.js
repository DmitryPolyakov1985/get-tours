import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'

const url = 'https://course-api.com/react-tours-project'
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = id => {
    const newTours = tours.filter(tour => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async(url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const tours = await res.json();
      setTours(tours);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTours(url);
  }, []);

  if(isLoading) {
    return(
      <main>
        <Loading />
      </main>
    );
  }

  if(tours.length === 0) {
    return(
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className='btn' onClick={() => fetchTours(url)}>get tours</button>
        </div>
      </main>
    );
  }

  return(
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App
