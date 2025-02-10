import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import './post.css'

export default function PostForm() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
  
    const createPost = async (newPost) => {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      if (!response.ok) {
        throw new Error("Postni yaratishda xatolik yuz berdi");
      }
      return response.json();
    };
  
    const mutation = useMutation({
      mutationFn: createPost,
      onSuccess: (data) => {
        toast.success("Post muvaffaqiyatli yaratildi!");
        queryClient.invalidateQueries(["posts"]);
        setTitle("");
        setBody("");
      },
      onError: () => {
        toast.error("Xatolik yuz berdi, qayta urinib ko'ring!");
      },
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!title.trim() || !body.trim()) {
        toast.error("Iltimos, barcha maydonlarni to'ldiring!");
        return;
      }
      mutation.mutate({ title, body });
    };
  
    return (
      <div className="post">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-3">Yangi Post Yaratish</h2>
          <fieldset className="fielset" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Sarlavha"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
            />
            <input
              placeholder="Post mazmuni"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="input"
            />
            <button type="submit" disabled={mutation.isLoading} className="button">
              {mutation.isLoading ? "Yuklanmoqda..." : "Yaratish"}
            </button>
          </fieldset>
        </div>
      </div>
    );
  }
