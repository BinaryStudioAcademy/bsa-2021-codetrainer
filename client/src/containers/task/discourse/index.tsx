import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../logic/actions';
import DiscourseTab from 'components/pages/task/tabs/discourseTab';
import { WebApi } from 'typings/webapi';
import { useAppSelector } from 'hooks/useAppSelector';

const Discourse = () => {
	const dispatch = useDispatch();
	const [currentComment, setCurrentComment] = useState<WebApi.Entities.ICommentTask | null>(null);
	const comments = useAppSelector((state) => state.taskInfo.comments.items);
	const currentUser = useAppSelector((state) => state.auth.userData.user);

	useEffect(() => {
		dispatch(actions.getComments());
	}, []);

	const editCommentHandler = (comment: WebApi.Entities.ICommentTask) => {
		setCurrentComment(comment);
	};

	const deleteCommentHandler = (id: string) => {
		dispatch(actions.deleteComment({ id }));
	};

	const saveCommentHandler = (body: string) => {
		if (currentComment) {
			dispatch(actions.editComment({ id: currentComment.id, body }));
			setCurrentComment(null);
		}
	};

	const postCommentHandler = (body: string) => {
		dispatch(actions.postComment({ body }));
	};

	const cancelEditingHandler = () => {
		setCurrentComment(null);
	};

	return (
		<DiscourseTab
			editCommentHandler={editCommentHandler}
			deleteCommentHandler={deleteCommentHandler}
			saveCommentHandler={saveCommentHandler}
			cancelEditingHandler={cancelEditingHandler}
			postCommentHandler={postCommentHandler}
			currentUser={currentUser}
			currentComment={currentComment}
			comments={comments}
		/>
	);
};

export default Discourse;
