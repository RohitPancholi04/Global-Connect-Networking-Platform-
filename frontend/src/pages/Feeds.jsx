
import { useEffect, useState } from "react";
import Card from "../components/Card";
import ProfileCard from "../components/ProfileCard";
import Post from "../components/Post";
import Modal from "../components/Modal";
import AddModal from "../components/AddModal";
import api from "../lib/axios";
import { jwtDecode } from "jwt-decode";

const Feeds = () => {
  const [addPostModal, setAddPostModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");

  const openAdd = () => setAddPostModal(true);
  const closeAdd = () => setAddPostModal(false);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // who am I
        const { id } = jwtDecode(token);
        setCurrentUserId(id);

        // feed for everyone
        const res = await api.get("/api/posts/feed", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // ensure arrays exist
        const normalized = res.data.map((p) => ({
          ...p,
          likes: p.likes || [],
          comments: p.comments || [],
        }));
        setPosts(normalized);
      } catch (e) {
        console.error("feed load failed", e);
      }
    })();
  }, []);

  // When a new post is created
  const handlePostCreated = (newPost) => {
    setPosts((prev) => [
      { ...newPost, likes: newPost.likes || [], comments: newPost.comments || [] },
      ...prev,
    ]);
  };

  // When an individual post was updated (likes/comments)
  const handlePostUpdated = (updated) => {
    setPosts((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
  };

  // Post deleted
  const handlePostDeleted = (postId) => {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  return (
    <div className="px-5 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* Left */}
      <div className="w-[20%] sm:block sm:w-[23%] hidden py-5">
        <div className="h-fit">
          <ProfileCard />
        </div>
      </div>

      {/* Center */}
      <div className="w-[100%] py-5 sm:w-[50%]">
        {/* Create prompt */}
        <Card padding={1}>
          <div className="flex gap-2 items-center">
            {/* <img
              src="https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg"
              className="rounded-full w-12 h-12 border-2 border-white"
            /> */}
            <div
              onClick={openAdd}
              className="w-full border py-3 px-3 rounded-3xl hover:bg-gray-100 cursor-pointer"
            >
              Start a post
            </div>
          </div>
        
        <div className="border-b-1 border-gray-300 w-full my-5" />

        {/* Feed */}
        <div className="w-full flex flex-col gap-5">
          {posts.length ? (
            posts.map((p) => (
              <Post
                key={p._id}
                post={p}
                currentUserId={currentUserId}
                onUpdated={handlePostUpdated}
                onDeleted={handlePostDeleted}
              />
            ))
          ) : (
            <Card padding={1}><div className="p-4 text-center text-gray-500">No posts yet</div></Card>
          )}
        </div>
        </Card>

      </div>

      {/* Right */}
      <div className="w-[26%] py-5 hidden md:block"></div>

      {addPostModal && (
        <Modal closeModal={closeAdd} title="Create Post">
          <AddModal onClose={closeAdd} onCreated={handlePostCreated} />
        </Modal>
      )}
    </div>
  );
};

export default Feeds;
