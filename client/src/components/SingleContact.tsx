import React,{ useContext } from 'react'
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { BASE_URL } from '../config';
import { ContactContext } from '../context';

type Props = {
    name:string,
    number:string,
    contactId:string,
    index:string,
}

const SingleContact = ({name,number,contactId,index}: Props) => {

    const { contacts,setContacts } = useContext(ContactContext)
    const filter = contacts && contacts.filter((item:any) => item._id !== contactId)
    console.log(filter)
    const handleDelete = async(e:any) =>{
        try{
            const res = await fetch(`${BASE_URL}/contact/delete`,{
                method:"DELETE",
                mode:"cors",
                body: JSON.stringify({contactId}),
                headers:{
                    "Content-Type":"application/json"
                }

            })
            const data = await res.json()
                if (res.ok) {
                toast.success(data.message);
                console.log(data.data)
                setContacts([...filter,data.data])
            } else {
                toast.error(data.data);
            }
            }
            catch(error){
                return console.log(error)
            }
    }
  return (
        <tr className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap px-6 py-4 font-medium">{index}</td>
            <td className="whitespace-nowrap px-6 py-4">{name}</td>
            <td className="whitespace-nowrap px-6 py-4">{number}</td>
            <td className="whitespace-nowrap ">
            <span onClick={handleDelete} title={`Delete ${name}`} className="cursor-pointer z-10 bg-gray-150 font-medium text-gray-600 bg-gray-100 hover:bg-gray-200">
                <FaTrash/>
            </span>
            </td>
        </tr>
  )
}

export default SingleContact