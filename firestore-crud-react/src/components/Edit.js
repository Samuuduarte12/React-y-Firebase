import React,{useState,useEffect} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { getDoc, updateDoc, doc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Edit = () => {
  const [description, setDescription] = useState('')
  const [stock, setStock] = useState (0)

  const navigate = useNavigate()
  const {id} = useParams()

  const update = async (e) => {
    e.preventDefault()
    const product = doc(db, "products", id)
    const data = {description:description, stock: stock}
    await updateDoc(product, data)
    navigate('/')
  }  

  
  
  const getProductById = async (id) => {
    const product = await getDoc( doc(db, "products", id) )
    
    if(product.exists()) {
      setDescription(product.data().description)
      setStock(product.data().stock)    
    }else{
      console.log('el producto no existe')
    }
  }

  useEffect( () => {
    getProductById(id)
    /* eslint-disable-next-line */
  }, [])

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-slate-100 p-5'>
        <div>
          <h1 className='text-xl font-medium mb-5'> Edit Product</h1>
        </div>
        <form onSubmit={update} className='bg-white shadow-md rounded-lg p-4 w-full'>
          <div className='flex flex-col items-center mb-3'>
            <label className='mb-3 text-lg'>Description</label>
            <input
              value={description}
              onChange={ (e)=> setDescription(e.target.value)}
              type='text'
              className='w-full border border-gray-300 rounded-md p-1'
            />
          </div>

          <div className='flex flex-col items-center mb-5'>
            <label className='mb-3 text-lg'>Stock</label>
            <input
              value={stock}
              onChange={ (e)=> setStock(e.target.value)}
              type='number'
              className='w-full border border-gray-300 rounded-md p-1'
            />
          </div>

          <button 
            type='submit' 
            className='bg-green-500 hover:bg-green-600 p-1 w-full rounded-lg text-white'
          >
            Update
          </button>
        </form>
      </div>
  )
}

export default Edit