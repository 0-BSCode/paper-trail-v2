import { useState } from 'react';

import './App.css';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App() {
  const [count, setCount] = useState(0);

  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

export default App;
