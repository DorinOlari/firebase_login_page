import { getDatabase, ref, set, push, get } from "firebase/database";
import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import {app} from "../../firebase";

const Profile = () => {

    // const token = JSON.parse(localStorage.getItem('Token'))

    const [togle, setTogle] = useState(false)
    const btnClick = () => {
        setTogle(true)
    }

    const btnDoubleClick = () => {
        setTogle(false)
    }


    const [productsArray, setProductsArray] = useState([])

    const [inputImg, setInputImg] = useState('')
    const [inputNameProduct, setInputNameProduct] = useState('')
    const [inputDescriptionProduct, setInputDescriptionProduct] = useState('')
    const [inputPrice, setInputPrice] = useState('')


    const saveData = async () => {
      const db = getDatabase(app)
        const newDocRef = push(ref(db, 'products'))
        set(newDocRef, {
            id: uuidv4(),
            img: inputImg,
            nameProduct: inputNameProduct,
            descriptionProduct: inputDescriptionProduct,
            price: `$${inputPrice}.00`
        })
            .then(()=> {
                alert('data saved successfully...!')
            })
            .catch((error)=>{
                alert('error: ', error.message)
            })

        setInputImg('')
        setInputNameProduct('')
        setInputDescriptionProduct('')
        setInputPrice('')
    }


    const getData = async () => {
        const db = getDatabase(app)
        const dbRef = ref(db, 'products')
        const snapshot = await get(dbRef)

        if (snapshot.exists()){
            setProductsArray(Object.values(snapshot.val()))
        }
        else {
            alert('error')
        }
    }
    

  return(
      <>
          {
              togle &&
                  <header>
                      <div className="bg-blue-400">
                          <div className="flex-1 flex-col max-w-80">
                              <input type="text" placeholder="img URL..."
                                     value={inputImg}
                                     onChange={(ev) => setInputImg(ev.target.value)}
                                     className="ml-5 mt-7 mb-3 text-2xl rounded"/>
                              <input type="text" placeholder="Name product..."
                                     value={inputNameProduct}
                                     onChange={(ev) => setInputNameProduct(ev.target.value)}
                                     className="ml-5 mb-3 text-2xl rounded"/>
                              <input type="text" placeholder="Description product..."
                                     value={inputDescriptionProduct}
                                     onChange={(ev) => setInputDescriptionProduct(ev.target.value)}
                                     className="ml-5 mb-3 text-2xl rounded"/>
                              <input type="text" placeholder="Price..."
                                     value={inputPrice}
                                     onChange={(ev) => setInputPrice(ev.target.value)}
                                     className="ml-5 mb-3 text-2xl rounded"/>
                              <button onClick={saveData}
                                      className="ml-5 text-1xl w-24 h-10 bg-green-500 text-white rounded-lg border-4 border-yellow-500 mb-3">Save
                                  data
                              </button>
                          </div>
                      </div>
                  </header>
          }
          <button onClick={btnClick}
                  onDoubleClick={btnDoubleClick}
                  className="ml-5 text-1xl w-32 h-10 bg-green-500 text-white rounded-lg border-4 border-yellow-500 mb-3 mt-3">Add
              a Product
          </button>


          {/*flex justify-center items-center*/}
          <button onClick={getData}
                  className="ml-5 text-1xl w-32 h-10 bg-teal-500 text-white rounded-lg border-4 border-gray-400 mb-3 mt-3">Display
              Data
          </button>
          {/*w-full bg-green-200 rounded-lg m-auto border-4 border-teal-400 flex-auto justify-center*/}
          <div className="w-full bg-green-200 rounded-2xl border-4 border-teal-400">
              <div className="grid grid-cols-4">


                  {
                      productsArray.map((item) => (
                          <div className="m-6 w-80 bg-white rounded-xl" key={item.id}>
                              <div className="relative max-w-xs overflow-hidden rounded-t-lg">
                                  <img src={item.img} alt="image"/>
                              </div>
                              <h4 className="text-center">{item.nameProduct}</h4>
                              <h2 className="text-center">{item.descriptionProduct}</h2>
                              <h2 className="text-center font-extrabold">{item.price}</h2>
                          </div>
                      ))
                  }


              </div>

          </div>
      </>
  )
}
export default Profile;