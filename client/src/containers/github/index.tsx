import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'hooks/use-query.hook';
import { GithubEndpoints } from 'services/github.service';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as signInActions from '../sign-in/logic/actions';
import * as signUpActions from '../sign-up/logic/actions';
import * as socialSettingsActions from '../setting-page/social/logic/actions';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { FullscreenLoader } from 'components';

function Github() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { endpoint } = useParams<{ endpoint: GithubEndpoints }>();
	const { code } = useQuery<{ code: string }>();

	useEffect(() => {
		if (endpoint && code) {
			switch ('/' + endpoint) {
				case GithubEndpoints.LOGIN: {
					dispatch(signInActions.signInUserByGithub({ code }));
					return;
				}
				case GithubEndpoints.REGISTER: {
					dispatch(signUpActions.continueByGithub({ code }));
					return;
				}
				case GithubEndpoints.LINK: {
					dispatch(socialSettingsActions.linkToGithub({ code }));
					return;
				}
			}
		}
		history.push(ROUTES.Home);
	}, [endpoint, code]);

	return <FullscreenLoader />;
}

export default Github;
