import { IThemeMode } from '@/styled/themes';
import { Action } from '@/types';

export interface ITask {
	id: number;
	title: string;
	dueDate: Date;
	createDate: Date;
	isResolved: boolean;
	description: string;
	steps: string[];
	link: string;
}
