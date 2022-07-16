import axios from "axios"
import moment from "moment"
import { FormType } from "pages/Shift/dtos/form-shift.dto"

export const getList = (page: string, per_page: string) => {
    const base_url = process.env.REACT_APP_API_URL
    const query = {
        date: moment().format("yyyy-MM-DD"),
        page: page || "",
        per_page: per_page || "",
    }
    const queryStr = new URLSearchParams(query).toString()
    return axios.get(`${base_url}/shift?${queryStr}`)
}

export const create = (data: FormType) => {
    const base_url = process.env.REACT_APP_API_URL
    return axios.post(`${base_url}/shift`, data)
}

export const publishShift = (id: number) => {
    const base_url = process.env.REACT_APP_API_URL
    return axios.patch(`${base_url}/shift/publish/${id}`)
}

export const deleteShift = (id: number) => {
    const base_url = process.env.REACT_APP_API_URL
    return axios.delete(`${base_url}/shift/${id}`)
}
