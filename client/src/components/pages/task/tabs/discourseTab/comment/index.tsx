import React from 'react';
import { Avatar } from 'components';
import { WebApi } from 'typings/webapi';
import styles from './comment.module.scss';
import { IUser } from 'typings/common/IUser';
import clsx from 'clsx';

interface ICommentProps {
	comment: WebApi.Entities.ICommentTask;
	currentUser: IUser | null;
	editHandler: (comment: WebApi.Entities.ICommentTask) => void;
	deleteHandler: (id: string) => void;
}

const Comment: React.FC<ICommentProps> = ({ comment, currentUser, editHandler, deleteHandler }) => {
	return (
		<div className={clsx(styles.comment, comment.user.id === currentUser?.id && styles.commentOwn)}>
			<Avatar size={50} />
			<div className={styles.commentContent}>
				<div className={styles.commentUserInfo}>
					<span>
						{comment.user.name} {comment.user.surname}
					</span>
					{comment.user.clan && <span>Clan &quot;{comment.user.clan.name}&quot;</span>}
					<span>{new Date(comment.createdAt).toLocaleDateString()}</span>
					{comment.user.id === currentUser?.id && (
						<div className={styles.commentButtonsBlock}>
							<button className={styles.commentButton} onClick={() => editHandler(comment)}>
								Edit
							</button>
							<button className={styles.commentButton} onClick={() => deleteHandler(comment.id)}>
								Delete
							</button>
						</div>
					)}
				</div>
				<div className={styles.commentText}>
					<p>{comment.body}</p>
				</div>
			</div>
		</div>
	);
};

export default Comment;
