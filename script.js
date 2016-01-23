var baseUrl = "server.php",
    currentPage = 0,
    dataArrayLength = 3;
//TODO : make dataArrayLength dynamic

makeJSONRequest(baseUrl, {id: currentPage}, success);

$(".buttons").click(pageNextCard);
$("#currentPage").text(currentPage + 1);

function pageNextCard(ev){
    if(ev.target == $("#leftArrow")[0]){
        if(currentPage > 0){
            currentPage--;
        }
    } else if(ev.target == $("#rightArrow")[0]){
        if(currentPage < dataArrayLength - 1){
            currentPage++;
        }
    }
    $("#currentPage").text(currentPage + 1);
    makeJSONRequest(baseUrl, {id: currentPage}, success);
}

function success(data) {
    writeToDom(JSON.parse(data));
}

function writeToDom(data){
    $("#name").text(data["name"]);
    $("#email").text(data["email"]);
    $("#phone").text(data["phone"]);
    $("#address").text(data["address"]);
    $("#picture").attr("src", data["image"]);
    $("#heading span").text(data["name"].split(" ")[0]);
}

function makeJSONRequest(baseUrl, paramsObject, handleSuccess, requestType, handleError){
    handleSuccess = handleSuccess || function(){};
    handleError = handleError || function(){};
    requestType = requestType || 'GET';

    if(paramsObject){
        baseUrl += '?';
    }

    $.ajax({
        type : requestType,
        contentType : 'application/json',
        url : baseUrl + parseParams(paramsObject),
        success : handleSuccess,
        error : handleError
    });

    function parseParams(params) {
        var paramsAsString = [];

        for (var key in params) {
            var pair = encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
            paramsAsString.push(pair);
        }

        return paramsAsString.join('&');
    }
}
