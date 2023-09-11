function redirectToUserPage(sessionId){
    if(sessionId != null){
        location.href = "/user/"+sessionId;
    }
    else {
        location.href = "/login";
    }
}