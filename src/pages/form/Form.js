import { useState } from 'react';
import '../../styles/form.scss';
import { IoChevronBackOutline } from 'react-icons/io5';
import { AiFillClockCircle } from 'react-icons/ai';
import {
	MdRadioButtonUnchecked,
	MdRadioButtonChecked,
	MdCheckBox,
	MdCheckBoxOutlineBlank,
} from 'react-icons/md';
import { FaPlusSquare, FaUserAlt } from 'react-icons/fa';
import { useHistory, useLocation } from 'react-router-dom';
import Buttons from '../../components/Buttons';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
}));

const Form = () => {
	const classes = useStyles();
	const location = useLocation();
	const history = useHistory();

	console.log('location', location.state);

	const [step, setStep] = useState(1);

	const [modalStep1, setModalStep1] = useState(false);

	const [modalCancelConfirm, setModalCancelConfirm] = useState(false);

	const handleOpenModalCancelConfirm = () => {
		setModalCancelConfirm(true);
	};

	const handleCloseModalCancelConfirm = () => {
		setModalCancelConfirm(false);
	};

	const [ask1, setAsk1] = useState(null);
	const [ask2, setAsk2] = useState(null);
	const [ask3, setAsk3] = useState(null);
	const [ask4, setAsk4] = useState(null);
	const [ask5, setAsk5] = useState(false);

	const handleCloseModalStep1 = () => {
		setModalStep1(false);
	};

	const onNextStep1 = () => {
		if (
			ask1 === null ||
			ask2 == null ||
			ask3 === null ||
			ask4 === null ||
			ask5 === false
		) {
			alert('Mohon Check List pada Form yang tersedia');
		} else if (
			ask1 === 'tidak' &&
			ask2 === 'tidak' &&
			ask3 === 'tidak' &&
			ask4 === 'tidak' &&
			ask5 === true
		) {
			setStep(2);
		} else {
			setModalStep1(true);
		}
	};

	console.log('stepcuy', step);

	const [dataDiri, setDataDiri] = useState({
		nama_lengkap: '',
		no_ktp: '',
		alamat: '',
		jk: null,
		email: '',
		no_hp: '',
		tanggal: '',
		waktu: '',
	});

	const [errorNamaLengkap, setErrorNamaLengkap] = useState(false);
	const [errorNoKTP, setErrorNoKTP] = useState(false);
	const [errorAlamat, setErrorAlamat] = useState(false);
	const [errorJK, setErrorJK] = useState(false);
	const [errorEmail, setErrorEmail] = useState(false);
	const [errorNoHP, setErrorNoHP] = useState(false);
	const [errorTgl, setErrorTgl] = useState(false);
	const [errorWaktu, setErrorWaktu] = useState(false);
	const [errorValidEmail, setErrorValidEmail] = useState(false);

	function validateEmail(email) {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	const onNextStep2 = () => {
		console.log('data cuk', dataDiri);
		if (dataDiri.nama_lengkap === '') {
			setErrorNamaLengkap(true);
		}

		if (dataDiri.no_ktp === '') {
			setErrorNoKTP(true);
		}

		if (dataDiri.alamat === '') {
			setErrorAlamat(true);
		}

		if (dataDiri.jk === null) {
			setErrorJK(true);
		}

		if (dataDiri.email === '') {
			setErrorEmail(true);
		} else {
			const isValidEmail = validateEmail(dataDiri.email);
			if (isValidEmail === false) {
				setErrorValidEmail(true);
			}
			console.log('valid email', isValidEmail);
		}

		if (dataDiri.no_hp === '') {
			setErrorNoHP(true);
		}

		if (
			dataDiri.nama_lengkap !== '' &&
			dataDiri.no_ktp !== '' &&
			dataDiri.alamat !== '' &&
			errorValidEmail === false &&
			dataDiri.jk !== null &&
			dataDiri.no_hp !== ''
		) {
			setStep(3);
		}
	};

	const [valueDate, onChangeDate] = useState(new Date());

	const [showDate, setShowDate] = useState(false);

	return (
		<div className='form-wrapper'>
			<div className='form-header'>
				<div className='header-logo'>
					<img
						src={require('../../assets/img_logo.png').default}
						alt='logo.png'
						className='img-logo'
					/>
				</div>
				<div className='header-title'>
					<div className='header-title1'>Pengadilan Negeri Jakarta Selatan</div>
					<div className='header-title2'>Mahkamah Agung Republik Indonesia</div>
				</div>
			</div>
			<div className='form-body'>
				<div className='form-body-content'>
					<div
						className='header-back-btn'
						onClick={handleOpenModalCancelConfirm}
					>
						{' '}
						<IoChevronBackOutline
							size={25}
							color='white'
							style={{ marginRight: 20 }}
						/>
						Kembali ke Menu Pelayanan
					</div>
					<div className='form-body-title'>{location.state}</div>
					<div className='form-body-stepper'>
						<div className='stepper-done'>
							<FaPlusSquare size={30} color='white' />
						</div>
						<div className='line' />
						<div className={step > 1 ? 'stepper-done' : 'stepper-notyet'}>
							<FaUserAlt size={30} color={step > 1 ? 'white' : 'orange'} />
						</div>
						<div className='line' />
						<div className={step > 2 ? 'stepper-done' : 'stepper-notyet'}>
							<AiFillClockCircle
								size={30}
								color={step > 2 ? 'white' : 'orange'}
							/>
						</div>
					</div>
					<div className='form-body-card'>
						<div className='card-content'>
							<div className='card-header'>
								<div className='card-title'>
									{step === 1
										? 'Penilaian Kesehatan'
										: step === 2
										? 'Identitas Diri'
										: 'Waktu'}
								</div>
							</div>
							{step === 1 ? (
								<div className='card-body'>
									<div className='card-body-section'>
										<div className='form-ask'>
											<div className='form-ask-word'>
												Apakah anda pernah melakukan perjalanan luar negeri
												dalam 2 minggu terakhir?
											</div>
											<div className='form-ask-option'>
												<div className='form-ask-option-check'>
													{ask1 === 'ya' ? (
														<MdRadioButtonChecked
															size={30}
															color='#8BA577'
															onClick={() => setAsk1(null)}
															style={{ cursor: 'pointer' }}
														/>
													) : (
														<MdRadioButtonUnchecked
															size={30}
															color='#C4C4C4'
															onClick={() => setAsk1('ya')}
															style={{ cursor: 'pointer' }}
														/>
													)}
													Ya
												</div>
												<div className='form-ask-option-check'>
													{ask1 === 'tidak' ? (
														<MdRadioButtonChecked
															size={30}
															color='#8BA577'
															onClick={() => setAsk1(null)}
															style={{ cursor: 'pointer' }}
														/>
													) : (
														<MdRadioButtonUnchecked
															size={30}
															color='#C4C4C4'
															onClick={() => setAsk1('tidak')}
															style={{ cursor: 'pointer' }}
														/>
													)}
													Tidak
												</div>
											</div>
										</div>
										<div className='form-ask'>
											<div className='form-ask-word'>
												Apakah anda pernah memiliki kontak langsung dengan orang
												yang terkonfirmasi COVID?
											</div>
											<div className='form-ask-option'>
												<div className='form-ask-option-check'>
													{ask2 === 'ya' ? (
														<MdRadioButtonChecked
															size={30}
															color='#8BA577'
															onClick={() => setAsk2(null)}
															style={{ cursor: 'pointer' }}
														/>
													) : (
														<MdRadioButtonUnchecked
															size={30}
															color='#C4C4C4'
															onClick={() => setAsk2('ya')}
															style={{ cursor: 'pointer' }}
														/>
													)}
													Ya
												</div>
												<div className='form-ask-option-check'>
													{ask2 === 'tidak' ? (
														<MdRadioButtonChecked
															size={30}
															color='#8BA577'
															onClick={() => setAsk2(null)}
															style={{ cursor: 'pointer' }}
														/>
													) : (
														<MdRadioButtonUnchecked
															size={30}
															color='#C4C4C4'
															onClick={() => setAsk2('tidak')}
															style={{ cursor: 'pointer' }}
														/>
													)}
													Tidak
												</div>
											</div>
										</div>
									</div>
									<div className='card-body-section'>
										<div className='form-ask'>
											<div className='form-ask-word'>
												Apakah anda saat ini dalam keadaan batuk/pilek/nyeri
												tenggorokan?
											</div>
											<div className='form-ask-option'>
												<div className='form-ask-option-check'>
													{ask3 === 'ya' ? (
														<MdRadioButtonChecked
															size={30}
															color='#8BA577'
															onClick={() => setAsk3(null)}
															style={{ cursor: 'pointer' }}
														/>
													) : (
														<MdRadioButtonUnchecked
															size={30}
															color='#C4C4C4'
															onClick={() => setAsk3('ya')}
															style={{ cursor: 'pointer' }}
														/>
													)}
													Ya
												</div>
												<div className='form-ask-option-check'>
													{ask3 === 'tidak' ? (
														<MdRadioButtonChecked
															size={30}
															color='#8BA577'
															onClick={() => setAsk3(null)}
															style={{ cursor: 'pointer' }}
														/>
													) : (
														<MdRadioButtonUnchecked
															size={30}
															color='#C4C4C4'
															onClick={() => setAsk3('tidak')}
															style={{ cursor: 'pointer' }}
														/>
													)}
													Tidak
												</div>
											</div>
										</div>
										<div className='form-ask'>
											<div className='form-ask-word'>
												Apakah anda saat ini sesak napas ringan/berat?
											</div>
											<div className='form-ask-option'>
												<div className='form-ask-option-check'>
													{ask4 === 'ya' ? (
														<MdRadioButtonChecked
															size={30}
															color='#8BA577'
															onClick={() => setAsk4(null)}
															style={{ cursor: 'pointer' }}
														/>
													) : (
														<MdRadioButtonUnchecked
															size={30}
															color='#C4C4C4'
															onClick={() => setAsk4('ya')}
															style={{ cursor: 'pointer' }}
														/>
													)}
													Ya
												</div>
												<div className='form-ask-option-check'>
													{ask4 === 'tidak' ? (
														<MdRadioButtonChecked
															size={30}
															color='#8BA577'
															onClick={() => setAsk4(null)}
															style={{ cursor: 'pointer' }}
														/>
													) : (
														<MdRadioButtonUnchecked
															size={30}
															color='#C4C4C4'
															onClick={() => setAsk4('tidak')}
															style={{ cursor: 'pointer' }}
														/>
													)}
													Tidak
												</div>
											</div>
										</div>
									</div>
									<div className='card-body-section'>
										<div className='empty-view'></div>
										<div className='form-pernyataan'>
											{ask5 ? (
												<MdCheckBox
													size={40}
													color='#8BA577'
													style={{ marginRight: 10, cursor: 'pointer' }}
													onClick={() => setAsk5(!ask5)}
												/>
											) : (
												<MdCheckBoxOutlineBlank
													size={40}
													color='#C4C4C4'
													style={{ marginRight: 10, cursor: 'pointer' }}
													onClick={() => setAsk5(!ask5)}
												/>
											)}
											<div style={{ textAlign: 'left' }}>
												Saya menyatakan bahwa data yang diisi adalah benar dan
												sesuai dengan kenyataan sebenarnya
											</div>
										</div>
									</div>
								</div>
							) : step === 2 ? (
								<div className='card-body'>
									<div className='card-body-section'>
										<div className='form-input'>
											<div className='form-input-section'>
												<div className='input-title'>
													Nama Lengkap : <span style={{ color: 'red' }}>*</span>{' '}
													<span style={{ color: 'red', fontStyle: 'italic' }}>
														{errorNamaLengkap ? '(harus diisi)' : null}{' '}
													</span>
												</div>

												<input
													className={
														errorNamaLengkap ? 'input-txt-error' : 'input-txt'
													}
													type='text'
													value={dataDiri.nama_lengkap}
													onChange={(e) => {
														if (e.target.value.length === 0) {
															setDataDiri({
																...dataDiri,
																nama_lengkap: '',
															});
															setErrorNamaLengkap(true);
														} else {
															setDataDiri({
																...dataDiri,
																nama_lengkap: e.target.value,
															});
															setErrorNamaLengkap(false);
														}
													}}
												/>
											</div>
											<div className='form-input-section'>
												<div className='input-title'>
													No. KTP / Passport :{' '}
													<span style={{ color: 'red' }}>*</span>{' '}
													<span style={{ color: 'red', fontStyle: 'italic' }}>
														{errorNoKTP ? '(harus diisi)' : null}{' '}
													</span>
												</div>

												<input
													className={
														errorNoKTP ? 'input-txt-error' : 'input-txt'
													}
													type='number'
													value={dataDiri.no_ktp}
													onChange={(e) => {
														if (e.target.value.toString().length === 0) {
															setDataDiri({
																...dataDiri,
																no_ktp: '',
															});
															setErrorNoKTP(true);
														} else {
															setDataDiri({
																...dataDiri,
																no_ktp: e.target.value,
															});
															setErrorNoKTP(false);
														}
													}}
												/>
											</div>
											<div className='form-input-section'>
												<div className='input-title'>
													Jenis Kelamin:{' '}
													<span style={{ color: 'red', fontStyle: 'italic' }}>
														{errorJK ? '(harus dipilih)' : null}{' '}
													</span>{' '}
												</div>
												<div className='form-ask-option'>
													<div className='form-ask-option-check'>
														{dataDiri.jk === 'laki' ? (
															<MdRadioButtonChecked
																size={30}
																color='#8BA577'
																onClick={() => {
																	setDataDiri({ ...dataDiri, jk: null });
																	setErrorJK(true);
																}}
																style={{ cursor: 'pointer' }}
															/>
														) : (
															<MdRadioButtonUnchecked
																size={30}
																color='#C4C4C4'
																onClick={() => {
																	setDataDiri({ ...dataDiri, jk: 'laki' });
																	setErrorJK(false);
																}}
																style={{ cursor: 'pointer' }}
															/>
														)}
														Laki-Laki
													</div>
													<div className='form-ask-option-check'>
														{dataDiri.jk === 'perempuan' ? (
															<MdRadioButtonChecked
																size={30}
																color='#8BA577'
																onClick={() => {
																	setDataDiri({ ...dataDiri, jk: null });
																	setErrorJK(true);
																}}
																style={{ cursor: 'pointer' }}
															/>
														) : (
															<MdRadioButtonUnchecked
																size={30}
																color='#C4C4C4'
																onClick={() => {
																	setDataDiri({ ...dataDiri, jk: 'perempuan' });
																	setErrorJK(false);
																}}
																style={{ cursor: 'pointer' }}
															/>
														)}
														Perempuan
													</div>
												</div>
											</div>
										</div>
										<div className='form-input'>
											<div className='form-input-section'>
												<div className='input-title'>
													Alamat Tempat Tinggal :{' '}
													<span style={{ color: 'red' }}>*</span>{' '}
													<span style={{ color: 'red', fontStyle: 'italic' }}>
														{errorAlamat ? '(harus diisi)' : null}{' '}
													</span>
												</div>

												<input
													className={
														errorAlamat ? 'input-txt-error' : 'input-txt'
													}
													type='text'
													value={dataDiri.alamat}
													onChange={(e) => {
														if (e.target.value.length === 0) {
															setDataDiri({
																...dataDiri,
																alamat: '',
															});
															setErrorAlamat(true);
														} else {
															setDataDiri({
																...dataDiri,
																alamat: e.target.value,
															});
															setErrorAlamat(false);
														}
													}}
												/>
											</div>
											<div className='form-input-section'>
												<div className='input-title'>
													Email : <span style={{ color: 'red' }}>*</span>{' '}
													<span style={{ color: 'red', fontStyle: 'italic' }}>
														{errorEmail
															? '(harus diisi)'
															: errorValidEmail
															? '(format email salah)'
															: null}{' '}
													</span>
												</div>

												<input
													className={
														errorEmail ? 'input-txt-error' : 'input-txt'
													}
													type='email'
													value={dataDiri.email}
													onChange={(e) => {
														if (e.target.value.length === 0) {
															setDataDiri({
																...dataDiri,
																email: '',
															});
															setErrorEmail(true);
														} else {
															setDataDiri({
																...dataDiri,
																email: e.target.value,
															});
															setErrorEmail(false);
															setErrorValidEmail(false);
														}
													}}
												/>
											</div>
											<div className='form-input-section'>
												<div className='input-title'>
													No. Handphone :{' '}
													<span style={{ color: 'red' }}>*</span>{' '}
													<span style={{ color: 'red', fontStyle: 'italic' }}>
														{errorNoHP ? '(harus diisi)' : null}{' '}
													</span>
												</div>

												<input
													className={
														errorNoHP ? 'input-txt-error' : 'input-txt'
													}
													type='number'
													value={dataDiri.no_hp}
													onChange={(e) => {
														if (e.target.value.toString().length === 0) {
															setDataDiri({ ...dataDiri, no_hp: '' });
															setErrorNoHP(true);
														} else {
															setDataDiri({
																...dataDiri,
																no_hp: e.target.value,
															});
															setErrorNoHP(false);
														}
													}}
												/>
											</div>
										</div>
									</div>
								</div>
							) : step === 3 ? (
								<div className='card-body'>
									<div className='card-body-section'>
										<div className='form-input'>
											<div className='form-input-section'>
												<div className='input-title'>
													Tanggal Kedatangan :{' '}
													<span style={{ color: 'red' }}>*</span>
												</div>
												<div>
													<input
														className='input-txt'
														onClick={() => setShowDate(!showDate)}
														value={valueDate}
														contentEditable={false}
													/>
												</div>
												{showDate ? (
													<div
														style={{
															display: 'flex',
															justifyContent: 'flex-end',
														}}
													>
														<Calendar
															onChange={(date) => {
																onChangeDate(date);
																setShowDate(!showDate);
																console.log('datenya', date);
															}}
															value={valueDate}
															locale='id'
															tileDisabled={({ activeStartDate, date, view }) =>
																date.getDay() === 6 || date.getDay() === 0
															}
														/>
													</div>
												) : null}
											</div>
										</div>
										<div className='form-input'>
											<div className='form-input-section'>
												<div className='input-title'>
													Jam Pelayanan :{' '}
													<span style={{ color: 'red' }}>*</span>
												</div>
												<div>
													<input className='input-txt' />
												</div>
											</div>
										</div>
									</div>
								</div>
							) : (
								<div className='card-body'>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
										}}
									>
										<img
											src={require('../../assets/ic_check.png').default}
											alt='check.png'
											className='ic-check'
										/>
										<div className='txt-book-done'>Pemesanan Berhasil</div>
										<div className='txt-check-email'>
											Silahkan cek Email Anda untuk melihat data pemesanan.
										</div>
									</div>
								</div>
							)}
							<div className='card-footer'>
								{step === 1 ? (
									<Buttons
										className='button-2'
										text='Selanjutnya'
										onClick={onNextStep1}
									/>
								) : step === 2 ? (
									<>
										<Buttons
											className='button-3'
											text='Kembali'
											onClick={() => setStep(1)}
										/>
										<Buttons
											className='button-2'
											text='Selanjutnya'
											onClick={onNextStep2}
										/>
									</>
								) : step === 3 ? (
									<>
										<Buttons
											className='button-3'
											text='Kembali'
											onClick={() => setStep(2)}
										/>
										<Buttons
											className='button-2'
											text='Booking'
											onClick={() => alert('next')}
										/>
									</>
								) : (
									<Buttons
										className='button-2'
										text='Selesai'
										onClick={() => alert('next')}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={modalStep1}
				onClose={handleCloseModalStep1}
				closeAfterTransition
				disableBackdropClick
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={modalStep1}>
					<div className={classes.paper}>
						<div style={{ fontSize: 24, fontWeight: 700 }}>
							Maaf, Permohonan Anda Ditolak
						</div>
						<div
							style={{
								fontSize: 18,
								textAlign: 'center',
								margin: '30px 30px',
							}}
						>
							Permohonan Pengajuan Nomor Antrian Anda terpaksa kami tolak karena
							Anda belum memenuhi syarat Penilaian Kesehatan kami. Mohon Ajukan
							kembali lain waktu.
						</div>
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<Buttons
								className='button-2'
								text='OK'
								// onClick={() => setModalStep1(false)}
								onClick={() => history.goBack()}
							/>
						</div>
					</div>
				</Fade>
			</Modal>

			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={modalCancelConfirm}
				onClose={handleCloseModalCancelConfirm}
				closeAfterTransition
				// disableBackdropClick
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={modalCancelConfirm}>
					<div className={classes.paper}>
						<div style={{ fontSize: 24, fontWeight: 700 }}>
							Konfirmasi Pembatalan
						</div>
						<div
							style={{
								fontSize: 18,
								textAlign: 'center',
								margin: '30px 30px',
							}}
						>
							Apakah Anda yakin untuk membatalkan proses penginputan ? Anda
							harus memasukkan data Anda kembali apabila membatalkan proses ini.
						</div>
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'space-evenly',
							}}
						>
							<Buttons
								className='button-3'
								text='Tidak'
								onClick={handleCloseModalCancelConfirm}
							/>
							<Buttons
								className='button-2'
								text='Ya, Batalkan'
								onClick={() => {
									setModalStep1(false);
									history.goBack();
								}}
							/>
						</div>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default Form;
