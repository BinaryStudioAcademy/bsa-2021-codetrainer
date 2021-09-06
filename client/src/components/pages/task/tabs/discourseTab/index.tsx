import React, { useEffect, useState } from 'react';
import Comment from './comment';
import { Button } from 'components';
import { WebApi } from 'typings/webapi';
import { IUser } from 'typings/common/IUser';
import styles from './discourse-tab.module.scss';
import { ButtonClasses } from 'components/basic/button';

interface IDiscourseTabProps {
	comments: Array<WebApi.Entities.ICommentTask> | null;
	currentUser: IUser | null;
	currentComment: WebApi.Entities.ICommentTask | null;
	editCommentHandler: (comment: WebApi.Entities.ICommentTask) => void;
	deleteCommentHandler: (id: string) => void;
	postCommentHandler: (body: string) => void;
	saveCommentHandler: (body: string) => void;
	cancelEditingHandler: () => void;
	loadMoreHandler: () => void;
	hasNextPage: boolean;
}

const DiscourseTab: React.FC<IDiscourseTabProps> = ({
	comments,
	currentUser,
	hasNextPage,
	loadMoreHandler,
	currentComment,
	editCommentHandler,
	saveCommentHandler,
	deleteCommentHandler,
	postCommentHandler,
	cancelEditingHandler,
}) => {
	const [body, setBody] = useState('');

	useEffect(() => {
		setBody(currentComment?.body || '');
	}, [currentComment]);

	return (
		<div className={styles.container}>
			<div className={styles.commentEditor}>
				<textarea value={body} onChange={(event) => setBody(event.target.value)}></textarea>
				{currentComment ? (
					<div className={styles.commentEditButtons}>
						<Button onClick={() => saveCommentHandler(body)} className={ButtonClasses.blue}>
							Save
						</Button>
						<Button onClick={() => cancelEditingHandler()}>Cancel</Button>
					</div>
				) : (
					<Button
						className={ButtonClasses.blue}
						onClick={() => {
							if (body.trim().length > 0) {
								setBody('');
								postCommentHandler(body);
							}
						}}
					>
						Send
					</Button>
				)}
			</div>
			<div className={styles.comments}>
				{comments && comments.length > 0 ? (
					comments.map((comment) => (
						<Comment
							comment={comment}
							currentUser={currentUser}
							editHandler={editCommentHandler}
							deleteHandler={deleteCommentHandler}
							key={comment.id}
						/>
					))
				) : (
					<p>No comments</p>
				)}
				{hasNextPage && <Button onClick={loadMoreHandler}>Load more</Button>}
			</div>
		</div>
	);
};

export default DiscourseTab;
