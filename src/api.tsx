// import axios from 'axios'

// export const api = axios.create({
//     baseURL: 'https://real-ruby-stingray-robe.cyclic.app',
//     timeout: 2000,
//     headers: { Authorization : `Bearer ${localStorage.getItem('access_token')}`}
// })


export const Pinger = (baseURL: string) => {

    return {

        post: async (url: string, data?: {}, headers?: {}) => {
            try {

                let res: any = await fetch(`${baseURL}/${url}`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { ...headers }
                })
                console.log(res);
                
                return res
            } catch (error) {
                return error
            }
        },
        get: async (url: string, headers?: {}) => {
            let res: any = await fetch(`${baseURL}/${url}`, {
                method: 'GET',
                // mode: 'no-cors',
                headers: { ...headers }
            })
            res = await res.json()
            return res;
        },

    }
}

const api = Pinger('https://real-ruby-stingray-robe.cyclic.app');
export default api



