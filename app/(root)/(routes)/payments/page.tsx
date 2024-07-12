'use client'
import { useState } from 'react';

export default function PaymentsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');

  const handlePayment = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/portal', {
        method: 'POST',
      });
      const data = await response.json();
      if (response.ok) {
        setUrl(data.url);
        window.location.href = data.url;
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Payments Page</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Go to Stripe Billing Portal'}
      </button>
    </div>
  );
}
