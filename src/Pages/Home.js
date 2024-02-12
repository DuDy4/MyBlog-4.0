import myCatImg from "../Chana.jpg"

export default function Home(){

    return (
        <section className="py-5 text-center container">
            <div className="row py-lg-5">
                <div className="col-lg-6 col-md-8 mx-auto">
                    <h1>Hello, This is MyBlog 3.0</h1>
                    <p>Feel free to read whatever you'd like</p>
                    <img src={myCatImg} alt="" style={{width: "80%", height:"auto"}}/>
                </div>
            </div>
        </section>
    )
}