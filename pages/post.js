import axios from "axios";
import { useState, useEffect } from "react";

export default function Post() {
  const [posts, setPost] = useState(); //variable que deja ir cambiando el valor siendo una constante (generando reactividad)

  //cuando cargue la pag por primera vez hara el proceso. antes de que cargue no lo hara
  useEffect(() => {
    const updataData = async () => {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      console.log(response.data);
      setPost(response.data);
    };
    updataData();
  }, []);

  //Boton
  const resetData = () => {
    setPost([]);
  };


// un mapeo hace un for en los elementos de un array

  return (
    <>                                                                                                                 
      <h1>Posts</h1>
      <button onClick={resetData}>Reset</button>

      {posts?.map(
        (post) => (
          console.log(post),
          (
            <div key={post.id}>
              <h2 className="bg-white">{post.title}</h2>
              <p>{post.body}</p>
            </div>
          )
        )
      )}
    </>
  );
}

