export interface IModalProps {
	width?: number;
	height?: number;
	buttonText: string | JSX.Element;
	modalTitle?: string;
	modalBody: JSX.Element;
	submitFunc?: () => any;
}
