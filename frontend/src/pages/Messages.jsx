
import  { useEffect, useState } from "react";
import api from "../lib/axios";
import io from "socket.io-client";
import Conversation from "../components/Conversation";

const socket = io("http://localhost:5003"); // change if backend URL different

const Messages = () => {
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);

  const token = localStorage.getItem("token"); // assuming you store JWT

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/api/messages/user-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, [token]);

  // Fetch messages for selected user
  const fetchMessages = async (userId) => {
    try {
      const res = await api.get(`/api/messages/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  // Listen for incoming messages
  useEffect(() => {
    socket.on("newMessage", (msg) => {
      if (activeUser && msg.sender === activeUser._id) {
        setMessages((prev) => [...prev, msg]);
      }
    });
    return () => {
      socket.off("newMessage");
    };
  }, [activeUser]);

  // Handle send
  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage && !file) return;

    try {
      const formData = new FormData();
      if (newMessage) formData.append("message", newMessage);
      if (file) formData.append("image", file);
      formData.append("receiver", activeUser._id);

      const res = await api.post("/api/messages", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessages((prev) => [...prev, res.data]);
      socket.emit("sendMessage", res.data);
      setNewMessage("");
      setFile(null);
    } catch (err) {
      console.error("Send message error", err);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 border-r overflow-y-auto">
        {users.map((user) => (
          <Conversation
            key={user._id}
            user={user}
            active={activeUser?._id === user._id}
            online={true} // TODO: replace with real socket online status
            onClick={() => {
              setActiveUser(user);
              fetchMessages(user._id);
            }}
          />
        ))}
      </div>

      {/* Chat Window */}
      <div className="flex flex-col flex-1">
        {activeUser ? (
          <>
            <div className="p-4 border-b font-semibold">{activeUser.name}</div>
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`p-2 rounded-lg max-w-xs ${
                    msg.sender === activeUser._id
                      ? "bg-gray-200 self-start"
                      : "bg-blue-500 text-white self-end ml-auto"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="attachment"
                      className="w-40 h-40 object-cover rounded mb-1"
                    />
                  )}
                  {msg.message && <p>{msg.message}</p>}
                </div>
              ))}
            </div>
            <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-1 border rounded px-3 py-2"
              />
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="border rounded px-2 py-1"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 rounded"
              >
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
