import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {SignupInput} from "@devshubhankar/medium-common3";
import axios from "axios";
import { BACKEND_URL } from "../config";
export default function Auth({type}:{type:"signup"|"signin"}) {
    const navigate=useNavigate();
    const [postInputs,setPostInputs]=useState<SignupInput>({
        
        email:"",
        password:""
    })
    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch(e) {
            alert("Error while signing up")

        }
    }
  return (

    <div className=" h-screen flex flex-col justify-center ">
        <div className=" flex justify-center">
        <div className="">
        <div className=" px-10 ">
        <div className=" font-bold text-3xl">{type==='signup'?"Create an account":"Login to your account"} 
        </div>
        <div className="text-gray-400 ">{type==="signup"?"Already have an account?":"Donot have an account?"}<Link className=" pl-2 underline" to={type==="signup" ?'/signin':'/signup'}>{type==='signup'?"Login":"Create Account"}</Link>
        </div>
        </div>
        <div className="pt-8 ">
       {type==="signup"?<LabelledInput label="Name" placeholder="Enter Your Name"  onChange={(e)=>{
            setPostInputs(c=> ({
                ...c,
                name:e.target.value
            }))}} />:null} 
          <LabelledInput label="UserName" placeholder="Enter Your username"  onChange={(e)=>{
            setPostInputs(c=> ({
                ...c,
                email:e.target.value
            }))}} />
          <LabelledInput label="Password" placeholder="Enter Your password" type="password" onChange={(e)=>{
            setPostInputs(c=> ({
                ...c,
                password:e.target.value
            }))}} />
        </div>
        <button  onClick={sendRequest} type="button" className=" mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup"?"Signup up":"Signin"}</button>

        </div>
        </div>
   
  
    </div>
  )
}
interface LabelledInputType{
    label:string;
    placeholder:string;
    onChange: (e: ChangeEvent<HTMLInputElement>)=>void;
    type?:string
}
function LabelledInput({label,placeholder,onChange,type}:LabelledInputType){
return <div>
<div>
            <label  className="block mb-2 text-sm font-medium text-black-900 ">{label}</label>
            <input onChange={onChange} type={type||"text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
</div>

}