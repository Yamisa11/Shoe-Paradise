function ShoeCatalogue() {

    // function addToCart(shoeName) {
    //     shoes.forEach(item => {

    //         if (shoeName === item.name) {
    //             if (item.in_stock > 0) {
    //                 item.in_stock -= 1;
    //             }
    //         }

    //     })
    // }

    async function filterShoes(brand, colour, size) {

        const brandSelection = brand === "default";
        const colourSelection = colour === "default";
        const sizeSelection = size === "default";

        if(!brandSelection && !colourSelection && !sizeSelection) {
            const result = await axios.get(`https://shoe-catalogue-api-au25.onrender.com/api/shoes/brand/${brand}/colour/${colour}/size/${size}`)
            return result.data;
        } else if (!brandSelection && !colourSelection) {
            const result = await axios.get(`https://shoe-catalogue-api-au25.onrender.com/api/shoes/brand/${brand}/colour/${colour}`)
            return result.data;
        } else if (!brandSelection && !sizeSelection) {
            const result = await axios.get(`https://shoe-catalogue-api-au25.onrender.com/api/shoes/brand/${brand}/size/${size}`)
            return result.data;
        } else if (!colourSelection && !sizeSelection) {
            const result = await axios.get(`https://shoe-catalogue-api-au25.onrender.com/api/shoes/colour/${colour}/size/${size}`)
            return result.data;
        } else if (!brandSelection) {
            const result = await axios.get(`https://shoe-catalogue-api-au25.onrender.com/api/shoes/brand/${brand}`)
            return result.data;
        } else if (!sizeSelection) {
            const result = await axios.get(`https://shoe-catalogue-api-au25.onrender.com/api/shoes/size/${size}`)
            return result.data;
        } else if (!colourSelection) {
            const result = await axios.get(`https://shoe-catalogue-api-au25.onrender.com/api/shoes/colour/${colour}`)
            return result.data;
        }

    }

    return {
        // addToCart,
        filterShoes
    }
}

