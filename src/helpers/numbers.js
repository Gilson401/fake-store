module.exports = {
    brlFormat(value) {
        return  value.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        })
    }
}