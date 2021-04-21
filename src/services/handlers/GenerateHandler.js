import axios from 'axios';

export const GenerateEmail = async () => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_ROOT_API_DOWNLOAD}/generate`
        );
        console.log('res generate', response);
        return Promise.resolve(response.data);
    } catch (error) {
        console.log('err generate', error.request);
        return Promise.reject(error);
    }
};
