import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import { HiPencil } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import swal from 'sweetalert';

const Show = () => {
    /* Configuracion de los Hooks */
    const [products, setProducts] = useState( [] );

    /* Referecnciamos a la DB firestore */
    const productsCollection = collection(db, "products")

    /* Funcion para mostrar todos los docs */
    const getProducts = async () =>{
        const data = await getDocs(productsCollection)
        /* console.log(data.docs) */
        setProducts(
            data.docs.map((doc) => ({...doc.data(), id:doc.id}))
        )        
    }


    /* Funcion para eliminar  */
        const deleteProduct = async (id) =>{
           const productDoc  = doc(db, "products", id)
           await deleteDoc(productDoc)
           getProducts()
        }    

    /* Funcion de confirmacion para sweet alert */
    const confirmDelete = (id) =>{
        swal({
            title: "Remove the product?",
            text: "You won't be able to revert this!",
            icon: "warning",
            buttons: true,         
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                deleteProduct(id)
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
            }
          });
    }
    /* Usamos useEffect */
        useEffect( () =>{
            getProducts()
            /* eslint-disable-next-line */
        },[])

    /* Devolvemos vista de nuestro componente */

  return (
    <>
        <div className='bg-slate-100 h-screen flex flex-col items-center p-5'>
            <div className='w-full flex mb-3'>
                <Link
                    to='/create'
                    className='p-2 my-2 text-center text-white bg-green-500 hover:bg-green-600 w-full rounded-md'
                >
                    Create
                </Link>
            </div>
            <div className='w-full'>
                <table className='bg-gray-200 shadow-md w-full rounded-lg'>
                    <thead className='w-full block bg-gray-300 mb-1 rounded-sm'>
                        <tr className='flex justify-around p-2'>
                            <th className='w-1/3'>Description</th>
                            <th className='w-1/3'>Stock</th>
                            <th className='w-1/3'>Actions</th>                            
                        </tr>
                    </thead>

                    <tbody className='bg-gray-300 block rounded-md'>
                        {products.map((product) =>(                            
                                <tr key={product.id} className='flex justify-around p-2 border-t border-gray-200'>                                    
                                    <td className='w-1/3 text-center font-medium'>{product.description}</td>
                                    <td className='w-1/3 text-center font-medium'>{product.stock}</td>
                                    <td className='w-1/3 flex justify-center items-center gap-3'>
                                        <Link 
                                            to={`/edit/${product.id}`}
                                            className='flex items-center px-1 text-black'
                                        >
                                            <HiPencil/>                                 
                                        </Link>
                                        <button 
                                            onClick={() => confirmDelete(product.id)}
                                            className=' p-1 text-red-500'
                                        >
                                            <MdDelete/>
                                        </button>
                                    </td>
                                </tr>                            
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default Show