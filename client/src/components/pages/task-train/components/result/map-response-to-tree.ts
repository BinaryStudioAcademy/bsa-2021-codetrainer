import { ITreeView } from 'components/basic/tree-view';
import { ITestResponseElement } from 'containers/task-train/logic/state';

interface IMapResponseToTree {
	response?: {
		failures: ITestResponseElement[];
		passes: ITestResponseElement[];
	};
	errorClass: string;
	successClass: string;
	nodeLabelClass: string;
}

const elementsToTree = (elements: ITestResponseElement[], className: string, nodeLabelClass: string): ITreeView[] => {
	return elements.reduce((prev, element) => {
		const title = element.fullTitle.replace(element.title, '').trim();
		const child = {
			arrowClass: className,
			nodeLabelClass,
		};
		const children = (nodeLabel: string): ITreeView => ({
			...child,
			nodeLabel,
			children: [element.err?.message ?? 'passes'],
			childClass: className,
		});
		const some = prev.some((element) => element.nodeLabel === title);
		return !some
			? [...prev, { ...child, nodeLabel: title, children: [children(element.title)] }]
			: prev.map((elem) =>
					elem.nodeLabel === title
						? { ...elem, children: [...(elem.children as ITreeView[]), children(element.title)] }
						: elem,
			  );
	}, [] as ITreeView[]);
};

export const mapResponseToTree = (data: IMapResponseToTree): ITreeView[] => {
	const { response, errorClass, successClass, nodeLabelClass } = data;
	return response
		? [
				...elementsToTree(response.failures, errorClass, nodeLabelClass),
				...elementsToTree(response.passes, successClass, nodeLabelClass),
		  ]
		: [];
};
