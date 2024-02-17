import myCatImg from "../Chana.jpg"

export default function Home(){

    return (
        <section className="py-3 text-center container">
            {/*<div className="row py-lg-5">*/}
                <div className="col-lg-6 col-md-8 mx-auto">
                    <h1>Hello, This is my Blog</h1>
                    <p>Everybody is free to read it's post.</p>
                    <p>If you want to write a post, please sign up / sign in</p>
                    <img src={myCatImg} alt="" style={{width: "80%", height:"auto"}}/>
                </div>
            {/*</div>*/}
        </section>
    )
}