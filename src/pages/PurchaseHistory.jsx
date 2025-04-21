import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PurchaseHistory() {
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/purchase-history');
        setPurchaseHistory(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching purchase history:', error);
        setError('Failed to load purchase history. Please try again later.');
      }
    };

    fetchPurchaseHistory();
  }, []);

  return (
    <div className='p-10 border'>
      <h1 className='text-2xl font-bold mb-5'>Purchase History</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-5">
          {purchaseHistory.map((history) => (
            <div key={history._id} className="border p-5 rounded shadow">
              <h2 className="text-xl font-semibold mb-3">History #{history.historyNumber}</h2>
              <p className="text-gray-500 mb-3">Date: {new Date(history.createdAt).toLocaleDateString()}</p>
              <ul className="space-y-3">
                {history.items.map((item) => (
                  <li key={item.id} className="flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded" />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.smallDescription}</p>
                      <p className="text-sm font-semibold">Price: ${item.price.toFixed(2)}</p>
                      <p className="text-sm">Quantity: {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
