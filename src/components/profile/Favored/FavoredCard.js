/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import { dislikePost } from '../../../services/like.js';
import { Image, Modal } from 'antd';
import { Icon } from '@iconify/react';
import ReadMoreReact from 'read-more-react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
TimeAgo.addLocale(en);

const timeAgo = new TimeAgo('en-US');
const { confirm } = Modal;

function FavoredCard({ post, changeBackground, changeBack }) {
	const { content, user, likes, date } = post;
	const dispatch = useDispatch();
	const dislike = () => {
		dispatch(dislikePost(post));
	};


	// popup for confirming delete liked post
	function showDeleteConfirm() {
		confirm({
			title: 'Are you sure you want to delete this post from your likes?',
			icon: <ExclamationCircleOutlined />,
			content:
				'If you press yes the post you liked will not be shown here anymore!',
			okText: 'Yes',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				dislike();
			},
			onCancel() {},
		});
	}

	return (
		<div className='post'>
			<div className='post-head'>
				<div className='post-user'>
					<Image
						width={48}
						src={user.avatar}
						alt={user.name || user.username}
					/>
					<div className='post-user-info'>{user.name || user.username}</div>
				</div>
				<div className='post-date'>{timeAgo.format(date)}</div>
			</div>
			<div className='post-body'>
				<span
					className='post-heart'
					style={{ float: 'right', marginLeft: '5px' }}
				>
					<Icon
						icon='ant-design:heart-filled'
						likes={likes}
						color='pink'
						inline={true}
						onMouseEnter={changeBackground}
						onMouseLeave={changeBack}
						onClick={showDeleteConfirm}
					/>
				</span>
				<ReadMoreReact
					text={content}
					min={80}
					ideal={100}
					max={content.length}
					readMoreText={'Read more ▼'}
				/>
			</div>
		</div>
	);
}

export default FavoredCard;
