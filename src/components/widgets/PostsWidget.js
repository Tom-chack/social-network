import getPosts from "../../services/getPosts";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Modal } from "antd";

const PostWidget = () => {
  //Getting posts
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postDuck);

  //Some states for Modal window
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    dispatch(getPosts("?_sort=likes&_order=desc&_start=0&_end=5", true, true, false));
  }, [dispatch]);

  //Modal functions
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className='post-widget-content'>
      <div className='header-div'>
        <div className='header-content'>
          <span>Popular Posts</span>
        </div>
      </div>
      {posts.map((post, index) => (
        <div key={post.id} className='post-element'>
          <div className='post-avatar'>
            <Link to={`/profile/${post.user.id}`}>
              <img src={post.user.avatar} alt={"avatar"} />
            </Link>
          </div>
          <div className='post-content'>
            <Link
              to={""}
              onClick={() => {
                showModal();
                setModalData(posts[index]);
              }}
            >
              <span>
                {post.content.length <= 50 ? post.content : `${post.content.slice(0, 50)} . . .`}
              </span>
            </Link>
          </div>
        </div>
      ))}

      {
        <Modal
          title='Popular Posts'
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className='post-content'>
            <div className='post-avatar'>
              <img src={modalData?.user.avatar} alt={"avatar"} />
            </div>
            <div className='modal-name'>
              <Link to={`/profile/${modalData?.user.id}`}>
                <span>{modalData?.user.name}</span>
              </Link>
            </div>
          </div>
          <div>
            <p style={{ margin: 10 }}>{modalData?.content}</p>
            <div className='modal-div'>
              {!modalData?.image ? null : (
                <img className='modal-image' src={modalData?.image} alt={"post-img"} />
              )}
            </div>
          </div>
        </Modal>
      }
    </div>
  );
};

export default PostWidget;
