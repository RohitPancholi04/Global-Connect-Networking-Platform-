
const Conversation = ({ user, active, online, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center w-full cursor-pointer border-b border-gray-300 gap-3 p-4 hover:bg-gray-200 ${
        active ? "bg-gray-100" : ""
      }`}
    >
      <div className="relative shrink-0">
        <img
          className="w-12 h-12 rounded-full object-cover"
          src={
            user.profilePic ||
            "https://static.vecteezy.com/system/resources/previews/000/439/863/non_2x/vector-users-icon.jpg"
          }
          alt={user.name}
        />
        {/* online dot */}
        <span
          className={'absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white '
            // online ? "bg-green-500" : "bg-gray-400"
          }
          title={online ? "Online" : "Offline"}
        />
      </div>
      <div className="overflow-hidden">
        <div className="text-md font-medium truncate">{user.name}</div>
        <div className="text-sm text-gray-500 truncate">
          {user.email || "Tap to chat"}
        </div>
      </div>
    </div>
  );
};

export default Conversation;

