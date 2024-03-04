import React,{ useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Create = () => {

  const [description, setDescription] = useState('')
  const [stock, setStock] = useState (0)
  const navigate  = useNavigate()

  const productsCollection = collection(db, "products")

  const store = async (e) =>{
    e.preventDefault()
    await addDoc(productsCollection,{description: description, stock: stock} )
    navigate("/")
  }
  return (
    <>  
      <div className='flex flex-col justify-center items-center h-screen bg-slate-100 p-5'>
        <div>
          <h1 className='text-xl font-medium mb-5'> Create Product</h1>
        </div>
        <form onSubmit={store} className='bg-white shadow-md rounded-lg p-4 w-full'>
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

          <button type='submit' className='bg-green-500 hover:bg-green-600 p-1 w-full rounded-lg text-white'>Store</button>
        </form>
      </div>        
    </>
  )
}

export default Create