import axios from 'axios';

export const CheckAvailableDateHandler = async (date, id) => {
	try {
		const response = await axios.get(
			`${process.env.REACT_APP_ROOT_API}/cekAntrian`,
			{
				params: {
					tanggalKedatangan: date,
					idPelayanan: id,
				},
			}
		);
		console.log('res get schedule', response);
		return Promise.resolve(response.data);
	} catch (error) {
		console.log('err get schedule', error.request);
		return Promise.reject(error);
	}
};
