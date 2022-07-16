import axios from "axios"

const ShiftRequest = () => {
    const base_url = process.env.REACT_APP_API_URL
    return axios.get(`${base_url}/shift`)
}

export default ShiftRequest
