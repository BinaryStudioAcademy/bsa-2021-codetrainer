import { WebApi } from 'typings/webapi';

export type TLoader<R extends WebApi.Types.IPaginationRequest, T> = (
	req: R,
) => Promise<WebApi.Types.IPaginationResponse<T>>;
