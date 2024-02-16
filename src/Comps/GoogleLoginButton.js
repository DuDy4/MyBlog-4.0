

function navigate(url){
    window.location.href = url;
}

async function auth(){
    const response = await fetch('http://localhost:4000/request',
    {method: "post"})
    const data = await response.json();
    navigate(data.url);
}

export default function GoogleLoginButton(){

    return (
        <button type="button" onClick={() => auth()}>
            Sign in to Google
        </button>
    )

}