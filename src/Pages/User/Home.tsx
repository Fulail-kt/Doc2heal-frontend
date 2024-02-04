import { FC, useEffect, useState } from "react"

// import doc1 from '../../assets/images/hero-img01.png'
// import doc2 from '../../assets/images/hero-img02.png'
// import doc3 from '../../assets/images/hero-img03.png'
import doc1 from '../../assets/images/first.jpeg'
import doc3 from '../../assets/images/ladydoc.jpeg'
import doc2 from '../../assets/images/second.jpeg'
import doc4 from '../../assets/images/4th.jpeg'
import { Link, useNavigate } from "react-router-dom"
// import toast, { Toaster } from "react-hot-toast"
import { jwtDecode } from 'jwt-decode'
import Spinner from "../../components/Spinner/Spinner"
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import bg from '../../assets/images/cheerful-arab-female-doctor-working-online-in-the-clinic-using.webp'
import bg2 from '../../assets/images/1a73b0_698c44f1c55b4a768ee913d908909ac1~mv2.webp'
import bg1 from '../../assets/images/online-applointment-booking-calendar-modish-regristration_31965-60917.avif'

const Home: FC = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // Set loading to true when starting the operation

    if (!token) {

      navigate('/');
      setLoading(false)
    } else {
      try {
        const decode = jwtDecode<{ _id: string; role: string }>(token);

        if (decode.role === 'admin') {
          navigate('/admin');
        }
        if (decode.role === 'doctor') {
          navigate('/doctor');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        // Handle error if necessary
      } finally {
        setLoading(false); // Set loading to false when the operation is finished
      }
    }
  }, [token, navigate]);


  return (
    <>
      {/* <Toaster /> */}
      {loading ? (<span className="w-full"><Spinner /></span>) :

        (

          <>
            <Header />

            <section className="hero_section pb-[50px]  pt-[60px] 2xl:h-[800px]">

              <div className="container">

                <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
                  <div>
                    <div className="lg:w-[570px]">
                      <h1 className="text-[36px] leading-[46px] text-slate-900 font-[800] md:text-[60px] md:leading-[70px]">
                        We help you live your best life.
                      </h1>
                      <p className="text__para">
                        Our platform connects you with renowned healthcare professionals,
                        ensuring that you receive the highest standard of medical guidance.
                        Your well-being is our priority, and we're here to support you on your journey to optimal health

                      </p>
                      <button className="btn">Request an Appointment</button>
                    </div>
                  </div>

                  <div className="flex w-full gap-[13px] justify-end">
                    <div className="flex flex-col items-center">
                      <img className=" h-[50%] w-[80%] rounded-md" src={doc1} alt="" />
                      <img className=" h-[30%] w-[80%] mt-3  rounded-md" src={doc4} alt="" />
                    </div>
                    <div className="mt-[30px] ">
                      <img className="w-full mb-[15px] rounded-md " src={doc2} alt="" />

                      <img className="w-full rounded-md" src={doc3} alt="" />
                    </div>
                  </div>

                </div>

                <div className="doctor_Card w-100 flex flex-col items-center justify-center">
                  <h1 className="font-semibold text-black text-xl">We Providing the best medical services.</h1>

                  <div className="flex flex-wrap justify-center items-center gap-3 my-12">
                    <div className="card flex justify-center items-end pb-5 w-40 sm:w-40 md:w-44 lg:w-44 xl:w-48 h-56 bg-slate-500 rounded-md" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${bg1})`, backgroundSize: 'cover', backgroundPosition: 'center' }} >
                      <h1 className="text-white font-semibold text-sm md:text-base ">Online Appointments</h1>
                    </div>
                    <div className="card flex justify-center items-center pb-5 w-40 sm:w-40 md:w-44 lg:w-44 xl:w-48 h-64 bg-slate-500 rounded-md" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      <h1 className="text-white font-semibold  text-[13px] md:text-base ">Instant video consultation</h1>
                    </div>
                    <div
                      className="card flex justify-center items-end pb-5 w-40 sm:w-40 md:w-44 lg:w-44 xl:w-48 h-56 rounded-md"
                      style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${bg2})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      <h1 className="text-white font-semibold  text-sm md:text-base">Detailed Prescriptions</h1>
                    </div>
                  </div>


                  <div className="text-center w-full sm:w-1/2 ">
                    Our dedicated team strives to ensure a superior and personalized healthcare experience,
                    leveraging the latest technology to facilitate virtual consultations with skilled doctors.
                    With a steadfast focus on patient well-being, we aim to redefine the landscape of healthcare delivery
                    by combining expertise, convenience, and innovation. Trust us for your medical needs, and experience
                    the future of healthcare, where quality meets convenience.
                  </div>


                  <div className="flex flex-col items-center sm:flex-row  md:flex-row  justify-center mt-9 gap-x-10 w-full">

                    <div className="w-[80%]  sm:w-1/3 patient_bg bg-slate-600 rounded-md h-52 flex justify-center  items-end">
                      <Link to='/doctors'><button className="bg-blue-500 rounded-full p-1 px-2 font-semibold mb-2 text-white">Join as Patient</button></Link>
                    </div>

                    <div className="w-[80%] mt-1 sm:w-1/3 doctor_bg bg-slate-600 rounded-md h-52 flex justify-center items-end" >
                      <Link to='/application'>
                        <button className="bg-blue-500 rounded-full p-1 px-2 font-semibold mb-2 text-white">Join as Doctor</button>
                      </Link>
                    </div>
                  </div>
                </div>

              </div>

            </section>
            <Footer />

          </>
        )}
    </>
  )
}

export default Home