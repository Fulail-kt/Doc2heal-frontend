import { FC, useEffect,useState } from "react"
import doc1 from '../../assets/images/hero-img01.png'
import doc2 from '../../assets/images/hero-img02.png'
import doc3 from '../../assets/images/hero-img03.png'
import { Link, useNavigate } from "react-router-dom"
// import toast, { Toaster } from "react-hot-toast"
import {jwtDecode} from 'jwt-decode'
import Spinner from "../../components/Spinner/Spinner"
import Header from "../../components/Header/Header"


const Home: FC = () => {

    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);
    // const location = useLocation()
    // const message = location.state?.msg;
    //     console.log(msg,"------------");

    useEffect(() => {

        if (!token) {
            navigate('/')
        } else {
        
            
            const decode=jwtDecode<{_id:string;role:string}>(token)
            console.log(decode)
            if(decode.role=="admin"){
            
            console.log("admin");
            
                navigate('/admin')
                // window.location.reload()
            }
            if(decode.role=="doctor"){
                navigate('/dashboard')
            }
        }

        

    }, [token])
    



    return (
        <>
            {/* <Toaster /> */}
            {loading?(<span className="w-full"><Spinner/></span>):

           ( 

            <>
            <Header />
           
           <section className="hero_section pt-[60px] 2xl:h-[800px]">

                <div className="container">

                    <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
                        <div>
                            <div className="lg:w-[570px]">
                                <h1 className="text-[36px] leading-[46px] text-slate-900 font-[800] md:text-[60px] md:leading-[70px]">
                                    We help you live your best life.
                                </h1>
                                <p className="text__para">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Donec commodo nunc ac diam iaculis lacinia. In rutrum elit in
                                    ullamcorper consequat. Duis sed libero orci. Orci varius natoque
                                </p>
                                <button className="btn">Request an Appointment</button>
                            </div>
                        </div>

                        <div className="flex gap-[15px] justify-end">
                            <div>
                                <img className="w-full" src={doc1} alt="" />
                            </div>
                            <div className="mt-[30px]">
                                <img className="w-full mb-[15px]" src={doc2} alt="" />

                                <img className="w-full" src={doc3} alt="" />
                            </div>
                        </div>

                    </div>

                    <div className="doctor_Card w-100 flex flex-col items-center justify-center">
                        <h1>We Providing the best medical services.</h1>

                            <div className="flex flex-wrap justify-center items-center gap-3 my-12">
                                <div className="card w-40 sm:w-40 md:w-44 lg:w-44 xl:w-48 h-56 bg-slate-500 rounded-md"></div>
                                <div className="card w-40 sm:w-40 md:w-44 lg:w-44 xl:w-48 h-64 bg-slate-500 rounded-md"></div>
                                <div className="card w-40 sm:w-40 md:w-44 lg:w-44 xl:w-48 h-56 bg-slate-500 rounded-md"></div>
                            </div>


                        <div className="text-center w-1/2">
                            Publishing and graphic design, Lorem ipsum is
                            a placeholder text commonly used to
                            demonstrate the visual form of a document or
                            a typeface without relying on meaningful
                            content. Lorem ipsum ma
                        </div>


                        <div className="flex justify-center mt-9 gap-x-10 w-full">

                            <div className="w-1/3 bg-slate-600 rounded-md h-52 flex justify-center items-end">
                                <Link to='/doctors'><button className="bg-blue-500 rounded-full p-1 px-2 font-semibold mb-2 text-white">Become a Patient</button></Link>
                            </div>

                            <div className="w-1/3  bg-slate-600 rounded-md h-52 flex justify-center items-end">
                            <Link to='/application'><button className="bg-blue-500 rounded-full p-1 px-2 font-semibold mb-2 text-white">Join as Doctor</button></Link>
                            </div>
                        </div>
                    </div>

                </div>

            </section>
            </>
            )}
        </>
    )
}

export default Home