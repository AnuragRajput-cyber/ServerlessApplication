import { useEffect, useState } from "react";
import './App.css'; // thoda styling ke liye

function App() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://zb9lhfow77.execute-api.us-east-1.amazonaws.com/api/hello')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setMessage(data.message);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('No response From lambda');
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1>MERN App</h1>
      <h2>(Frontend on S3 + Backend on Lambda)</h2>

      <div className="card">
        {loading ? (
          <p>Loading data from Lambda...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <p className="success">Lambda Response: <strong>{message}</strong></p>
        )}
      </div>

      <footer>Powered by AWS Lambda & S3 </footer>
    </div>
  );
}

export default App;
