import { useState } from 'react';
import './index.css';

function App() {
  const [queue, setQueue] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(null);
  const maxSize = 10;

  const push = () => {
    if (queue.length >= maxSize) {
      alert('Overflow: Queue is full!');
      return;
    }
    const num = parseInt(inputValue);
    if (isNaN(num)) {
      alert('Please enter a valid number!');
      return;
    }
    setAnimate('push');
    setTimeout(() => {
      setQueue([...queue, num]);
      setAnimate(null);
      setInputValue('');
    }, 500);
  };

  const pop = () => {
    if (queue.length === 0) {
      alert('Underflow: Queue is empty!');
      return;
    }
    setAnimate('pop');
    setTimeout(() => {
      setQueue(queue.slice(1));
      setAnimate(null);
    }, 500);
  };

  const peep = () => {
    if (queue.length === 0) {
      alert('No elements: Queue is empty!');
      return;
    }
    alert(`Front element: ${queue[0]}`);
  };

  return (
    <div className="p-4 max-w-md mx-auto min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-center">Queue Visualization</h1>
      <div className="mb-4">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a number"
          className="border p-2 mr-2 rounded w-40"
        />
        <button
          onClick={push}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
        >
          Push
        </button>
        <button
          onClick={pop}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
        >
          Pop
        </button>
        <button
          onClick={peep}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Peep
        </button>
      </div>
      <div className="flex justify-center relative">
        <div className="flex flex-col-reverse items-center">
          {queue.map((item, index) => (
            <div
              key={index}
              className={`w-16 h-16 flex items-center justify-center border-2 m-1 rounded ${
                index === 0 ? 'bg-yellow-300 border-yellow-500' : 'bg-gray-200 border-gray-400'
              } ${animate === 'push' && index === queue.length ? 'animate-slide-in' : ''} ${
                animate === 'pop' && index === 0 ? 'animate-slide-out-horizontal' : ''
              }`}
            >
              {item}
            </div>
          ))}
          {[...Array(maxSize - queue.length)].map((_, i) => (
            <div
              key={`empty-${i}`}
              className="w-16 h-16 border-2 border-dashed border-gray-300 m-1 rounded"
            ></div>
          ))}
        </div>
        {animate === 'pop' && queue.length > 0 && (
          <div className="hammer animate-hammer-swing">
            <div className="hammer-handle"></div>
            <div className="hammer-head">
              <div className="hammer-head-front"></div>
              <div className="hammer-head-side"></div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p><strong>Instructions:</strong></p>
        <p>- Queue front is at the bottom (yellow).</p>
        <p>- Push adds to the top, Pop removes from the bottom with a 3D hammer rotating from parallel to knock horizontally.</p>
        <p>- Peep shows the front element.</p>
        <p>- Max size: 10. Errors shown as alerts.</p>
      </div>
    </div>
  );
}

export default App;