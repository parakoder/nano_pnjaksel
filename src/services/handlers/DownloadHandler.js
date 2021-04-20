import axios from 'axios';

export const DownloadHandler = async (id) => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_ROOT_API}/download`,
            {
                params: { id: id },
                headers: {
                    Accept: 'application/pdf',
                },
                responseType: 'arraybuffer',
            }
        );
        console.log('res download', response);
        return Promise.resolve(response.data);
    } catch (error) {
        console.log('err download', error.request);
        return Promise.reject(error);
    }
};
