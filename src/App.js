import React, { useState } from 'react';
import ColorPicker from "./components/colorpicker";

function App() {

  const [value, setValue] = useState('#fbc02d');

  const [colors] = useState([
    {
      name: 'red',
      hex: 'd32f2f'
    },
    {
      name: 'yellow',
      hex: 'fbc02d'
    },
    {
      name: 'green',
      hex: '388e3c'
    },
    {
      name: 'blue',
      hex: '1976d2'
    }
  ]);

  const onChange = (hex) => {
    setValue(`#${hex}`)
  }

  return (
    <div className="App" style={{ backgroundColor: value }}>
      <ColorPicker value={value} colors={colors} onChange={onChange}/>
    </div>
  );
}

export default App;
