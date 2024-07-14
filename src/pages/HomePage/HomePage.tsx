import React, { useState, useEffect } from "react";
import Frame from "../../components/Frame";
import "./Homepage.css";
import haiimg from "../../assets/hai.jpg";
import haiimg1 from "../../assets/hai1.jpg";
import haiimg2 from "../../assets/hai2.jpg";
import haiimg3 from "../../assets/hai3.jpg";
import ngan from "../../assets/ngan.jpg";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Input, Upload, message, Divider } from "antd";
import type { UploadChangeParam, UploadFile } from "antd/es/upload";
import { UploadOutlined, ExclamationCircleOutlined, PlusSquareOutlined,PlusCircleOutlined} from "@ant-design/icons";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import comment from "../../assets/comment.png";
import share from "../../assets/share.png";
import repost from "../../assets/repost.png";
import heart from "../../assets/heart.png";

const { TextArea } = Input;
const { confirm } = Modal;

interface Post {
    id: number;
    content: string;
    images: string[]; // Assuming images are represented as URLs or file paths
}

const HomePage = () => {
    let navigate = useNavigate();
    const [content, setContent] = useState("");
    const [uploadedImage, setUploadedImage] = useState<UploadFile[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);

    const handleImageClick = () => {
        navigate("/user");
    };

    const [modalVisible, setModalVisible] = useState(false);

    const handleNewPost = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        if (content.length > 0 || uploadedImage.length > 0) {
            openConfirm();
        } else {
            setModalVisible(false);
        }
    };

    const handlePostSubmit = async () => {
        if (content.length === 0 && uploadedImage.length === 0) {
            message.error("Post content cannot be empty");
            setModalVisible(true);
            return;
        }
    
        try {
            // Filter out undefined values from uploadedImage.map(file => file.thumbUrl)
            const validImages = uploadedImage.map(file => file.thumbUrl).filter(url => url) as string[];
    
            const newPost: Post = {
                id: posts.length + 1, // Generate a unique ID or handle it differently
                content,
                images: validImages,
            };
    
            setPosts(prevPosts => [newPost, ...prevPosts]);
    
            setContent("");
            setUploadedImage([]);
            setModalVisible(false);
            message.success("Post submitted successfully");
        } catch (error) {
            console.error("Error submitting post:", error);
            message.error("Failed to submit post");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const openConfirm = () => {
        confirm({
            title: "Do you want to discard this post?",
            icon: <ExclamationCircleOutlined />,
            okText: "Discard",
            cancelText: "Cancel",
            onOk() {
                setModalVisible(false);
                setContent("");
                setUploadedImage([]); 
            },
            onCancel() {
                setModalVisible(true);
            },
        });
    };

    const handleUploadChange = ({ fileList }: UploadChangeParam<UploadFile<any>>) => {
        setUploadedImage(fileList);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = [
                    { id: 1, content: `🚨 🏆 BREAKING: COPA AMERICA SẼ ĐƯỢC TỔ CHỨC VÀO NĂM 2025 ? 🤯
                    Phiên bản đặc biệt để kỷ niệm 110 năm thành lập giải đấu cấp châu lục lâu đời nhất thế giới, BTC CONMEBOL đang xem xét tổ chức giải Copa America vào năm 2026. Tuy nhiên, do trùng với World Cup 2026, họ dự kiến sẽ đẩy sang hè năm 2025.
                    Vậy là khả năng Messi vẫn có thể dự kỳ Copa America lần thứ 8️⃣ trong sự nghiệp <3
                📰 : Theo Eurofoot`, images: [haiimg,haiimg1,haiimg2,haiimg3,ngan]},
                    { id: 2, content: "Kì Euro cuối cùng mà anh Bảy tham gia và khoảnh khắc duy nhất khán đài hô vang “ Siuuuu “", images: [haiimg,haiimg1,haiimg2,haiimg3] },
                ];
                setPosts(fetchedPosts);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    const responsive = {
        desktop: {
          breakpoint: { max: 2000, min: 0 },
          items: 3,
          slidesToSlide: 1 // optional, default to 1.
        },
      };

    return (
        <div className="homepage-container">
            <h3>For you</h3>

            <div className="main-frame">
                <Button icon={<PlusSquareOutlined style={{ fontSize: '44px' }}/>} onClick={handleNewPost} className="add-post-button enlarge-on-hover"
                    style={{width: "90px", height: "90px", backgroundColor: "#FD6FED", color: "white"}}                
                ></Button>
                <Frame> 
                    <div className="startpostArea">
                        <img src={haiimg} alt="hai" className="haiimg" onClick={handleImageClick} />
                        <div className="text-area" onClick={handleNewPost}>
                            <div className="defaultText">Start your post...</div>
                        </div>
                        <button onClick={handleNewPost}>Post</button>
                    </div>

                    <Divider dashed style={{border: "1px solid #FD6FED"}}/>

                    {posts.map(post => (
                        <div>

                            <div className="post-content-container" key={post.id}>
                                <div className="user-ava">
                                    <img src={haiimg} alt="hai" />
                                    <PlusCircleOutlined className="plus-icon"/>
                                </div>
                                <div className="post-content">
                                    <div className="usernamePost">
                                        <span className="username">thenhai2k3</span>
                                        <span className="time">12:00 PM</span> {/* Replace with actual timestamp */}
                                    </div>
                                    <p className="content">{post.content}</p>

                                    <div className="parent">
                                        <Carousel
                                            responsive={responsive}
                                            autoPlay={true}
                                            swipeable={true}
                                            draggable={true}
                                            showDots={true}
                                            infinite={true}
                                            partialVisible={false}
                                            dotListClass="custom-dot-list-style"
                                        >
                                            {post.images.map((imageUrl, index) => {
                                            return (
                                                <div className="slider" key={index}>
                                                <img src={imageUrl} alt="movie" />
                                                </div>
                                            );
                                            })}
                                        </Carousel>
                                    </div>
                                </div>
                            </div>
                            <div className="interact-container">
                                <span><img src={heart} alt="comment" /> 329k</span>
                                <span><img src={comment} alt="comment" /> 3</span>
                                <span><img src={repost} alt="repost" /> 2</span>
                                <span><img src={share} alt="share" /> 12</span>
                            </div>
                            <Divider dashed style={{border: "1px solid #FD6FED", position: "relative"}}/>
                        </div>
                    ))}
                </Frame>
            </div>
            <Modal
            title="New Post"
            visible={modalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handlePostSubmit}>
                        Submit
                    </Button>,
                ]}
                width={600}
            >
                <div className="homepage-form-container">
                    <img src={haiimg} alt="hai" className="haiimg" />
                    <div className="post-write-container">
                        <div className="usernamePost">thenhai2k3</div>
                        <div className="captainPost">
                            <TextArea
                                rows={2}
                                placeholder="Write your post here..."
                                autoSize={{ minRows: 2, maxRows: 16 }}
                                style={{ border: "none", width: "100%", fontSize: "20px" }}
                                value={content}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Upload
                                listType="picture-card"
                                onChange={handleUploadChange}
                                beforeUpload={() => false}
                                fileList={uploadedImage}
                            >
                                <Button icon={<UploadOutlined />}></Button>
                            </Upload>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default HomePage;
