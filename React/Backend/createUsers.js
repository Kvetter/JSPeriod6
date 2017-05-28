
var userFacade = require("./userFacade")

userFacade.createNewUser("Per", "123", (data) => {
    if(data != null) {
        console.log("Per is created");
    }
})

userFacade.createNewUser("Bob", "321", (data) => {
    if(data != null) {
        console.log("Bob is created");
    }
})