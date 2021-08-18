import { TaskApiPath } from 'enum';
import { http } from 'services';

export const getById = async (id: string | null) => {
    if(id===null){
        return {
            error: true,
            message: 'Task is not found'
        }
    }
	const result = await http.callWebApi({
		method: 'GET',
		endpoint: TaskApiPath.ROOT+id,
        skipAuthorization: false
	});
    
	return result;
};
