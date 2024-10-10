import React, {useState, useEffect} from 'react';
import { deleteProyek, getAllProyek, postProyek, updateProyek } from '../services/Api';
import { Modals } from '../components/editModal';

// Komponen Tabel Proyek
function ProjectTable() {
    const [modalOpen, setModalOpen] = useState(false);
    const openModals = () => setModalOpen(true);
    const closeModals = () => setModalOpen(false);

    const [allProyek, setAllProyek] = useState()
    
    useEffect(() => {
        getAllProyek(allProyek)
        .then((res) => {
            setAllProyek(res.data)
        })
    }, [])
    console.log(allProyek);

    const [post, setPost] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
    })

    const submit = (e) => {
        e.preventDefault();
        if (!post.name || !post.description || !post.start_date || !post.end_date){
            alert('Isi form data dengan lengkap')
            return;
        }

        postProyek(post)
        .then(res => {
            console.log(res);
            if(post){
                alert('Proyek successfully created, please refresh the page!')
            }
            return res.data;
        })
        .catch(error => {
            console.error('Error :', error)
            alert('An error occurred while creating Table. Please try again later.')
        })
    }

    const handle = (e) => {
        const newPost = {...post}
        newPost[e.target.id]=e.target.value
        setPost(newPost)
    }

    const [put, setPut] = useState({
        id: '', // Add ID field to match API endpoint
        name: '',
        description: '',
        start_date: '',
        end_date: '',
    });

    const getDataId = () => {
        updateProyek(put, put.id)
        .then(res => {
            console.log(res);
            if(put){
                alert('Proyek successfully edited! Please refresh the page')
            }
            closeModals(); // Close the modal after successful PUT request
        })
        .catch(error => console.error('Error:', error));
    };

    function handleData(e) {
        const newPut = { ...put };
        newPut[e.target.id] = e.target.value;
        setPut(newPut);
    }

    const deletedProyek = async (id) => {
        try{
            await deleteProyek(id)
            const updatedPost = allProyek.filter(post => post.id !== id);
            if(updatedPost){
                alert('Customer successfully deleted!')
            }
            setAllProyek(updatedPost)
        }catch (error){
            console.error('error deleting post: ', error)
        }
    }
  return (
    <div className="container mx-auto p-6 flex gap-3 flex-col">
      <h2 className="text-3xl font-extrabold mb-4">PROJECT LIST</h2>
      <form onSubmit={(e) => {submit(e)}} className='flex gap-3 justify-end items-center'>
        <input onChange = {(e) => handle(e)} id='name' value={post.name} type="text" placeholder='Project Name' className='outline outline-green-500 rounded p-2'/>

        <input onChange = {(e) => handle(e)} id='description' value={post.description} type="text" placeholder='Description' className='outline outline-green-500 rounded p-2'/>

        <input onChange = {(e) => handle(e)} id='start_date' value={post.start_date} type="text" placeholder='Start Date' className='outline outline-green-500 rounded p-2'/>

        <input onChange = {(e) => handle(e)} id='end_date' value={post.end_date} type="text" placeholder='End Date' className='outline outline-green-500 rounded p-2'/>
        
        <button className='rounded font-semibold text-white p-2 px-3 bg-red-500'>Submit</button>
      </form>
      <table className="min-w-full bg-white border border-gray-300 shadow-md">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">id</th>
            <th className="py-3 px-6 text-left">Project Name</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">Start Date</th>
            <th className="py-3 px-6 text-left">End Date</th>
            <th className="py-3 px-6 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {allProyek?.map((items, key) => (
            <tr key={key} className="border-b border-gray-200">            
              <td className="py-3 px-6 text-left font-medium">{items.id}</td>
              <td className="py-3 px-6 text-left font-medium">{items.name}</td>
              <td className="py-3 px-6 text-left">{items.description}</td>
              <td className="py-3 px-6 text-left">{items.start_date}</td>
              <td className="py-3 px-6 text-left">{items.end_date}</td>
              <td className="py-3 px-6 text-left flex gap-2">
                <button  onClick={openModals} className='bg-green-500 p-2 px-3 rounded text-white font-semibold'>Edit</button>
                <form onSubmit={(e) => { e.preventDefault(); getDataId(); }}>        
                    <Modals
                        isBuka={modalOpen} 
                        onTutup={closeModals} 
                        judul="Edit Customer"
                    >
                        <div className='flex flex-col gap-y-3'>
                            <input onChange = {(e) => handleData(e)} id='id' value={put.id} type="text" placeholder='Enter Id...' className='w-full outline outline-2 flex rounded-md outline-green-600 p-2'/>

                            <input onChange = {(e) => handleData(e)} id='name' value={put.name} type="text" placeholder='Name Proyek...' className='w-full outline outline-2 flex rounded-md outline-green-600 p-2'/>

                            <input onChange = {(e) => handleData(e)} id='description' value={put.description} type="text" placeholder='Description...' className='w-full outline outline-2 flex rounded-md outline-green-600 p-2'/>
                            
                            <input onChange = {(e) => handleData(e)} id='start_date' value={put.start_date} type="text" placeholder='Start Date...' className='w-full outline outline-2 flex rounded-md outline-green-600 p-2'/>

                            <input onChange = {(e) => handleData(e)} id='end_date' value={put.end_date} type="text" placeholder='End Date...' className='w-full outline outline-2 flex rounded-md outline-green-600 p-2'/>
                        </div>
                    </Modals>
                </form>
                <button className='bg-red-500 p-2 px-3 rounded text-white font-semibold' onClick={() => {deletedProyek(items.id)}} variant="bg-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectTable;
