import {FC} from "react"
import doc1 from '../assets/images/hero-img01.png'
import doc2 from '../assets/images/hero-img02.png'
import doc3 from '../assets/images/hero-img03.png'


const Home:FC=()=>{
    return (
        <>
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

                    <div className="flex justify-center items-center gap-3 my-12">
                    <div className="card_1 w-44 h-56 bg-slate-500 rounded-md"></div>
                    <div className="card_2 w-44 h-64 bg-slate-500 rounded-md"></div>
                    <div className="card_1 w-44 h-56 bg-slate-500 rounded-md"></div>
                    </div>

                    <div className="text-center w-1/2">
                    Publishing and graphic design, Lorem ipsum is
                     a placeholder text commonly used to
                    demonstrate the visual form of a document or
                    a typeface without relying on meaningful
                     content. Lorem ipsum ma
                    </div>
                </div>

            </div>

        </section>
        </>
    )
}

export default Home