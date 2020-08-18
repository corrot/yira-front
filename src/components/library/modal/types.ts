export interface IModalProps {
	width?: number;
	height?: number;
	buttonText: string;
	modalTitle?: string;
	modalBody: JSX.Element;
	submitFunc?: () => any;
}
