
import { useMemo, useState } from "react";
import Card from "./Card";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import api from "../lib/axios";

const Post = ({ post, currentUserId, onUpdated, onDeleted }) => {
  const [localPost, setLocalPost] = useState(post); // Local state for instant UI update
  const [seeMore, setSeeMore] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [busy, setBusy] = useState(false);

  const hasLiked = useMemo(
    () => (localPost.likes || []).some((id) => id?.toString() === currentUserId),
    [localPost.likes, currentUserId]
  );

  const canDeletePost = localPost.user?._id?.toString() === currentUserId;

  const handleLike = async () => {
    if (busy) return;
    setBusy(true);

    try {
      const token = localStorage.getItem("token");
      const res = await api.put(
        `/api/posts/${localPost._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local post instantly
      setLocalPost((prev) => ({
        ...prev,
        likes: res.data.likes
      }));

      // Notify parent if needed
      onUpdated?.({ ...localPost, likes: res.data.likes });
    } catch (err) {
      console.error("Like toggle failed", err);
    } finally {
      setBusy(false);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        `/api/posts/${localPost._id}/comment`,
        { text: commentText.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLocalPost(res.data);
      setCommentText("");
      setShowComments(true);
      onUpdated?.(res.data);
    } catch (e) {
      console.error("add comment failed", e);
    }
  };

  const handleRemoveComment = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.delete(
        `/api/posts/${localPost._id}/comment/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLocalPost(res.data);
      onUpdated?.(res.data);
    } catch (e) {
      console.error("delete comment failed", e);
    }
  };

  const handleDeletePost = async () => {
    if (!confirm("Delete this post?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/posts/${localPost._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDeleted?.(localPost._id);
    } catch (e) {
      console.error("delete post failed", e);
    }
  };

  const contentText = `${localPost.user?.name || "User"}: ${localPost.content || ""}`;

  return (
    <Card padding={0}>
      {/* Header */}
      <div className="flex items-center gap-3 p-4 relative">
        <img
          src={
            localPost.user?.profilePic ||
            "https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg"
          }
          className="rounded-full w-12 h-12 object-cover border-2 border-white"
        />
        <div className="flex-1 text-center">
          <div className="text-lg font-semibold">{localPost.user?.name || "Unknown"}</div>
        </div>

        {canDeletePost && (
          <button
            onClick={handleDeletePost}
            className="absolute right-4 text-red-600 hover:bg-red-50 rounded p-1"
            title="Delete post"
          >
            <DeleteOutlineIcon />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="text-md p-4 whitespace-pre-line">
        {seeMore || contentText.length <= 160
          ? contentText
          : `${contentText.slice(0, 160)}… `}
        {contentText.length > 160 && (
          <span
            onClick={() => setSeeMore((s) => !s)}
            className="cursor-pointer text-blue-800"
          >
            {seeMore ? "See Less" : "See More"}
          </span>
        )}
      </div>

      {/* Image */}
      {localPost.image && (
        <div className="w-full max-h-[420px] overflow-hidden">
          <img src={localPost.image} className="w-full object-cover" />
        </div>
      )}

      {/* Counts */}
      <div className="my-2 p-4 flex justify-between items-center">
        <div className="flex gap-1 items-center cursor-pointer" onClick={handleLike}>
          {hasLiked ? (
            <ThumbUpIcon sx={{ color: "blue", fontSize: 18 }} />
          ) : (
            <ThumbUpOffAltIcon sx={{ fontSize: 18 }} />
          )}
          <div className="text-sm text-gray-600">{localPost.likes?.length || 0} Likes</div>
        </div>
        <div
          className="flex gap-1 items-center cursor-pointer"
          onClick={() => setShowComments((s) => !s)}
        >
          <CommentIcon sx={{ color: "green", fontSize: 18 }} />
          <div className="text-sm text-gray-600">
            {localPost.comments?.length || 0} Comments
          </div>
        </div>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="p-4 border-t">
          {(localPost.comments || []).map((c) => {
            const mine = c.user?._id?.toString() === currentUserId;
            return (
              <div key={c._id} className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="font-semibold">{c.user?.name || "User"}</div>
                  <div className="text-sm">{c.text}</div>
                </div>
                {mine && (
                  <button
                    onClick={() => handleRemoveComment(c._id)}
                    className="text-red-500 text-xs"
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          })}

          {/* Add Comment */}
          <div className="flex mt-2 gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment…"
              className="flex-1 border px-3 py-2 rounded"
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-600 text-white px-3 rounded"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default Post;
