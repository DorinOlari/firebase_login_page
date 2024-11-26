import {signInWithEmailAndPassword} from 'firebase/auth'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {auth} from "../../firebase";


const SignIn = () => {

    const [data, setData] = useState({emailInput:'', passwordInput:''})

    const [error, setError] = useState('')

    const [info, setInfo] = useState(false)


    const logIn = (ev) => {
        ev.preventDefault()

        signInWithEmailAndPassword(auth, data.emailInput, data.passwordInput)
            .then((user)=> {
                console.log(user)
                localStorage.setItem('Token', JSON.stringify(user))
                if (user.user.stsTokenManager.accessToken){
                    setInfo(true)
                }

                //setInfo(true)

                setError('')
                setData({emailInput: '', passwordInput: ''})
            })

            .catch((error) =>{
                console.log(error)
                setError('SORRY COULDN\'T FOUND YOUR ACCOUNT')
            })

    }


    const navigate = useNavigate()

    useEffect(() => {
        if (info){
            navigate('/profile')
        }
        else {
            navigate('/login')
        }
    }, [info, navigate]);


    return (
        <div className="flex justify-center items-center h-screen bg-indigo-600">
            <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                <h1 className="text-3xl bloc text-center font-bold mt-11">Login</h1>
                <hr className="mt-9"/>
                <div className="mt-7">
                    <input type="text" id="email"
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
                    <button type="button" onClick={logIn}
                            className="border-2 border-indigo-700 bg-indigo-700 text-white py-2.5 w-full rounded-xl hover:bg-indigo-600">Login
                    </button>
                </div>

                {
                    error ? <p style={{color: 'red'}}>{error}</p> : ''
                }

                <p className="font-semibold text-gray-600 text-center mt-11">Forgot <a href="https://www.rabota.md/ro/"
                                                                                       className="text-blue-600 font-semibold">Password</a>?
                </p>
                <p className="font-semibold text-gray-600 text-center mt-2 mb-7">Don't have an account? <a
                    href="https://999.md/ro/" className="text-blue-600 font-semibold">Sign up</a></p>
            </div>
        </div>
    )
}

export default SignIn;