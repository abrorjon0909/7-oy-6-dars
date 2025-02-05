import React, { useState } from 'react';
import { useQuery  } from 'react-query';

const fetchUsers = async (page) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=5&_page=${page}`);
  if (!res.ok) {
    throw new Error('Yuklashda xato yuz berdi');
  }
  return res.json();
};

const UsersList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery(['users', page], () => fetchUsers(page), { keepPreviousData: true });

  if (isLoading) return <div>Yuklanmoqda...</div>;
  if (isError) return <div>Yuklashda xato yuz berdi</div>;

  return (
    <div>
      <ul>
        {data.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>Oldingi</button>
      <button onClick={() => setPage(prev => prev + 1)}>Keyingi</button>
    </div>
  );
};

export default UsersList;