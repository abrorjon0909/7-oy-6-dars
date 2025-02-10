import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "./App.css";

const fetchUsers = async (page) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/users?_limit=5&_page=${page}`
  );
  return data;
};

const fetchPost = async (id) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return data;
};

export default function App() {
  const [page, setPage] = useState(1);
  const [postId, setPostId] = useState(null);

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchUsers(page),
    keepPreviousData: true,
  });

  const { data: post, isFetching: isPostLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPost(postId),
    enabled: !!postId,
  });

  return (
    <div className="container">
      <fieldset className="fielset">
        <h1 className="h1">Foydalanuvchilar</h1>
        {isLoading && <p>Yuklanmoqda... ✈️</p>}
        {error && <p>Xatolik yuz berdi</p>}
        <ul>
          {users?.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
        <button
          className="button"
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
        >
          Oldingi ⬅️
        </button>
        <button className="button" onClick={() => setPage((p) => p + 1)}>
          Keyingi ➡️
        </button>
      </fieldset>
      <fieldset className="fielset">
        <h2 className="h1">Post tafsilotlari</h2>
        <input
          className="input"
          type="number"
          onChange={(e) => setPostId(Number(e.target.value))}
          placeholder="Post ID kiriting"
        />
        <div>
          {isPostLoading ? (
            <p>Yuklanmoqda...</p>
          ) : (
            <mark className="mark">{post?.title}...</mark>
          )}
        </div>
      </fieldset>
    </div>
  );
}
