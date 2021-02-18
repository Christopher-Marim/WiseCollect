import axios from 'axios'
      const api = axios.create({
        baseURL:'https://proton.etm.ltda',
        headers:{Authorization:'Basic 1332a3be38efc622d2b7529d9f44a1fbae8236cc9f1f0f865af71c08155a'}
    })
export default api;
