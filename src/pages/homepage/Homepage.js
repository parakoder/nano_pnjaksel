import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './homepage.scss';
import Buttons from '../../components/Buttons';
import CardLayanan from '../../components/CardLayanan';
import Gap from '../../components/Gap';
import { FaChevronRight, FaYoutube } from 'react-icons/fa';
import { RiShareBoxLine } from 'react-icons/ri';
import Guide from '../../components/Guide';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

const Homepage = () => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className='home-wrapper'>
			<div className='header'>
				<div className='title-bar'>
					<div className='title-bar-logo'>
						<img
							src={require('../../assets/img_logo.png').default}
							alt='logo.png'
							className='img-logo'
						/>
					</div>
					<div className='title-bar-txt'>
						<div className='title-bar-txt-1'>
							Pengadilan Negeri Jakarta Selatan
						</div>
						<div className='title-bar-txt-2'>
							Mahkamah Agung Republik Indonesia
						</div>
					</div>
				</div>
				<div className='menu-bar'>
					<div>Layanan</div>
					<div>Cara Pengambilan</div>
					<div>Ketentuan Pengambilan</div>
				</div>
			</div>
			<div className='body'>
				<img
					src={require('../../assets/img_banner.png').default}
					alt='banner.png'
					className='banner'
				/>
				<div className='section-1'>
					<div className='welcome-txt'>
						Selamat Datang di Aplikasi Antrian Online Pengadilan Negeri Jakarta
						Selatan
					</div>
					<div style={{ marginTop: 30, marginBottom: 30 }}>
						<Buttons
							className='button-1'
							text='Pilih Meja Layanan'
							onClick={() => alert('Pengadilan')}
						/>
					</div>
					<div className='menu-layanan'>
						<CardLayanan
							imageSource={require('../../assets/img_e-Court.png').default}
							className='card-1'
							text='E-Court'
						/>

						<CardLayanan
							imageSource={require('../../assets/img_information.png').default}
							className='card-1'
							text='Pengaduan & Informasi'
						/>
						<CardLayanan
							imageSource={
								require('../../assets/img_kepanitraan_hukum.png').default
							}
							className='card-1'
							text='Kepaniteraan Hukum'
						/>
						<CardLayanan
							imageSource={
								require('../../assets/img_kepaniteraan_pidana.png').default
							}
							className='card-1'
							text='Kepaniteraan Pidana'
						/>
						<CardLayanan
							imageSource={require('../../assets/img_perdata.png').default}
							className='card-1'
							text='Upaya Hukum Perdata'
						/>
						<CardLayanan
							imageSource={
								require('../../assets/img_salinan_putusan.png').default
							}
							className='card-1'
							text='Salinan Putusan Perdata/Eksekusi'
						/>
						<CardLayanan
							imageSource={require('../../assets/img_umum_surat.png').default}
							className='card-1'
							text='Umum dan Surat Masuk'
						/>
					</div>
				</div>
				<div className='section-2'>
					<div style={{ marginTop: 50, marginBottom: 50 }}>
						<Buttons
							className='button-1'
							text='Cara Mengambil Nomor Antrian'
							onClick={() => alert('test')}
						/>
					</div>
					<div className='section2-guide'>
						<Guide
							text='Pilih dan baca Informasi Layanan'
							imageSource={require('../../assets/img_guide1.png').default}
						/>
						<div className='line-arrow-guide'>
							<FaChevronRight size={40} color='white' />
						</div>
						<Guide
							text={`Isi Form Pendaftaran${'\n'}Layanan.`}
							imageSource={require('../../assets/img_guide2.png').default}
						/>
						<div className='line-arrow-guide'>
							<FaChevronRight size={40} color='white' />
						</div>
						<Guide
							text='Data Antri akan dikirimkan ke Email terdaftar.'
							imageSource={require('../../assets/img_guide3.png').default}
						/>
					</div>
					<div className='section2-ytcard'>
						<div className='ytcard-wrapper'>
							<img
								src={require('../../assets/img_ytcard.png').default}
								alt='ytcard'
								className='yt-thumbnail'
							/>
							<div className='ytcard-content'>
								<div className='ytcard-txt-title'>
									Pelayanan Terpadu Satu Pintu Pengadilan Negri Jakarta Selatan
								</div>
								<div className='ytcard-txt-subtitle'>
									<FaYoutube color='red' size={30} />
									<span style={{ margin: '0px 10px' }}>Tonton di Youtube</span>
									<RiShareBoxLine size={15} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='section-3'>
					<div style={{ marginTop: 30, marginBottom: 30 }}>
						<Buttons
							className='button-1'
							text='Ketentuan Pengambilan Nomor Antrian'
							onClick={() => alert('Pengadilan')}
						/>
					</div>
					<p className='section3-txt-desc'>
						1. Silahkan Pilih Jenis Layanan dan Waktu Kedatangan Anda ke Kantor
						PN Jakarta Selatan.
						<br />
						2. Nomor Antrian akan dikirim secara otomatis ke Alamat Email Anda.
						<br />
						3. Pastikan Anda datang 10 menit sebelum waktu kedatangan yang Anda
						pilih, dengan membawa identitas diri. Petugas akan mengecek
						kesesuian nomor antrian dengan identitas Anda.
					</p>
				</div>
			</div>
			<div className='footer'>
				<div className='footer-section1'>
					<div className='footer-section1-content1'>
						<p className='footer-content-title'>
							Pengadilan Negeri Jakarta Selatan
						</p>
						<p className='footer-content-subtitle'>
							Jl. Ampera Raya No.133, RT.5/RW.10, Ragunan, Kec. Ps. Minggu, Kota
							Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12940
						</p>
					</div>
					<div className='footer-section1-content2'>
						<div>
							<p className='footer-content-title'>Telepon/Fax</p>
							<p className='footer-content-subtitle'>
								021-7805909, 021-7805908
							</p>
						</div>
						<div>
							<p className='footer-content-title'>Nomor Pengaduan</p>
							<p className='footer-content-subtitle'>081317737304</p>
						</div>
					</div>
					<div className='footer-section1-content3'>
						<p className='footer-content-title'>Kanal Sosial</p>
						<p>ig youtube</p>
					</div>
				</div>
				<p className='footer-section2'>
					© Copyright 2021 Pengadilan Negeri Jakarta Selatan
				</p>
			</div>
			{/* <button type='button' onClick={handleOpen}>
                Click Modal
            </button> */}
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				disableBackdropClick
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<h2 id='transition-modal-title'>Transition modal</h2>
						<p id='transition-modal-description'>
							react-transition-group animates me.
						</p>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default Homepage;
