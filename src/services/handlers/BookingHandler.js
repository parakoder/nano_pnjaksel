import axios from 'axios';

export const BookingHandler = async (dataDiri, idPelayanan) => {
    console.log('data handler', dataDiri);
    console.log('id pel handler', idPelayanan);
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_ROOT_API}/createAntrian`,
            {
                // data: {
                namaLengkap: dataDiri.nama_lengkap,
                noIdentitas: dataDiri.no_ktp,
                jenisKelamin: dataDiri.jk,
                alamat: dataDiri.alamat,
                email: dataDiri.email,
                noHp: dataDiri.no_hp,
                tanggalKedatangan: dataDiri.tanggal,
                jamKedatangan: dataDiri.waktu,
                idPelayanan: idPelayanan,
                // },
            }
        );
        console.log('res post antrian', response);
        return Promise.resolve(response.data);
    } catch (error) {
        console.log('err post antrian', error.request);
        return Promise.reject(error);
    }
};
