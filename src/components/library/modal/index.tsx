import React from 'react';
import Button from '@material-ui/core/Button';
import { IModalProps } from './types';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	useTheme,
	useMediaQuery
} from '@material-ui/core';

export const ModalComponent = ({ buttonText, modalTitle, modalBody }: IModalProps) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button type="button" onClick={handleOpen} color="primary">
				{buttonText}
			</Button>
			<Dialog
				fullScreen={fullScreen}
				fullWidth
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">{modalTitle}</DialogTitle>
				<DialogContent>
					<DialogContentText>{modalBody}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose} color="primary">
						Cancel
					</Button>
					{/* <Button
						onClick={() =>
							document?.getElementById('taskForm')?.dispatchEvent(new Event('submit', { cancelable: true }))
						}
						color="primary"
						autoFocus
					>
						Submit
					</Button> */}
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ModalComponent;
