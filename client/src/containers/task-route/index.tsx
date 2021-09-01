import React from 'react';
import { useRouteMatch, Route, Switch, Redirect } from 'react-router-dom';
import { TaskPageContainer } from 'containers/task';
import TaskTrain from 'containers/task-train';
import { ROUTES, TASK_ROUTES } from 'constants/routes';

export const TaskRouting: React.FC = () => {
	const { path } = useRouteMatch();
	return (
		<Switch>
			<Route path={`${path}${TASK_ROUTES.Train}`}>
				<TaskTrain />
			</Route>
			<Route exact path={[`${path}${TASK_ROUTES.Tab}`, `${path}`]} component={TaskPageContainer} />
			<Redirect from="*" to={ROUTES.NotFound} />
		</Switch>
	);
};
