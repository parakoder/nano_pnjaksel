import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(37,40,43, 0.7)',
		outline: 'none',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		outline: 'none',
		padding: theme.spacing(2, 4, 3),
		width: '60%',
		borderRadius: 10,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	simpleDialog: {
		backgroundColor: theme.palette.background.paper,
		outline: 'none',
		padding: '20px',
		borderRadius: 10,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
}));

const Modals = ({ open, onClose, children, disableBackdropClick }) => {
	const classes = useStyles();
	return (
		<Modal
			aria-labelledby='transition-modal-title'
			aria-describedby='transition-modal-description'
			className={classes.modal}
			open={open}
			onClose={onClose}
			closeAfterTransition
			disableBackdropClick={disableBackdropClick}
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={open}>{children}</Fade>
		</Modal>
	);
};

export default Modals;
