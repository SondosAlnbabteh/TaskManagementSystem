import axios from "axios";
import {createContext, useState } from "react";
export const UserContext = createContext();

function AddTasks(){
   const [name, setName] = useState('');
   const [date, setDate] = useState('');
   const [description, setDescription] = useState('');


   const handleAddTask = async (e)=>{

    e.preventDefault();
    try{
        await axios.post('http://localhost:5000/api/users/task', {  name, date, description});
        alert('Added task successfull');
    }catch(error){
        alert('Added task failed!!!');
    }


   }

    return(
        <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tightmlFortracking-tightmlFortext-gray-900 md:text-2xl dark:text-white">
                       Add Task
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleAddTask}>
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >task name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                        </div>
                        <div>
                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >task date</label>
                            <input value={date} onChange={(e) => setDate(e.target.value)} type="date" name="date" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="date" required=""/>
                        </div>
                        <div>
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">description</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description" id="description" placeholder="description...." className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                        </div>
                 
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-black">Add Task</button>
                        
                      
                    </form>
                </div>
            </div>
        </div>
</section>

    );
}
export default AddTasks;