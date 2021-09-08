import { useState, useEffect } from 'react';
import Fade from '@material-ui/core/Fade';
import '../../styles/homepage.scss';
import Buttons from '../../components/Buttons';
import CardLayanan from '../../components/CardLayanan';
import { FaChevronRight, FaYoutube } from 'react-icons/fa';
import { RiShareBoxLine } from 'react-icons/ri';
import { IoMenuOutline, IoCloseOutline } from 'react-icons/io5';
import Guide from '../../components/Guide';
import {
    AiFillCaretLeft,
    AiFillCaretRight,
    AiOutlineClose,
} from 'react-icons/ai';
import res from '../../services/utils/data.json';
import { IMAGESOURCE } from '../../services/utils/constants';
import { useHistory } from 'react-router-dom';
import { GetAllPelayanan } from '../../services/handlers/PelayananHandler';
import Modals from '../../components/Modals';
import { BookingOfflineHandler } from '../../services/handlers/BookingHandler';

const Homepage = () => {
    const history = useHistory();
    const [open, setOpen] = useState(false);

    const [selectedMenu, setSelectedMenu] = useState('layanan');

    console.log('data res', res);
    console.log('data imageSource', IMAGESOURCE);

    const [menuLayanan, setMenuLayanan] = useState([]);

    const [selectedLayanan, setSelectedLayanan] = useState({
        id: 0,
        pelayanan: '',
        description: [],
    });

    useEffect(() => {
        let newArr = [];
        GetAllPelayanan()
            .then((res) => {
                console.log('ressdad', res);
                res.data &&
                    res.data.map((o, i) => {
                        let item = {
                            ...o,
                            imageSource: IMAGESOURCE[i].imageSource,
                        };
                        return newArr.push(item);
                    });
                setMenuLayanan(newArr);
            })
            .catch((err) => {
                console.log('err res', err);
            });
        return () => {};
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onPreviousLayanan = () => {
        const findObj = menuLayanan.find(
            (o) =>
                o.id ===
                (selectedLayanan.id > 1
                    ? selectedLayanan.id - 1
                    : menuLayanan[menuLayanan.length - 1].id)
        );
        setSelectedLayanan(findObj);
    };

    const onNextLayanan = () => {
        console.log('mmmm', menuLayanan);
        const findObj = menuLayanan.find(
            (o) =>
                o.id ===
                (selectedLayanan.id < 7
                    ? selectedLayanan.id + 1
                    : menuLayanan[0].id)
        );
        setSelectedLayanan(findObj);
        console.log('findObj', findObj);
    };

    const [isBurgerShow, setIsBurgerShow] = useState(true);

    const onBooking = () => {
        BookingOfflineHandler(selectedLayanan.id)
            .then((res) => {
                console.log('onBooking', res);
                setOpen(false);
            })
            .catch((err) => {
                console.log('err booking', err);
            });
    };

    return (
        <div className='home-wrapper'>
            {/* <div className='header-wrapper'>
                <div className='header'>
                    <div className='title-bar'>
                        <div className='title-bar-logo'>
                            <img
                                src={
                                    require('../../assets/img_logo.png').default
                                }
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
                        <div className='main-menu'>
                            <a
                                className='menu-title'
                                href='#layanan'
                                onClick={() => {
                                    setSelectedMenu('layanan');
                                }}
                                style={{
                                    fontWeight:
                                        selectedMenu === 'layanan'
                                            ? 'bold'
                                            : 'normal',
                                }}
                            >
                                Layanan
                            </a>
                            <a
                                className='menu-title'
                                href='#pengambilan'
                                onClick={() => {
                                    setSelectedMenu('pengambilan');
                                }}
                                style={{
                                    fontWeight:
                                        selectedMenu === 'pengambilan'
                                            ? 'bold'
                                            : 'normal',
                                }}
                            >
                                Cara Pengambilan
                            </a>
                            <a
                                className='menu-title'
                                href='#ketentuan'
                                onClick={() => {
                                    setSelectedMenu('ketentuan');
                                }}
                                style={{
                                    fontWeight:
                                        selectedMenu === 'ketentuan'
                                            ? 'bold'
                                            : 'normal',
                                }}
                            >
                                Ketentuan Pengambilan
                            </a>
                        </div>
                        <div className='burger-menu'>
                            {isBurgerShow ? (
                                <IoMenuOutline
                                    size={40}
                                    onClick={() => setIsBurgerShow(false)}
                                />
                            ) : (
                                <IoCloseOutline
                                    size={40}
                                    onClick={() => setIsBurgerShow(true)}
                                />
                            )}
                        </div>
                    </div>
                </div>
                {!isBurgerShow ? (
                    <div className='header-burger'>
                        <a
                            className='header-burger-menu'
                            href='#layanan'
                            onClick={() => {
                                setSelectedMenu('layanan');
                                setIsBurgerShow(true);
                            }}
                            style={{
                                fontWeight:
                                    selectedMenu === 'layanan'
                                        ? 'bold'
                                        : 'normal',
                            }}
                        >
                            Layanan
                        </a>
                        <a
                            className='header-burger-menu'
                            href='#pengambilan'
                            onClick={() => {
                                setSelectedMenu('pengambilan');
                                setIsBurgerShow(true);
                            }}
                            style={{
                                fontWeight:
                                    selectedMenu === 'pengambilan'
                                        ? 'bold'
                                        : 'normal',
                            }}
                        >
                            Cara Pengambilan
                        </a>
                        <a
                            className='header-burger-menu'
                            href='#ketentuan'
                            onClick={() => {
                                setSelectedMenu('ketentuan');
                                setIsBurgerShow(true);
                            }}
                            style={{
                                fontWeight:
                                    selectedMenu === 'ketentuan'
                                        ? 'bold'
                                        : 'normal',
                            }}
                        >
                            Ketentuan Pengambilan
                        </a>
                    </div>
                ) : null}
            </div> */}

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
                    <div style={{ marginTop: 30 }}>
                        <Buttons
                            id='layanan'
                            className='button-1'
                            text='Pilih Meja Layanan'
                        />
                    </div>
                    <div className='menu-layanan'>
                        {menuLayanan.map((val) => {
                            return (
                                <div key={val.id}>
                                    <CardLayanan
                                        imageSource={val.imageSource}
                                        className='card-1'
                                        text={val.pelayanan}
                                        onClick={() => {
                                            handleOpen();
                                            setSelectedLayanan(val);
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* <div className='section-2'>
                    <div style={{ marginTop: 50, marginBottom: 50 }}>
                        <Buttons
                            id='pengambilan'
                            className='button-1'
                            text='Cara Mengambil Nomor Antrian'
                        />
                    </div>
                    <div className='section2-guide'>
                        <Guide
                            text='Pilih dan baca Informasi Layanan'
                            imageSource={
                                require('../../assets/img_guide1.png').default
                            }
                        />
                        <div className='line-arrow-guide'>
                            <FaChevronRight size={40} color='white' />
                        </div>
                        <Guide
                            text={`Isi Form Pendaftaran${'\n'}Layanan.`}
                            imageSource={
                                require('../../assets/img_guide2.png').default
                            }
                        />
                        <div className='line-arrow-guide'>
                            <FaChevronRight size={40} color='white' />
                        </div>
                        <Guide
                            text='Data Antri akan dikirimkan ke Email terdaftar.'
                            imageSource={
                                require('../../assets/img_guide3.png').default
                            }
                        />
                    </div>
                    <div className='section2-ytcard'>
                        <a
                            href='https://www.youtube.com/watch?v=Jza4bWYCSQg'
                            target='_blank'
                            alt='yt'
                            rel='noreferrer'
                            style={{
                                textDecoration: 'none',
                                color: 'black',
                                cursor: 'pointer',
                            }}
                        >
                            <div className='ytcard-wrapper'>
                                <img
                                    src={
                                        require('../../assets/img_ytcard.png')
                                            .default
                                    }
                                    alt='ytcard'
                                    className='yt-thumbnail'
                                />
                                <div className='ytcard-content'>
                                    <div className='ytcard-txt-title'>
                                        Pelayanan Terpadu Satu Pintu Pengadilan
                                        Negri Jakarta Selatan
                                    </div>
                                    <div className='ytcard-txt-subtitle'>
                                        <FaYoutube color='red' size={30} />
                                        <span style={{ margin: '0px 10px' }}>
                                            Tonton di Youtube
                                        </span>
                                        <RiShareBoxLine size={15} />
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div className='section-3'>
                    <div style={{ marginTop: 30, marginBottom: 30 }}>
                        <Buttons
                            id='ketentuan'
                            className='button-1'
                            text='Ketentuan Pengambilan Nomor Antrian'
                        />
                    </div>
                    <p className='section3-txt-desc'>
                        1. Silahkan Pilih Jenis Layanan dan Waktu Kedatangan
                        Anda ke Kantor PN Jakarta Selatan.
                        <br />
                        2. Nomor Antrian akan dikirim secara otomatis ke Alamat
                        Email Anda.
                        <br />
                        3. Pastikan Anda datang 15 menit sebelum waktu
                        kedatangan yang Anda pilih, dengan membawa identitas
                        diri. Petugas akan mengecek kesesuian nomor antrian
                        dengan identitas Anda.
                    </p>
                </div> */}
            </div>
            {/* <div className='footer'>
                <div className='footer-section1'>
                    <div className='footer-section1-content1'>
                        <p className='footer-content-title'>
                            Pengadilan Negeri Jakarta Selatan
                        </p>
                        <p className='footer-content-subtitle'>
                            Jl. Ampera Raya No.133, RT.5/RW.10, Ragunan, Kec.
                            Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus
                            Ibukota Jakarta 12940
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
                            <p className='footer-content-title'>
                                Nomor Pengaduan
                            </p>
                            <p className='footer-content-subtitle'>
                                081317737304
                            </p>
                        </div>
                    </div>
                    <div className='footer-section1-content3'>
                        <p className='footer-content-title'>Kanal Sosial</p>
                        <div>
                            <a
                                href='https://www.instagram.com/pn.jakartaselatan/'
                                style={{ cursor: 'pointer' }}
                                target='_blank'
                                rel='noreferrer'
                            >
                                <img
                                    src={
                                        require('../../assets/img_ig.png')
                                            .default
                                    }
                                    alt='ig.png'
                                    className='icon-sosmed'
                                />
                            </a>
                            <a
                                href='https://www.youtube.com/channel/UCBM0SDZ4uyDg9zG6UO_-OKw'
                                style={{ cursor: 'pointer' }}
                                target='_blank'
                                rel='noreferrer'
                            >
                                <FaYoutube
                                    color='red'
                                    size={32}
                                    className='icon-sosmed'
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <p className='footer-section2'>
                    © Copyright 2021 Pengadilan Negeri Jakarta Selatan
                </p>
            </div> */}
            <Modals
                open={open}
                onClose={handleClose}
                disableBackdropClick
                children={
                    <Fade in={open}>
                        <div className='modal-menu-layanan'>
                            <AiFillCaretLeft
                                size={50}
                                color='white'
                                className='modal-arrow'
                                onClick={onPreviousLayanan}
                            />
                            <div className='modal-menu-wrapper'>
                                <div
                                    className='modal-btn-close'
                                    onClick={() => setOpen(false)}
                                >
                                    <AiOutlineClose size={20} />
                                </div>
                                <div>
                                    <div className='modal-menu-logo'>
                                        <img
                                            src={selectedLayanan.imageSource}
                                            alt='modal.png'
                                            className='modal-menu-img'
                                        />
                                    </div>
                                    <div className='modal-menu-desc'>
                                        <p className='modal-txt-title'>
                                            Informasi Layanan{' '}
                                            {selectedLayanan.pelayanan}
                                        </p>
                                        <div className='modal-txt-desc-wrapper'>
                                            {selectedLayanan.description !==
                                                null &&
                                                selectedLayanan.description.map(
                                                    (o, i) => {
                                                        return (
                                                            <div
                                                                key={i}
                                                                className='modal-txt-desc'
                                                            >
                                                                {o}
                                                            </div>
                                                        );
                                                    }
                                                )}
                                        </div>
                                        <div
                                            style={{
                                                marginTop: 50,
                                                marginBottom: 30,
                                            }}
                                        >
                                            <Buttons
                                                className='button-2'
                                                text='Booking Now'
                                                // onClick={() =>
                                                //     history.push({
                                                //         pathname: '/form',
                                                //         state: selectedLayanan,
                                                //     })
                                                // }
                                                onClick={onBooking}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <AiFillCaretRight
                                size={50}
                                color='white'
                                className='modal-arrow'
                                onClick={onNextLayanan}
                            />
                        </div>
                    </Fade>
                }
            />
        </div>
    );
};

export default Homepage;
