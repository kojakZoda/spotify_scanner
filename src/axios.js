import axios from 'axios';
// Next we make an 'instance' of it
const Axios = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: { 'Authorization': 'foobar' }
});
console.log(this.props)


export default Axios;