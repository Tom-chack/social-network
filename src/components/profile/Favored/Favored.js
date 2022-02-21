import React, { useEffect, useState } from 'react';
import FavoredCard from './FavoredCard';
import { useDispatch, useSelector } from 'react-redux';
import getPosts from '../../../services/getPosts';
import { Row, Col, Radio, Card } from 'antd';
import ReactPaginate from 'react-paginate';
import './favored.css';

function Favored() {
	//Redux functions
	const dispatch = useDispatch();
	const { profile } = useSelector((state) => state.userDuck);
	const { posts } = useSelector((state) => state.postDuck);

	//Local states
	const [filter, setFilter] = useState('&_sort=date&_order=desc');

	//Fetch user object by profile user id and likes by userid
	useEffect(() => {
		if (profile.id) {
			dispatch(getPosts('?favoredby=' + profile.id + filter));
		}
	}, [dispatch, profile, filter, posts]);

	//calculations for pagination
	const [pageNumber, setPageNumber] = useState(0);
	const postsPerPage = 5;
	const pagesVisited = pageNumber * postsPerPage;

	const displayPosts = posts.slice(pagesVisited, pagesVisited + postsPerPage);
	const pageCount = Math.ceil(posts.length / postsPerPage);

	const changePage = ({ selected }) => {
		setPageNumber(selected);
	};

	// changing heart icon's background while hovering
	function changeBackground(e) {
		e.target.style.color = 'red';
	}
	function changeBack(e) {
		e.target.style.color = 'pink';
	}

	return (
		<div>
			<Row>
				<Col flex={5} style={{ margin: 0 }}>
					{posts.length <= 5 ? null : (
						<ReactPaginate
							previousLabel={'<'}
							nextLabel={'>'}
							pageCount={pageCount}
							onPageChange={changePage}
							containerClassName={'paginationBttns'}
							previousLinkClassName={'previusBttn'}
							nextLinkClassName={'nextBttn'}
							disabledClassName={'paginationDisabled'}
							activeClassName={'paginationActive'}
						/>
					)}
				</Col>
				<Col flex={1} align='right'>
					<Radio.Group
						defaultValue={filter}
						size='middle'
						onChange={(e) => setFilter(e.target.value)}
					>
						<Radio.Button value='&_sort=date&_order=desc'>Newest</Radio.Button>
						<Radio.Button value='&_sort=date&_order=asc'>Oldest</Radio.Button>
						<Radio.Button value='&_sort=likes&_order=desc'>
							Top liked
						</Radio.Button>
					</Radio.Group>
				</Col>
			</Row>
			<div>
				{displayPosts.map((post) => (
					<Card
						key={post.id}
						className='post'
						style={{
							backgroundColor: '#fafafa',
							marginTop: '20px',
							width: '90%',
						}}
					>
						<FavoredCard
							post={post}
							changeBackground={changeBackground}
							changeBack={changeBack}
						/>
					</Card>
				))}
			</div>
		</div>
	);
}

export default Favored;
