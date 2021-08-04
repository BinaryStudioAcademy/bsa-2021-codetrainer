import React from 'react';
import Modal from 'react-modal';
import ImageUpload from './components/image-upload';

import styles from './clan-modal.module.scss';

interface IClanModalProps {}

Modal.setAppElement('#root');

export const ClanModal: React.FC<IClanModalProps> = (props) => {
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [input, setInput] = React.useState('');

	const createClan = React.useCallback((e: any, name: string) => {
		e.preventDefault();

		const header = {
			method: 'POST',
			headers: {
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBjNzQ4YmQwLWQyNGQtNDY2Yi1iMWMxLTVkOTQ1MDczN2VhYSIsImlhdCI6MTYyODA5MTIwNywiZXhwIjoxNjI4MTc3NjA3fQ.5ChvB4gmO-R9EXfmakMcjtUZhKhnVDHFav_6-76xCHo',
				'Content-Type': 'application/json',
			},
			withCredentials: true,
			body: JSON.stringify({ name: name, isPublic: true }),
		};
		const call = async () => {
			const response = await fetch('http://localhost:5000/api/clan', header);
			const data = await response.json();
			console.log(data);
		};
		call();
	}, []);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const style = {
		content: {
			width: '50vw',
			height: '50vh',
			margin: 'auto',
			background: '#FAFBFF',
			border: 'none',
		},
	};

	return (
		<div>
			<button onClick={openModal}>Open Modal</button>
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={style} contentLabel="Clan Modal">
				<div className={styles.container}>
					<div className={styles.flex}>
						<h2 className={styles.title}>NEW CLAN</h2>
						<a className={styles.close} onClick={closeModal}>
							x
						</a>
					</div>
					<div className={`${styles.flex} ${styles.pictures}`}>
						<ImageUpload label="Set clan cover" />
						<ImageUpload label="Set clan icon" />
					</div>
					<div className={styles.form}>
						<label>
							<span>*</span> Clan name
						</label>
						<form onSubmit={(e) => createClan(e, input)}>
							<input value={input} onChange={(e) => setInput(e.target.value)} type="text" />
							<button type="submit">Create Clan</button>
						</form>
					</div>
				</div>
			</Modal>
		</div>
	);
};
