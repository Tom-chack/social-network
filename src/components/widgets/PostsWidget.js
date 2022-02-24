import getPosts from "../../services/getPosts";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Modal, Card } from "antd";

const PostWidget = () => {
  //Getting posts
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postDuck);

  //Some states for Modal window
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    dispatch(getPosts("?_sort=likes&_order=desc&_start=0&_end=5"));
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
    <Card className='widget' style={{ backgroundColor: "#fafafa" }}>
      <div className='header-div' style={{ marginBottom: "5px" }}>
        <h2>Posted Media</h2>
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
                {post.content.length <= 70 ? post.content : `${post.content.slice(0, 70)} ...`}
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
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <div className='post-avatar'>
              <img
                src={modalData?.user.avatar}
                alt={"avatar"}
                width={48}
                style={{ borderRadius: "50%" }}
              />
            </div>
            <div style={{ fontSize: "16px", padding: "0 0 5px 10px" }}>
              <Link to={`/profile/${modalData?.user.id}`}>
                <span style={{ color: "#333" }}>{modalData?.user.name}</span>
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
    </Card>
  );
};

export default PostWidget;
