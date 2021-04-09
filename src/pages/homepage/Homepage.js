import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import './homepage.scss';
import Buttons from '../../components/Buttons';
import CardLayanan from '../../components/CardLayanan';
import Gap from '../../components/Gap';
import { FaChevronRight } from 'react-icons/fa';
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
            <div className='toolbar'>
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
                        Selamat Datang di Aplikasi Antrian Online Pengadilan
                        Negeri Jakarta Selatan
                    </div>

                    <Buttons
                        className='button-1'
                        text='Pilih Meja Layanan'
                        onClick={() => alert('Pengadilan')}
                    />
                    <div className='menu-layanan'>
                        <CardLayanan
                            imageSource={
                                require('../../assets/img_e-Court.png').default
                            }
                            className='card-1'
                            text='E-Court'
                        />

                        <CardLayanan
                            imageSource={
                                require('../../assets/img_information.png')
                                    .default
                            }
                            className='card-1'
                            text='Pengaduan & Informasi'
                        />
                        <CardLayanan
                            imageSource={
                                require('../../assets/img_kepanitraan_hukum.png')
                                    .default
                            }
                            className='card-1'
                            text='Kepaniteraan Hukum'
                        />
                        <CardLayanan
                            imageSource={
                                require('../../assets/img_kepaniteraan_pidana.png')
                                    .default
                            }
                            className='card-1'
                            text='Kepaniteraan Pidana'
                        />
                        <CardLayanan
                            imageSource={
                                require('../../assets/img_perdata.png').default
                            }
                            className='card-1'
                            text='Upaya Hukum Perdata'
                        />
                        <CardLayanan
                            imageSource={
                                require('../../assets/img_salinan_putusan.png')
                                    .default
                            }
                            className='card-1'
                            text='Salinan Putusan Perdata/Eksekusi'
                        />
                        <CardLayanan
                            imageSource={
                                require('../../assets/img_umum_surat.png')
                                    .default
                            }
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
                            imageSource={
                                require('../../assets/img_guide1.png').default
                            }
                        />
                        <div
                            style={{
                                height: 5,
                                width: 150,
                                background: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 50,
                            }}
                        >
                            <FaChevronRight size={40} color='white' />
                        </div>
                        <Guide
                            text='Isi Form Pendaftaran Layanan.'
                            imageSource={
                                require('../../assets/img_guide2.png').default
                            }
                        />
                        <div
                            style={{
                                height: 5,
                                width: 150,
                                background: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 50,
                            }}
                        >
                            <FaChevronRight size={40} color='white' />
                        </div>
                        <Guide
                            text='Data Antri akan dikirimkan ke Nomor Whatsapp terdaftar.'
                            imageSource={
                                require('../../assets/img_guide3.png').default
                            }
                        />
                    </div>
                </div>
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
