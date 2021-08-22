import { Router } from 'express';
import { MailerApiPath } from '../../common/enum/api/mailer-api';
import { User } from '../../data';
import { mailer } from '../../helpers/mailer';

export const initMailerApi = (appRouter: typeof Router) => {
	const router = appRouter();
    
    router
        .post(MailerApiPath.INVITE_TO_CLAN, async (req,res,next)=>{
            const fromUser:User = JSON.parse(req.body.fromUser)
            const toUser:User = JSON.parse(req.body.toUser)
            mailer.inviteToClan(fromUser, toUser)
            .then(data=>res.send(data))
            .catch(next)
        })

	return router;

}
