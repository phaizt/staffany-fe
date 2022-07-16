import axios from "axios"
import moment from "moment"
import { FormType } from "pages/Shift/dtos/form-shift.dto"

export const getList = (date: Date, page: string, per_page: string) => {
    const base_url = process.env.REACT_APP_API_URL
    const query = {
        date: moment(date).format("yyyy-MM-DD"),
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

export const update = (id: number, data: FormType) => {
    const base_url = process.env.REACT_APP_API_URL
    return axios.put(`${base_url}/shift/${id}`, data)
}

export const publishShift = (id: number) => {
    const base_url = process.env.REACT_APP_API_URL
    return axios.patch(`${base_url}/shift/publish/${id}`)
}

export const publishWeekShift = (date: string) => {
    const base_url = process.env.REACT_APP_API_URL
    return axios.patch(`${base_url}/shift/publish?date=${date}`)
}

export const deleteShift = (id: number) => {
    const base_url = process.env.REACT_APP_API_URL
    return axios.delete(`${base_url}/shift/${id}`)
}
