import axios from 'axios';

export const BookingHandler = async (data, idPelayanan) => {
	console.log('data handler', data);
	console.log('id pel handler', idPelayanan);
	try {
		const response = await axios.post(
			`${process.env.REACT_APP_ROOT_API}/createAntrian`,
			{
				namaLengkap: data.nama_lengkap,
				noIdentitas: data.no_ktp,
				jenisKelamin: data.jk,
				alamat: data.alamat,
				email: data.email,
				noHp: data.no_hp,
				jamKedatangan: 1,
				idPelayanan: idPelayanan,
			}
		);
		console.log('res get schedule', response);
		return Promise.resolve(response.data);
	} catch (error) {
		console.log('err get schedule', error.request);
		return Promise.reject(error);
	}
};
