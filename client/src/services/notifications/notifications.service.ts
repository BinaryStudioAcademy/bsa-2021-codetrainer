import { app } from 'containers/app/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { TNotification } from 'typings/common/INotification';

export const addNotification = async (notification: TNotification, userId: string = '123') => {
	const firestore = getFirestore(app);

	await setDoc(doc(firestore, 'notifications', notification.id), {
		createdAt: notification.date,
		id: notification.id,
		read: notification.read,
		body: notification.body,
		type: notification.type,
		userId,
	});
};

//example, for other types check 'mock'-file
/*
addNotification({
    id: uuid(),
    type: NotificationTypes.Common,
    date: new Date(),
    body: {
        message: 'SDFNKL5464681653',
    },
    read: false,
}, '2624edce-4cef-4775-b4f2-0b9eceb21eb3');
*/
