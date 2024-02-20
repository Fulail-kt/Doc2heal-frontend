import Header from "../../components/Header/Header"


const About:React.FC = () => {
  return (
    <>
        <div className="w-full min-h-screen profile_bg" >
            <Header/>
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-4">Welcome to Doc2Heal!</h1>
            <p className="mb-4">
                At <strong>Doc2Heal</strong>, our mission is to revolutionize healthcare by providing accessible, convenient, and high-quality online doctor consultations. We understand the importance of timely medical advice and aim to connect patients with experienced healthcare professionals from the comfort of their homes.
            </p>
            <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
            <p className="mb-4">
                We envision a future where healthcare is easily accessible to everyone, regardless of their location or circumstances. By leveraging technology, we strive to empower individuals to take control of their health and well-being.
            </p>
            <h2 className="text-2xl font-bold mb-2">How Doc2Heal Works</h2>
            <ul className="list-disc pl-8 mb-4">
                <li>Book Consultations: Simply browse through our list of qualified doctors, select a convenient time slot, and book your consultation online.</li>
                <li>Connect with Experts: Our platform enables seamless communication between patients and healthcare professionals via video or audio calls, chat, or messaging.</li>
                <li>Receive Personalized Care: Receive personalized medical advice, diagnosis, and treatment plans tailored to your individual needs.</li>
            </ul>
            <h2 className="text-2xl font-bold mb-2">Meet Our Experts</h2>
            <div className="mb-4">
                <p>
                    <strong>Dr. Sarah Johnson, MD</strong><br />
                    Founder & Chief Medical Officer<br />
                    Dr. Johnson is a board-certified physician with over 15 years of experience in internal medicine. She is passionate about leveraging technology to improve patient care and accessibility to healthcare services.
                </p>
                <p>
                    <strong>John Doe</strong><br />
                    Chief Technology Officer<br />
                    John is an experienced software engineer with a background in developing secure and user-friendly platforms. He leads our team of developers in building and maintaining the Doc2Heal platform.
                </p>
            </div>
            <h2 className="text-2xl font-bold mb-2">Quality Assurance</h2>
            <p className="mb-4">
                At <strong>Doc2Heal</strong>, we prioritize patient safety and confidentiality. Our platform adheres to strict medical standards and security protocols to ensure the privacy and security of your personal information.
            </p>
            <h2 className="text-2xl font-bold mb-2">Testimonials</h2>
            <blockquote className="italic border-l-4 border-blue-500 pl-4 mb-4">
                <p>
                    "I was amazed by the convenience and professionalism of Doc2Heal. I received expert medical advice from the comfort of my home, saving me time and hassle." - Emily R.
                </p>
            </blockquote>
            <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
            <p className="mb-4">
                Have questions or need assistance? Don't hesitate to reach out to our friendly customer support team at <a href="mailto:@doc2heal.service@gmail.com" className="text-blue-500">@doc2heal.service@gmail.com</a>.
            </p>
            <p>
                Thank you for choosing Doc2Heal for your healthcare needs. We look forward to serving you!
            </p>
        </div>
        </div>
    </>
  )
}

export default About
