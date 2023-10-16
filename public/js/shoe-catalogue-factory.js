function ShoeCatalogue() {
    const shoes = [
        {
            name: "Scott formal shoe",
            brand: "GINO PAOLI",
            colour: "Grey",
            size: 6,
            price: 799,
            in_stock: 12,
            img_src: "./public/images/shoes/scott-formal-shoe.png"
        },
        {
            name: "Nanni 38 loafer",
            brand: "MAZERATA",
            colour: "Tan",
            size: 8,
            price: 559,
            in_stock: 8,
            img_src: "./public/images/shoes/nanni-38-loafer.png"
        },
        {
            name: "Miraylle",
            brand: "ALDO",
            colour: "Brown",
            size: 10,
            price: 2199,
            in_stock: 5,
            img_src: "./public/images/shoes/miraylle.png"
        },
        {
            name: "Percival",
            brand: "ALDO",
            colour: "Burgundy",
            size: 7,
            price: 1649,
            in_stock: 3,
            img_src: "./public/images/shoes/percival.png"
        },
        {
            name: "Nanni 36 - loafer",
            brand: "MAZERATA",
            colour: "Black",
            size: 6,
            price: 664,
            in_stock: 7,
            img_src: "./public/images/shoes/nanni-36-loafer.png"
        },
        {
            name: "Magio 72 formal",
            brand: "MAZERATA",
            colour: "Dark Brown",
            size: 8,
            price: 559,
            in_stock: 14,
            img_src: "./public/images/shoes/magio-72-formal.png"
        },
        {
            name: "Monetto",
            brand: "ALDO",
            colour: "Grey",
            size: 9,
            price: 1649,
            in_stock: 4,
            img_src: "./public/images/shoes/monetto.png"
        },
        {
            name: "Sergio formal shoe",
            brand: "GINO PAOLI",
            colour: "Brown",
            size: 7,
            price: 799,
            in_stock: 9,
            img_src: "./public/images/shoes/sergio-formal-shoe.png"
        },
        {
            name: "Killyon",
            brand: "CALL IT SPRING",
            colour: "Brown",
            size: 8,
            price: 899,
            in_stock: 11,
            img_src: "./public/images/shoes/killyon.png"
        },
        {
            name: "Albeck",
            brand: "ALDO",
            colour: "Tan",
            size: 6,
            price: 1899,
            in_stock: 5,
            img_src: "./public/images/shoes/albeck.png"
        },
        {
            name: "Magio 52 loafer",
            brand: "MAZERATA",
            colour: "Dark Brown",
            size: 7,
            price: 551,
            in_stock: 6,
            img_src: "./public/images/shoes/magio-52-loafer.png"
        },
        {
            name: "Wingstroll",
            brand: "ALDO",
            colour: "Black",
            size: 9,
            price: 1699,
            in_stock: 10,
            img_src: "./public/images/shoes/wingstroll.png"
        },
        {
            name: "Matey leather",
            brand: "STEVE MADDEN",
            colour: "Black",
            size: 6,
            price: 250,
            in_stock: 4,
            img_src: "./public/images/shoes/matey-leather.png"
        },
        {
            name: "Grazie 61 canvas",
            brand: "MAZERATA",
            colour: "Grey",
            size: 8,
            price: 899,
            in_stock: 8,
            img_src: "./public/images/shoes/grazie-61-canvas.png"
        },
        {
            name: "Ybiari",
            brand: "CALL IT SPRING",
            colour: "Tan",
            size: 10,
            price: 899,
            in_stock: 12,
            img_src: "./public/images/shoes/ybiari.png"
        },
        {
            name: "Oxford leather lace up",
            brand: "POLO",
            colour: "Burgundy",
            size: 8,
            price: 2999,
            in_stock: 5,
            img_src: "./public/images/shoes/oxford-leather-lace-up.png"
        },
        {
            name: "Brogue gibson leather lace up",
            brand: "POLO",
            colour: "Brown",
            size: 7,
            price: 2099,
            in_stock: 9,
            img_src: "./public/images/shoes/brogue-toe-cap-gibson-leather-lace-up.png"
        },
        {
            name: "Sheldon slip-on",
            brand: "GINO PAOLI",
            colour: "Grey",
            size: 6,
            price: 599,
            in_stock: 7,
            img_src: "./public/images/shoes/sheldon-slip-on.png"
        },
        {
            name: "Lindo leather",
            brand: "STEVE MADDEN",
            colour: "Dark Brown",
            size: 9,
            price: 1999,
            in_stock: 3,
            img_src: "./public/images/shoes/lindo-leather.png"
        },
        {
            name: "Burnished gibson leather lace up",
            brand: "POLO",
            colour: "Dark Brown",
            size: 9,
            price: 2999,
            in_stock: 10,
            img_src: "./public/images/shoes/burnished-toe-cap-gibson-leather-lace-up.png"
        }
    ]

    function addToCart(shoeName) {
        shoes.forEach(item => {

            if (shoeName === item.name) {
                if (item.in_stock > 0) {
                    item.in_stock -= 1;
                }
            }

        })
    }

    async function filterShoes(brand, colour, size) {

        const brandSelection = brand === "default";
        const colourSelection = colour === "default";
        const sizeSelection = size === "default";

        if(!brandSelection && !colourSelection && !sizeSelection) {
            const result = await axios.get(`http://localhost:3010/api/shoes/brand/${brand}/colour/${colour}/size/${size}`)
            return result.data;
        } else if (!brandSelection && !colourSelection) {
            const result = await axios.get(`http://localhost:3010/api/shoes/brand/${brand}/colour/${colour}`)
            return result.data;
        } else if (!brandSelection && !sizeSelection) {
            const result = await axios.get(`http://localhost:3010/api/shoes/brand/${brand}/size/${size}`)
            return result.data;
        } else if (!colourSelection && !sizeSelection) {
            const result = await axios.get(`http://localhost:3010/api/shoes/colour/${colour}/size/${size}`)
            return result.data;
        } else if (!brandSelection) {
            const result = await axios.get(`http://localhost:3010/api/shoes/brand/${brand}`)
            return result.data;
        } else if (!sizeSelection) {
            const result = await axios.get(`http://localhost:3010/api/shoes/size/${size}`)
            return result.data;
        } else if (!colourSelection) {
            const result = await axios.get(`http://localhost:3010/api/shoes/colour/${colour}`)
            return result.data;
        }

    }

    return {
        shoes,
        addToCart,
        filterShoes
    }
}

