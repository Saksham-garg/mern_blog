import axios from "axios";
import { Button, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PostCard } from "../components";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    category: "uncategorized",
    sort: "desc",
  });

  const [posts, setPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (searchTerm) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/v1/post/getAllPosts?searchItem=${searchTerm}`
      );
      if (res) {
        setPosts([res.data.data.posts]);
      }
      setLoading(false);
      if (res.data.data.posts.length == 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermParams = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermParams || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermParams,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.id == "search") {
      const searchItem = e.target.value || "";
      setSidebarData({ ...sidebarData, searchTerm: searchItem });
    }

    if (e.target.id == "sort") {
      const sort = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: sort });
    }

    if (e.target.id == "category") {
      const category = e.target.value || "untaegorized";
      setSidebarData({ ...sidebarData, category: category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    try {
      const res = await axios.get(`/api/v1/post/getAllPosts`, {
        params: {
          startIndex: posts.length - 1,
        },
      });
      if (res) {
        setPosts([...posts, res.data.data.posts]);
        if (res.data.data.posts.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              id="search"
              type="text"
              placeholder="Search..."
              onChange={handleChange}
              value={sidebarData.searchTerm}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Sort by:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Sort by:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id="category"
            >
              <option value="uncategorized">Select a category</option>
              <option value="Javascript">Javascript.js</option>
              <option value="Python">Python</option>
              <option value="Ruby on Rails">Ruby on Rails</option>
            </Select>
          </div>
          <Button
            type="submit"
            onSubmit={handleSubmit}
            gradientDuoTone="purpleToPink"
            outline
          >
            Apply filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 ">
          Posts results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-500 text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
