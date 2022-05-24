import React from 'react';
import spinner from '../image/loader.gif';

function Spinner() {
  return (
    <>
      <div>
          <img src={spinner} alt="" className='d-block m-auto' width={100} />
      </div>
    </>
  );
}

export default Spinner;
