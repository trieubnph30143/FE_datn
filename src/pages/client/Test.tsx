import React, { useRef } from 'react';


const CaptureComponent = () => {
  

  

  return (
    <div>
      <div
        
        style={{
          width: '300px',
          height: '200px',
          border: '1px solid black',
          padding: '10px',
          backgroundColor: '#f0f0f0',
        }}
      >
        <h2>This is the area to capture</h2>
        <p>Only this area will be captured as an image.</p>
      </div>
      
    </div>
  );
};

export default CaptureComponent;