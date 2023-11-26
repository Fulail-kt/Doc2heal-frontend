import Routers from "../Routes/Routers"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"

function Layout() {
    return (
        <>
            <Header />
            <main>
                <Routers />
            </main>
            <Footer />
        </>
    )
}

export default Layout
