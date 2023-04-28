import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function RentedItems() {
  const [rentedItems, setRentedItems] = useState([]);
  const router = useRouter();
  const { customerId } = router.query;

  useEffect(() => {
    if (customerId) {
      fetch(`http://localhost:8081/return/rentedItems/${customerId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => setRentedItems(data))
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [customerId]);

  return (
    <div>
      <h1>Rented Items</h1>
      {rentedItems.map((item) => (
        <div key={item.itemId}>
          <h2>{item.name}</h2>
          <p>Quantity: {item.quantity}</p>
          <p>Return By: {item.returnByDate}</p>
          <button onClick={() => router.push(`/return/itemClicked/${customerId}/${item.itemId}`)}>
            View Item
          </button>
        </div>
      ))}
    </div>
  );
}