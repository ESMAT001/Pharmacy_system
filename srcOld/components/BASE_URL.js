
function BASE_URL(url) {
    if(url==="http://localhost:3000"){
            return "http://localhost:8080";
    }else{
        return document.location.origin;
    }
}

export default BASE_URL
