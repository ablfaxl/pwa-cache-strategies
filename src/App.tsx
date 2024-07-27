import React, { useEffect, useState } from "react";
import { getAllFromDB, putToDB, clearDB } from "./utils/indexedDB";

interface Post {
  id: number;
  title: string;
  body: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const result: Post[] = await response.json();

        // Clear and update the IndexedDB with the new data
        await clearDB("posts");
        result.forEach(async (item) => {
          await putToDB("posts", item);
        });

        setData(result);
      } catch (error) {
        console.error(
          "Network request failed, trying to fetch from IndexedDB:",
          error
        );

        // Fetch data from IndexedDB if network request fails
        const cachedData = await getAllFromDB<Post>("posts");
        setData(cachedData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome to My PWA App</h1>
      <p>
        This PWA utilizes a Stale-While-Revalidate strategy to enhance user
        experience by reducing loading times while ensuring content freshness.
      </p>
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
