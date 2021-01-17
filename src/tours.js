import React, { useState, useEffect } from 'react';

const url = 'https://course-api.com/react-tours-project';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [descLength, setDescLength] = useState(300);
  const [show, setShow] = useState('Read More');

  const getTours = async () => {
    const tours = await fetch(url).then((res) => res.json());
    setTours(tours);
  };

  useEffect(() => {
    getTours();
    return undefined;
  }, []);

  const removeTour = (id) => {
    return tours.filter((tour) => tour.id !== id);
  };
  return (
    <>
      {tours.map((tour) => {
        const { image, info, id, price, name } = tour;
        const desc = info.slice(0, descLength);

        return (
          <div className='tour' key={id}>
            <img src={image} alt={name} />
            <h4>{name}</h4>
            <h5>$ {price}</h5>
            <p>
              {desc}...
              <span
                onClick={() => {
                  setDescLength(descLength === 300 ? info.length : 300);
                  setShow(show === 'Read More' ? 'Show Less' : 'Read More');
                }}
              >
                {show}
              </span>
            </p>
            <button onClick={() => setTours(removeTour(id))}>
              Not Interested
            </button>
          </div>
        );
      })}
      {!tours.length && <button onClick={() => getTours()}>Refresh</button>}
    </>
  );
};

export default Tours;
