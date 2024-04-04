import { notifyError, notifySuccess } from "../Toaster/Toaster"
import { userData } from "../../types"
import { useState, useEffect } from "react";
import { axiosWithToken } from "../../utils/axiosInstances"
import { modalState } from "../../app/store"
import { useRecoilState } from "recoil"
import Button from 'react-bootstrap/Button'
const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL

interface DeleteCategoryProps {
    category: string;
    getCategory: () => void;
}

const DeleteCategory: React.FC<DeleteCategoryProps> = ({ category, getCategory }) => {

    const [show, setShow] = useRecoilState(modalState)

    const handleDelete = async () => {
        try {
            const res = await axiosWithToken.delete(`${SERVER_URL}/api/v1/category/delete?name=${category}`)
            if(res.data) {
                notifySuccess(res.data)
                getCategory()
                setShow(false)
            }
        } catch (error:any) {
            console.log(error.message);
            
            if(error.response) notifyError(error.response.data)
            else notifyError(error.message)
        }
    }

    const handleCancel = () => {
        setShow(false)
    }

    return (
        <div className="d-flex flex-column align-items-center">
            <span>¿Esta seguro que quiere eliminar la categoría "{category}"?</span>
            <div className="mt-3 ">
                <Button className="m-3" variant="danger" onClick={handleDelete}>Si</Button>
                <Button className="m-3" variant="primary" onClick={handleCancel}>No</Button>
            </div>
        </div>
    )
}

export default DeleteCategory