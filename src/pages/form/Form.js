import { useEffect, useState } from 'react';
import '../../styles/form.scss';
import { IoChevronBackOutline } from 'react-icons/io5';
import { AiFillClockCircle } from 'react-icons/ai';
import { BsDownload } from 'react-icons/bs';
import { VscIssueClosed } from 'react-icons/vsc';
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
import Fade from '@material-ui/core/Fade';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { ARRIVAL_TIME, JAM_WIB } from '../../services/utils/constants';
import { CheckAvailableDateHandler } from '../../services/handlers/ScheduleHandler';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BookingHandler } from '../../services/handlers/BookingHandler';
import Modals from '../../components/Modals';
import { DownloadHandler } from '../../services/handlers/DownloadHandler';
import { GenerateEmail } from '../../services/handlers/GenerateHandler';

const useStyles = makeStyles((theme) => ({
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

    const [errorModalAsk, setErrorModalAsk] = useState(false);

    const onNextStep1 = () => {
        if (
            ask1 === null ||
            ask2 == null ||
            ask3 === null ||
            ask4 === null ||
            ask5 === false
        ) {
            setErrorModalAsk(true);
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

    const handleCloseErrorModalAsk = () => {
        setErrorModalAsk(false);
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
        waktu: 0,
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

    const [arrAvailabelTime, setArrAvailabelTime] = useState([
        {
            id: 0,
            time: '',
        },
    ]);

    const [showListAvailable, setShowListAvailable] = useState(false);
    const [selectedJam, setSelectedJam] = useState(null);

    const [valueDate, onChangeDate] = useState(null);

    const [showDate, setShowDate] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const findTime = (avTime) => {
        const obj = ARRIVAL_TIME.find((o) => o.id === avTime);
        return obj;
    };

    const [isAvailable, setIsAvailable] = useState(false);

    const checkSchedule = async (date) => {
        setIsLoading(true);
        try {
            const response = await CheckAvailableDateHandler(
                date,
                location.state.id
            );
            console.log('response check handler', response);
            if (response.status === 200) {
                if (response.data.isAvailable === true) {
                    let newArr = [];
                    response.data.availableTime.map((val) => {
                        let item = {
                            id: val,
                            time: findTime(val).time,
                        };
                        return newArr.push(item);
                    });
                    setArrAvailabelTime(newArr);
                    setShowListAvailable(true);
                    setIsLoading(false);
                    setIsAvailable(false);
                } else {
                    setArrAvailabelTime([]);
                    setIsAvailable(true);
                    setIsLoading(false);
                    setShowListAvailable(false);
                }
            }
        } catch (error) {
            console.log('error');
            setIsLoading(false);
        }
    };

    const handleCloseLoading = () => {
        setIsLoading(false);
    };

    const onSelectedJam = (value) => {
        setSelectedJam(value);
        setShowListAvailable(false);
    };

    const [isLoadingBooking, setIsLoadingBooking] = useState(false);

    const [antrianID, setAntrianID] = useState(null);

    const [dataGenerate, setDataGenerate] = useState(null);

    const onBookingPress = () => {
        if (valueDate === null) {
            setErrorTgl(true);
        }

        if (selectedJam === null) {
            setErrorWaktu(true);
        }

        if (valueDate !== null && selectedJam !== null) {
            setIsLoadingBooking(true);
            BookingHandler(dataDiri, location.state.id)
                .then((res) => {
                    console.log('res booking', res);
                    if (res.status === 200) {
                        // setAntrianID(res.data.ID.toString());
                        setAntrianID(res.data.ID);
                        setDataGenerate(res.data);
                        setIsLoadingBooking(false);
                        setStep(4);
                    }
                })
                .catch((err) => {
                    if (err.request.status === 500) {
                        alert('Terjadi Kesalahan. Silahkan Coba lagi.');
                    }
                    console.log('err booking', err);
                    setIsLoadingBooking(false);
                });
        }
    };

    const [countdownEmail, setCountdownEmail] = useState(20);

    useEffect(() => {
        if (step === 4 && countdownEmail > 0) {
            setTimeout(() => setCountdownEmail(countdownEmail - 1), 1000);
        }
        return () => {
            console.log('unmount timer');
        };
    }, [step, countdownEmail]);

    console.log('dataDiri', dataDiri);

    console.log('antrianID', antrianID);
    const onDownloadFile = () => {
        // const stringID = antrianID.toString();
        DownloadHandler(antrianID)
            .then((res) => {
                console.log('res download', res.data);
                const url = window.URL.createObjectURL(
                    new Blob([res.data], { type: 'application/pdf' })
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', antrianID);
                document.body.appendChild(link);
                link.click();
            })
            .catch((err) => {
                console.log('err download', err);
            });
    };

    const findTimeWIB = (avTime) => {
        const obj = JAM_WIB.find((o) => o.id === avTime);
        return obj;
    };

    const onGenerate = () => {
        const data = {
            id: dataGenerate.ID,
            jadwal: moment(dataGenerate.tanggalKedatangan).format('YYYY-MM-DD'),
            antrian: dataGenerate.noAntrian,
            loket: location.state.pelayanan,
            email: dataGenerate.email,
            name: dataGenerate.namaLengkap,
            waktu: findTimeWIB(dataGenerate.jamKedatangan).time,
        };
        GenerateEmail(data)
            .then((res) => {
                console.log('generate', res);
                setCountdownEmail(20);
            })
            .catch((err) => {
                console.log('err', err);
            });
    };

    console.log('dataGenerate', dataGenerate);

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
                    <div className='header-title1'>
                        Pengadilan Negeri Jakarta Selatan
                    </div>
                    <div className='header-title2'>
                        Mahkamah Agung Republik Indonesia
                    </div>
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
                    <div className='form-body-title'>
                        {location.state.pelayanan}
                    </div>
                    <div className='form-body-stepper'>
                        <div className='stepper-done'>
                            <FaPlusSquare size={30} color='white' />
                        </div>
                        <div className='line' />
                        <div
                            className={
                                step > 1 ? 'stepper-done' : 'stepper-notyet'
                            }
                        >
                            <FaUserAlt
                                size={30}
                                color={step > 1 ? 'white' : 'orange'}
                            />
                        </div>
                        <div className='line' />
                        <div
                            className={
                                step > 2 ? 'stepper-done' : 'stepper-notyet'
                            }
                        >
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
                                        : step === 3
                                        ? 'Waktu'
                                        : null}
                                </div>
                            </div>
                            {step === 1 ? (
                                <div className='card-body'>
                                    <div className='card-body-section'>
                                        <div className='form-ask'>
                                            <div className='form-ask-word'>
                                                Apakah anda pernah melakukan
                                                perjalanan luar negeri dalam 2
                                                minggu terakhir?
                                            </div>
                                            <div className='form-ask-option'>
                                                <div className='form-ask-option-check'>
                                                    {ask1 === 'ya' ? (
                                                        <MdRadioButtonChecked
                                                            size={30}
                                                            color='#8BA577'
                                                            onClick={() =>
                                                                setAsk1(null)
                                                            }
                                                            style={{
                                                                cursor:
                                                                    'pointer',
                                                            }}
                                                        />
                                                    ) : (
                                                        <MdRadioButtonUnchecked
                                                            size={30}
                                                            color='#C4C4C4'
                                                            onClick={() =>
                                                                setAsk1('ya')
                                                            }
                                                            style={{
                                                                cursor:
                                                                    'pointer',
                                                            }}
                                                        />
                                                    )}
                                                    Ya
                                                </div>
                                                <div className='form-ask-option-check'>
                                                    {ask1 === 'tidak' ? (
                                                        <MdRadioButtonChecked
                                                            size={30}
                                                            color='#8BA577'
                                                            onClick={() =>
                                                                setAsk1(null)
                                                            }
                                                            style={{
                                                                cursor:
                                                                    'pointer',
                                                            }}
                                                        />
                                                    ) : (
                                                        <MdRadioButtonUnchecked
                                                            size={30}
                                                            color='#C4C4C4'
                                                            onClick={() =>
                                                                setAsk1('tidak')
                                                            }
                                                            style={{
                                                                cursor:
                                                                    'pointer',
                                                            }}
                                                        />
                                                    )}
                                                    Tidak
                                                </div>
                                            </div>
                                        </div>
                                        <div className='form-ask'>
                                            <div className='form-ask-word'>
                                                Apakah anda pernah memiliki
                                                kontak langsung dengan orang
                                                yang terkonfirmasi COVID?
                                            </div>
                                            <div className='form-ask-option'>
                                                <div className='form-ask-option-check'>
                                                    {ask2 === 'ya' ? (
                                                        <MdRadioButtonChecked
                                                            size={30}
                                                            color='#8BA577'
                                                            onClick={() =>
                                                                setAsk2(null)
                                                            }
                                                            style={{
                                                                cursor:
                                                                    'pointer',
                                                            }}
                                                        />
                                                    ) : (
                                                        <MdRadioButtonUnchecked
                                                            size={30}
                                                            color='#C4C4C4'
                                                            onClick={() =>
                                                                setAsk2('ya')
                                                            }
                                                            style={{
                                                                cursor:
                                                                    'pointer',
                                                            }}
                                                        />
                                                    )}
                                                    Ya
                                                </div>
                                                <div className='form-ask-option-check'>
                                                    {ask2 === 'tidak' ? (
                                                        <MdRadioButtonChecked
                                                            size={30}
                                                            color='#8BA577'
                                                            onClick={() =>
                                                                setAsk2(null)
                                                            }
                                                            style={{
                                                                cursor:
                                                                    'pointer',
                                                            }}
                                                        />
                                                    ) : (
                                                        <MdRadioButtonUnchecked
                                                            size={30}
                                                            color='#C4C4C4'
                                                            onClick={() =>
                                                                setAsk2('tidak')
                                                            }
                                                            style={{
                                                                cursor:
                                                                    'pointer',
                                                            }}
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
                                                Apakah anda saat ini dalam
                                                keadaan batuk/pilek/nyeri
                                                tenggorokan?
                                            </div>
                                            <div className='form-ask-option'>
                                                <div className='form-ask-option-check'>
                                                    {ask3 === 'ya' ? (
                                                        <MdRadioButtonChecked
                                                            size={30}
                                                            color='#8BA577'
                                                            onClick={() =>
                                                                setAsk3(null)
                                                            }
                                                            style={{
                                                                cursor:
                                                                    'pointer',
                                                            }}
                                                        />
                                                    ) : (
                                                        <MdRadioButtonUnchecked
                                                            size={30}
                                                            color='#C4C4C4'
                                                            onClick={() =>
                                                                setAsk3('ya')
                                                            }
                                                            style={{
                                                                cursor:
                                                                    'pointer',
                                                            }}
                                                        />
                                                    )}
                                                    Ya
                                                </div>
                                                <div className='form-ask-option-check'>
                                                    {ask3 === 'tidak' ? (
                                                        <MdRadioButtonChecked
                                                            size={30}
                                                            color='#8BA577'
                                                            onClick={() =>
                                                                setAsk3(null)
                                                            }
                                                            style={{
                                                                cursor:
                                                                    'pointer',
                                                            }}
                                                        />
                                                    ) : (
                                                        <MdRadioButtonUnchecked
                                                            size={30}
                                                            color='#C4C4C4'
                                                            onClick={() =>
                                                                setAsk3('tidak')
                                                            }
                                                            style={{
                                                                cursor:
                                                                    'pointer',
                                                            }}
                                                        />
                                                    )}
                                                    Tidak
                                                </div>
                                            </div>
                                        </div>
                                        <div className='form-ask'>
                                            <div className='form-ask-word'>
                                                Apakah anda saat ini sesak napas
                                                ringan/berat?
                                            </div>
                                            <div className='form-ask-option'>
                                                <div className='form-ask-option-check'>
                                                    {ask4 === 'ya' ? (
                                                        <MdRadioButtonChecked
                                                            size={30}
                                                            color='#8BA577'
                                                            onClick={() =>
                                                                setAsk4(null)
                                                            }
                                                            style={{
                                                                cursor:
                                                                    'pointer',
                                                            }}
                                                        />
                                                    ) : (
                                                        <MdRadioButtonUnchecked
                                                            size={30}
                                                            color='#C4C4C4'
                                                            onClick={() =>
                                                                setAsk4('ya')
                                                            }
                                                            style={{
                                                                cursor:
                                                                    'pointer',
                                                            }}
                                                        />
                                                    )}
                                                    Ya
                                                </div>
                                                <div className='form-ask-option-check'>
                                                    {ask4 === 'tidak' ? (
                                                        <MdRadioButtonChecked
                                                            size={30}
                                                            color='#8BA577'
                                                            onClick={() =>
                                                                setAsk4(null)
                                                            }
                                                            style={{
                                                                cursor:
                                                                    'pointer',
                                                            }}
                                                        />
                                                    ) : (
                                                        <MdRadioButtonUnchecked
                                                            size={30}
                                                            color='#C4C4C4'
                                                            onClick={() =>
                                                                setAsk4('tidak')
                                                            }
                                                            style={{
                                                                cursor:
                                                                    'pointer',
                                                            }}
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
                                            <div style={{ maxWidth: 50 }}>
                                                {ask5 ? (
                                                    <MdCheckBox
                                                        size={40}
                                                        color='#8BA577'
                                                        style={{
                                                            marginRight: 10,
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() =>
                                                            setAsk5(!ask5)
                                                        }
                                                    />
                                                ) : (
                                                    <MdCheckBoxOutlineBlank
                                                        size={40}
                                                        color='#C4C4C4'
                                                        style={{
                                                            marginRight: 10,
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() =>
                                                            setAsk5(!ask5)
                                                        }
                                                    />
                                                )}
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flex: 1,
                                                    textAlign: 'left',
                                                }}
                                            >
                                                Saya menyatakan bahwa data yang
                                                diisi adalah benar dan sesuai
                                                dengan kenyataan sebenarnya
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
                                                    Nama Lengkap :{' '}
                                                    <span
                                                        style={{ color: 'red' }}
                                                    >
                                                        *
                                                    </span>{' '}
                                                    <span
                                                        style={{
                                                            color: 'red',
                                                            fontStyle: 'italic',
                                                        }}
                                                    >
                                                        {errorNamaLengkap
                                                            ? '(harus diisi)'
                                                            : null}{' '}
                                                    </span>
                                                </div>

                                                <input
                                                    className={
                                                        errorNamaLengkap
                                                            ? 'input-txt-error'
                                                            : 'input-txt'
                                                    }
                                                    type='text'
                                                    value={
                                                        dataDiri.nama_lengkap
                                                    }
                                                    onChange={(e) => {
                                                        if (
                                                            e.target.value
                                                                .length === 0
                                                        ) {
                                                            setDataDiri({
                                                                ...dataDiri,
                                                                nama_lengkap:
                                                                    '',
                                                            });
                                                            setErrorNamaLengkap(
                                                                true
                                                            );
                                                        } else {
                                                            setDataDiri({
                                                                ...dataDiri,
                                                                nama_lengkap:
                                                                    e.target
                                                                        .value,
                                                            });
                                                            setErrorNamaLengkap(
                                                                false
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className='form-input-section'>
                                                <div className='input-title'>
                                                    No. KTP / Passport :{' '}
                                                    <span
                                                        style={{ color: 'red' }}
                                                    >
                                                        *
                                                    </span>{' '}
                                                    <span
                                                        style={{
                                                            color: 'red',
                                                            fontStyle: 'italic',
                                                        }}
                                                    >
                                                        {errorNoKTP
                                                            ? '(harus diisi)'
                                                            : null}{' '}
                                                    </span>
                                                </div>

                                                <input
                                                    className={
                                                        errorNoKTP
                                                            ? 'input-txt-error'
                                                            : 'input-txt'
                                                    }
                                                    type='number'
                                                    value={dataDiri.no_ktp}
                                                    onChange={(e) => {
                                                        if (
                                                            e.target.value.toString()
                                                                .length === 0
                                                        ) {
                                                            setDataDiri({
                                                                ...dataDiri,
                                                                no_ktp: '',
                                                            });
                                                            setErrorNoKTP(true);
                                                        } else {
                                                            setDataDiri({
                                                                ...dataDiri,
                                                                no_ktp:
                                                                    e.target
                                                                        .value,
                                                            });
                                                            setErrorNoKTP(
                                                                false
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className='form-input-section'>
                                                <div className='input-title'>
                                                    Jenis Kelamin:{' '}
                                                    <span
                                                        style={{
                                                            color: 'red',
                                                            fontStyle: 'italic',
                                                        }}
                                                    >
                                                        {errorJK
                                                            ? '(harus dipilih)'
                                                            : null}{' '}
                                                    </span>{' '}
                                                </div>
                                                <div className='form-ask-option'>
                                                    <div className='form-ask-option-check'>
                                                        {dataDiri.jk ===
                                                        'laki-laki' ? (
                                                            <MdRadioButtonChecked
                                                                size={30}
                                                                color='#8BA577'
                                                                onClick={() => {
                                                                    setDataDiri(
                                                                        {
                                                                            ...dataDiri,
                                                                            jk: null,
                                                                        }
                                                                    );
                                                                    setErrorJK(
                                                                        true
                                                                    );
                                                                }}
                                                                style={{
                                                                    cursor:
                                                                        'pointer',
                                                                }}
                                                            />
                                                        ) : (
                                                            <MdRadioButtonUnchecked
                                                                size={30}
                                                                color='#C4C4C4'
                                                                onClick={() => {
                                                                    setDataDiri(
                                                                        {
                                                                            ...dataDiri,
                                                                            jk:
                                                                                'laki-laki',
                                                                        }
                                                                    );
                                                                    setErrorJK(
                                                                        false
                                                                    );
                                                                }}
                                                                style={{
                                                                    cursor:
                                                                        'pointer',
                                                                }}
                                                            />
                                                        )}
                                                        Laki-Laki
                                                    </div>
                                                    <div className='form-ask-option-check'>
                                                        {dataDiri.jk ===
                                                        'perempuan' ? (
                                                            <MdRadioButtonChecked
                                                                size={30}
                                                                color='#8BA577'
                                                                onClick={() => {
                                                                    setDataDiri(
                                                                        {
                                                                            ...dataDiri,
                                                                            jk: null,
                                                                        }
                                                                    );
                                                                    setErrorJK(
                                                                        true
                                                                    );
                                                                }}
                                                                style={{
                                                                    cursor:
                                                                        'pointer',
                                                                }}
                                                            />
                                                        ) : (
                                                            <MdRadioButtonUnchecked
                                                                size={30}
                                                                color='#C4C4C4'
                                                                onClick={() => {
                                                                    setDataDiri(
                                                                        {
                                                                            ...dataDiri,
                                                                            jk:
                                                                                'perempuan',
                                                                        }
                                                                    );
                                                                    setErrorJK(
                                                                        false
                                                                    );
                                                                }}
                                                                style={{
                                                                    cursor:
                                                                        'pointer',
                                                                }}
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
                                                    <span
                                                        style={{ color: 'red' }}
                                                    >
                                                        *
                                                    </span>{' '}
                                                    <span
                                                        style={{
                                                            color: 'red',
                                                            fontStyle: 'italic',
                                                        }}
                                                    >
                                                        {errorAlamat
                                                            ? '(harus diisi)'
                                                            : null}{' '}
                                                    </span>
                                                </div>

                                                <input
                                                    className={
                                                        errorAlamat
                                                            ? 'input-txt-error'
                                                            : 'input-txt'
                                                    }
                                                    type='text'
                                                    value={dataDiri.alamat}
                                                    onChange={(e) => {
                                                        if (
                                                            e.target.value
                                                                .length === 0
                                                        ) {
                                                            setDataDiri({
                                                                ...dataDiri,
                                                                alamat: '',
                                                            });
                                                            setErrorAlamat(
                                                                true
                                                            );
                                                        } else {
                                                            setDataDiri({
                                                                ...dataDiri,
                                                                alamat:
                                                                    e.target
                                                                        .value,
                                                            });
                                                            setErrorAlamat(
                                                                false
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className='form-input-section'>
                                                <div className='input-title'>
                                                    Email :{' '}
                                                    <span
                                                        style={{ color: 'red' }}
                                                    >
                                                        *
                                                    </span>{' '}
                                                    <span
                                                        style={{
                                                            color: 'red',
                                                            fontStyle: 'italic',
                                                        }}
                                                    >
                                                        {errorEmail
                                                            ? '(harus diisi)'
                                                            : errorValidEmail
                                                            ? '(format email salah)'
                                                            : null}{' '}
                                                    </span>
                                                </div>

                                                <input
                                                    className={
                                                        errorEmail
                                                            ? 'input-txt-error'
                                                            : 'input-txt'
                                                    }
                                                    type='email'
                                                    value={dataDiri.email}
                                                    onChange={(e) => {
                                                        if (
                                                            e.target.value
                                                                .length === 0
                                                        ) {
                                                            setDataDiri({
                                                                ...dataDiri,
                                                                email: '',
                                                            });
                                                            setErrorEmail(true);
                                                        } else {
                                                            setDataDiri({
                                                                ...dataDiri,
                                                                email:
                                                                    e.target
                                                                        .value,
                                                            });
                                                            setErrorEmail(
                                                                false
                                                            );
                                                            setErrorValidEmail(
                                                                false
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className='form-input-section'>
                                                <div className='input-title'>
                                                    No. Handphone :{' '}
                                                    <span
                                                        style={{ color: 'red' }}
                                                    >
                                                        *
                                                    </span>{' '}
                                                    <span
                                                        style={{
                                                            color: 'red',
                                                            fontStyle: 'italic',
                                                        }}
                                                    >
                                                        {errorNoHP
                                                            ? '(harus diisi)'
                                                            : null}{' '}
                                                    </span>
                                                </div>

                                                <input
                                                    className={
                                                        errorNoHP
                                                            ? 'input-txt-error'
                                                            : 'input-txt'
                                                    }
                                                    type='number'
                                                    value={dataDiri.no_hp}
                                                    onChange={(e) => {
                                                        if (
                                                            e.target.value.toString()
                                                                .length === 0
                                                        ) {
                                                            setDataDiri({
                                                                ...dataDiri,
                                                                no_hp: '',
                                                            });
                                                            setErrorNoHP(true);
                                                        } else {
                                                            setDataDiri({
                                                                ...dataDiri,
                                                                no_hp:
                                                                    e.target
                                                                        .value,
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
                                                    <span
                                                        style={{ color: 'red' }}
                                                    >
                                                        *
                                                    </span>{' '}
                                                    <span
                                                        style={{
                                                            color: 'red',
                                                            fontStyle: 'italic',
                                                        }}
                                                    >
                                                        {errorTgl
                                                            ? '(harus diisi)'
                                                            : null}{' '}
                                                    </span>
                                                </div>
                                                <div>
                                                    <input
                                                        className={
                                                            errorTgl
                                                                ? 'input-txt-error'
                                                                : 'input-txt'
                                                        }
                                                        onClick={() =>
                                                            setShowDate(
                                                                !showDate
                                                            )
                                                        }
                                                        value={
                                                            valueDate === null
                                                                ? ''
                                                                : moment(
                                                                      valueDate
                                                                  ).format(
                                                                      'DD MMM YYYY'
                                                                  )
                                                        }
                                                        contentEditable={false}
                                                        readOnly
                                                    />
                                                </div>
                                                {showDate ? (
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent:
                                                                'flex-end',
                                                            marginTop: 5,
                                                        }}
                                                    >
                                                        <Calendar
                                                            onChange={(
                                                                date
                                                            ) => {
                                                                onChangeDate(
                                                                    date
                                                                );
                                                                setShowDate(
                                                                    !showDate
                                                                );
                                                                checkSchedule(
                                                                    moment(
                                                                        date
                                                                    ).format(
                                                                        'YYYY-MM-DD'
                                                                    )
                                                                );
                                                                setErrorTgl(
                                                                    false
                                                                );
                                                                setDataDiri({
                                                                    ...dataDiri,
                                                                    tanggal: moment(
                                                                        date
                                                                    ).format(
                                                                        'YYYY-MM-DD'
                                                                    ),
                                                                });
                                                            }}
                                                            value={valueDate}
                                                            locale='id'
                                                            tileDisabled={({
                                                                activeStartDate,
                                                                date,
                                                                view,
                                                            }) =>
                                                                // date.getDay() ===
                                                                //     6 ||
                                                                // date.getDay() ===
                                                                //     0 ||
                                                                date <
                                                                new Date()
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
                                                    <span
                                                        style={{ color: 'red' }}
                                                    >
                                                        *
                                                    </span>{' '}
                                                    <span
                                                        style={{
                                                            color: 'red',
                                                            fontStyle: 'italic',
                                                        }}
                                                    >
                                                        {errorWaktu
                                                            ? '(harus diisi)'
                                                            : null}{' '}
                                                    </span>
                                                </div>
                                                <div>
                                                    <input
                                                        className={
                                                            errorWaktu
                                                                ? 'input-txt-error'
                                                                : 'input-txt'
                                                        }
                                                        readOnly
                                                        aria-controls='simple-menu'
                                                        aria-haspopup='true'
                                                        value={
                                                            selectedJam === null
                                                                ? ''
                                                                : selectedJam.time +
                                                                  ' WIB'
                                                        }
                                                        onClick={() => {
                                                            if (
                                                                valueDate !==
                                                                null
                                                            ) {
                                                                setShowListAvailable(
                                                                    !showListAvailable
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                {showListAvailable &&
                                                arrAvailabelTime.length > 0 ? (
                                                    <div className='wrapper-avtime'>
                                                        Pilih Jam Pelayanan
                                                        {arrAvailabelTime.map(
                                                            (val) => {
                                                                return (
                                                                    <div
                                                                        className='item-list-avtime'
                                                                        key={
                                                                            val.id
                                                                        }
                                                                        onClick={() => {
                                                                            onSelectedJam(
                                                                                val
                                                                            );
                                                                            setErrorWaktu(
                                                                                false
                                                                            );
                                                                            setDataDiri(
                                                                                {
                                                                                    ...dataDiri,
                                                                                    waktu:
                                                                                        val.id,
                                                                                }
                                                                            );
                                                                        }}
                                                                    >
                                                                        {
                                                                            val.time
                                                                        }{' '}
                                                                        WIB
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                ) : null}
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
                                            src={
                                                require('../../assets/ic_check.png')
                                                    .default
                                            }
                                            alt='check.png'
                                            className='ic-check'
                                        />
                                        <div className='txt-book-done'>
                                            Pemesanan Berhasil
                                        </div>
                                        <div className='txt-check-email'>
                                            Silahkan cek Email Anda untuk
                                            melihat data pemesanan.
                                        </div>
                                        <div className='txt-countdown-resend'>
                                            <span
                                                onClick={onGenerate}
                                                style={{
                                                    cursor: 'pointer',
                                                    color: 'red',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                klik disini
                                            </span>{' '}
                                            jika tidak ada pesan masuk (
                                            {countdownEmail})
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
                                            onClick={onBookingPress}
                                            // onClick={() => setStep(4)}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Buttons
                                            className='button-2'
                                            text='Selesai'
                                            // onClick={() => setStep(3)}
                                            onClick={() => history.goBack()}
                                        />
                                        <Buttons
                                            className='button-3'
                                            text={
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <BsDownload
                                                        size={20}
                                                        style={{
                                                            marginRight: 10,
                                                        }}
                                                    />{' '}
                                                    Download
                                                </div>
                                            }
                                            onClick={onDownloadFile}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modals
                open={modalStep1}
                onClose={handleCloseModalStep1}
                disableBackdropClick
                children={
                    <Fade in={modalStep1}>
                        <div className={classes.paper}>
                            <div
                                style={{
                                    fontSize: 24,
                                    fontWeight: 700,
                                    textAlign: 'center',
                                }}
                            >
                                Maaf, Permohonan Anda Ditolak
                            </div>
                            <div
                                style={{
                                    fontSize: 18,
                                    textAlign: 'center',
                                    margin: 30,
                                }}
                            >
                                Permohonan Pengajuan Nomor Antrian Anda terpaksa
                                kami tolak karena Anda belum memenuhi syarat
                                Penilaian Kesehatan kami. Mohon Ajukan kembali
                                lain waktu.
                            </div>
                            <div>
                                <Buttons
                                    className='button-2'
                                    text='OK'
                                    onClick={() => history.goBack()}
                                />
                            </div>
                        </div>
                    </Fade>
                }
            />

            <Modals
                open={modalCancelConfirm}
                onClose={handleCloseModalCancelConfirm}
                disableBackdropClick
                children={
                    <Fade in={modalCancelConfirm}>
                        <div className={classes.paper}>
                            <div
                                style={{
                                    fontSize: 24,
                                    fontWeight: 700,
                                    textAlign: 'center',
                                }}
                            >
                                Konfirmasi Pembatalan
                            </div>
                            <div
                                style={{
                                    fontSize: 18,
                                    textAlign: 'center',
                                    margin: 30,
                                }}
                            >
                                Apakah Anda yakin untuk membatalkan proses
                                penginputan ? Anda harus memasukkan data Anda
                                kembali apabila membatalkan proses ini.
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
                }
            />

            <Modals
                open={errorModalAsk}
                onClose={handleCloseErrorModalAsk}
                disableBackdropClick
                children={
                    <div className={classes.simpleDialog}>
                        <VscIssueClosed size={50} color='red' />
                        <div style={{ fontSize: 18, margin: 20 }}>
                            Mohon Check List pada Form yang tersedia
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <Buttons
                                className='button-2'
                                text='OK'
                                onClick={() => setErrorModalAsk(false)}
                            />
                        </div>
                    </div>
                }
            />

            <Modals
                open={isLoading}
                onClose={handleCloseLoading}
                disableBackdropClick={false}
                children={
                    <div className={classes.simpleDialog}>
                        <CircularProgress color='secondary' />
                        <div style={{ fontSize: 18, marginTop: 20 }}>
                            Memeriksa Ketersediaan Jadwal
                        </div>
                    </div>
                }
            />

            <Modals
                open={isAvailable}
                onClose={() => setIsAvailable(false)}
                disableBackdropClick
                children={
                    <div className={classes.simpleDialog}>
                        <VscIssueClosed
                            size={50}
                            color='red'
                            style={{ marginBottom: 20 }}
                        />
                        <div
                            style={{
                                fontSize: 18,
                                marginTop: 20,
                            }}
                        >
                            Tidak Tersedia Jadwal Hari ini. Silahkan Pilih
                            Tanggal Lain
                        </div>
                        <div>
                            <Buttons
                                className='button-2'
                                text='OK'
                                onClick={() => setIsAvailable(false)}
                            />
                        </div>
                    </div>
                }
            />

            <Modals
                open={isLoadingBooking}
                onClose={() => setIsLoadingBooking(false)}
                disableBackdropClick={false}
                children={
                    <div className={classes.simpleDialog}>
                        <CircularProgress color='secondary' />
                        <div style={{ fontSize: 18, marginTop: 20 }}>
                            Proses Booking
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default Form;
