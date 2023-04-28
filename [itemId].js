// shows the item clicked by the customer, so it return the info for the customer id and item id
// gives the customer two buttons one for feedback oen for return


import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ItemClicked() {
  const [rentedItem, setRentedItem] = useState(null);
  const router = useRouter();
  const { customerId, itemId } = router.query;

  useEffect(() => {
    if (customerId && itemId) {
      fetch(`http://localhost:8081/return/itemClicked/${customerId}/${itemId}`)
        .then((response) => response.json())
        .then((data) => setRentedItem(data));
    }
  }, [customerId, itemId]);

  if (!rentedItem) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{rentedItem.name}</h1>
      <p>Quantity: {rentedItem.quantity}</p>
      <p>Return By: {rentedItem.returnByDate}</p>
      <button onClick={() => router.push(`/feedback/${customerId}/${itemId}`)}>Give Feedback</button>
      <button onClick={() => router.push(`/return/returned?customerId=${customerId}&itemId=${itemId}`)}>Return Item</button>
    </div>
  );
}