import myCatImg from "../Chana.jpg"


export default function Home(){
    //After a lot of css tries, I used the one worked on Nir's project...
    //Those included on section and 2 divisions.
    return (
        <section className="py-5 text-center container">
            <div className="row py-lg-5">
                <div className="col-lg-6 col-md-8 mx-auto">
                    <h1>Hello, This is MyBlog 2.0</h1>
                    <p>Feel free to read whatever you'd like</p>
                    <img src={myCatImg} alt="" style={{width: "50%", height:"auto"}}/>
                </div>
            </div>
        </section>
    )
}