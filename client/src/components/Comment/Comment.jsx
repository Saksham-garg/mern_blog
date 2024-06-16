import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { Textarea, Button } from "flowbite-react";
import { useSelector } from "react-redux";

const Comment = ({ comment, onLike, onEdit, onDelete}) => {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [isCommentEdit, setIsCommentEdit] = useState(false);
  const [editComment, setEditComment] = useState("");
  useEffect(() => {
    try {
      const fetchUser = async () => {
        const user = await axios.get(`/api/v1/user/${comment.userId}`);
        if (user) {
          setUser(user.data.data);
        }
      };
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  }, [comment]);


   const saveEdit = async(comment_id) => {
    try {
        const res = await axios.put(`/api/v1/comment/update-comment/${comment_id}`,{
            comment:editComment
        })
        if(res){
            setEditComment(false)
            onEdit(res.data.data.comment,res.data.data._id)
        }
    } catch (error) {
        console.log(error)
    }   
}
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          src={user.profilePicture}
          className="w-10 h-10 rounded-full bg-gray-200"
        ></img>
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isCommentEdit ? (
          <>
            <Textarea
              placeholder="Write something..."
              value={editComment}
              rows="3"
              onChange={(e) => setEditComment(e.target.value)}
            ></Textarea>
            <div className="flex justify-end gap-2 text-xs mt-2">
              <Button
                gradientDuoTone="purpleToPink"
                type="button"
                size="sm"
                onClick={() => saveEdit(comment._id)}
              >
                Submit
              </Button>
              <Button
                gradientDuoTone="purpleToPink"
                type="button"
                size="sm"
                outline
                onClick={() => setIsCommentEdit(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p>{comment.comment}</p>
            <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                    <>
                  <button
                    type="button"
                    onClick={() => {
                        setEditComment(comment.comment);
                        setIsCommentEdit(true);
                    }}
                    className={`text-gray-400 hover:text-blue-500'`}
                    >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={onDelete}
                    className={`text-gray-400 hover:text-blue-500'`}
                    >
                    Delete
                  </button>
                      </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
