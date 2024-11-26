import {createUserWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {auth} from "../../firebase";


const SignUp = () => {

    const [data, setData] = useState({emailInput:'', passwordInput:'', verifyPasswordInput:''})

    const [error, setError] = useState('')

    const [info, setInfo] = useState(false)

    const register = (ev) => {
        ev.preventDefault()
       if (data.verifyPasswordInput !== data.passwordInput){
           setError('Password didn\'t match')
           return
       }

       createUserWithEmailAndPassword(auth, data.emailInput, data.passwordInput).then((user) =>{
           console.log(user)
           if (user){
               setInfo(true)
           }
           setError('')
           setData({emailInput: '', passwordInput: '', verifyPasswordInput: ''})
       })

           .catch((error)=>{
               console.log(error)
           })

    }


    const navigate = useNavigate()

    useEffect(() => {
        if (info){
            navigate('/login')
        }
        else {
            navigate('/')
        }
    }, [info, navigate]);


    return (
        <div className="flex justify-center items-center h-screen bg-indigo-600">
            <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                <h1 className="text-3xl bloc text-center font-bold mt-11">Register</h1>
                <hr className="mt-9"/>
                <div className="mt-7">
                    <input type="email" id="email"
                           value={data.emailInput}
                           onChange={(event) => setData({...data, emailInput: event.target.value})}
                           className="w-full text-base px-2 py-1 outline-none border-b-2 border-gray-600"
                           placeholder="Email"/>
                </div>
                <div className="mt-8">
                    <input type="password" id="password"
                           value={data.passwordInput}
                           onChange={(event) => setData({...data, passwordInput: event.target.value})}
                           className="w-full text-base px-2 py-1 outline-none border-b-2 border-gray-600"
                           placeholder="Password"/>
                </div>
                <div className="mt-9">
                    <input type="password"
                           value={data.verifyPasswordInput}
                           onChange={(event) => setData({...data, verifyPasswordInput: event.target.value})}
                           className="w-full text-base px-2 py-1 outline-none border-b-2 border-gray-600"
                           placeholder="Confirm Password"/>
                </div>
                <div className="mt-10">
                    <button type="button" onClick={register}
                            className="border-2 border-indigo-700 bg-indigo-700 text-white py-2.5 w-full rounded-xl hover:bg-indigo-600">Register
                    </button>
                </div>
                {
                    error ? <p style={{color: 'red'}}>{error}</p> : ''
                }
            </div>
        </div>
    )
}
export default SignUp;