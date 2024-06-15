import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
const PostPage = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    try {
      const fetchPost = async () => {
        setLoading(true);
        setError(null);
        const post = await axios.get(`/api/v1/post/getAllPosts`, {
          params: {
            slug: slug,
          },
        });
        if (!post) {
          setError(post.data.message);
          setLoading(false);
          console.log(post.data.message);
          return;
        }
        setLoading(false);
        setError(null);
        setPosts(post.data.data.posts[0]);
      };
      fetchPost();
    } catch (error) {
      setError(error);
      setLoading(false);
      console.log(error);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size='xl'/>
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-3">
      <div className="flex flex-col">
        <h1 className="text-2xl mt-10 lg:text-4xl font-semibold font-serif text-center self-center max-w-2xl">
          {posts && posts.title}
        </h1>
        <Link className="mt-5 self-center" to={`/search/${posts && posts.category}`}>
          <Button color="gray" pill>
            {posts && posts.category}
          </Button>
        </Link>

        <img
          src={posts && posts.imageUrl}
          className="w-full max-h-[600px] object-cover mt-10"
        ></img>
        <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
          <span className="">
            {posts && new Date(posts.createdAt).toLocaleDateString()}
          </span>
          <span className="italic">
            {posts && (posts.content?.length / 1000).toFixed(0)} mins read
          </span>
        </div>
        <div
          className="p-3 max-w-2xl mx-auto w-full post-content"
          dangerouslySetInnerHTML={{ __html: posts && posts.content }}
        ></div>
      </div>
    </main>
  );
};

export default PostPage;
