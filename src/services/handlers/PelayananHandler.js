import axios from 'axios';

export const GetAllPelayanan = async () => {
	try {
		const response = await axios.get(
			`${process.env.REACT_APP_ROOT_API}/pelayanan`
		);
		console.log('res pelayanan', response);
		return Promise.resolve(response.data);
	} catch (error) {
		console.log('err pelayanan', error.request);
		return Promise.reject(error);
	}
};
