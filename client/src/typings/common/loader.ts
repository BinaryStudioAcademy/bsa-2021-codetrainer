import { WebApi } from 'typings/webapi';

export type TLoader<Req extends WebApi.Types.TPaginationRequest, Res> = (req: Req) => Promise<Res>;
