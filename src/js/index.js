require("index.html");   
require("css/index.css");
// =================================================


$.ajax({
    url: 'http://localhost:3001/admin',
    type: 'GET',
    dataType: 'json'
})
.done((data)=> {
    $("#app").append(JSON.stringify(data));
    console.log('res:',data);
})
.fail((err)=> {
    console.error('err:',err);
})