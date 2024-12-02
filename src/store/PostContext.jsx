import { createContext, useState } from 'react';

export const PostContext = createContext(null);

const Post = ({ children }) => {
  const [postDetails, setPostDetails] = useState();

  console.log({ postDetails, setPostDetails }); // Debugging

  return (
    <PostContext.Provider value={{ postDetails, setPostDetails }}>
      {children}
    </PostContext.Provider>
  );
};

export default Post;
