import React, { useEffect, useState } from "react";
import { getAllFromDB, putToDB, clearDB } from "./utils/indexedDB";

type Post = {
  id: number;
  title: string;
  body: string;
};

const App: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Try to load data from IndexedDB first
      const cachedData = await getAllFromDB<Post>("posts");
      if (cachedData.length > 0) {
        setData(cachedData);
        setLoading(false);
      } else {
        // If no data in IndexedDB, fetch from network
        try {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts"
          );
          const result: Post[] = await response.json();

          // Store data in IndexedDB
          await clearDB("posts");
          result.forEach(async (item) => {
            await putToDB("posts", item);
          });

          // Update state
          setData(result);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        }
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h1>Welcome to My PWA App</h1>
      <p>This is a simple Vite + React PWA with a cache-first strategy.</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
