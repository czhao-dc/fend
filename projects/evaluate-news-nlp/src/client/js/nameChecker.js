function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);

    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ]

    if(names.includes(inputText)) {
        alert("Welcome, Captain!")
    } else if(inputText==='') {
        alert("input cannot be empty")
    } else {
        return true
    }
}

export { checkForName }
