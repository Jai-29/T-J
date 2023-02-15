
$(document).ready(function () {
    //interface for api
    const apikey = "63e9a2cd478852088da680bf";
    const url = "https://interactivedev-33af.restdb.io/rest/cart";
    //buttons 
    var featurebutton = document.getElementsByClassName("featured__button")
    var productbutton = document.getElementsByClassName("products__button")
    var newbutton = document.getElementsByClassName("new__button")
    var newwatchbutton = document.getElementsByClassName("home__button")


    //add product
    for (var i = 0; i < newwatchbutton.length; i++) {
        var containerboxes = newwatchbutton[i]
        containerboxes.addEventListener("click", newwatch)
    }

    function newwatch(event) {

        var button = event.target
        var shopitem = button.parentElement.parentElement.parentElement
        var title = shopitem.getElementsByClassName("home__title")[0].innerText
        var price = shopitem.getElementsByClassName("home__price")[0]
        var prices = parseFloat(price.innerText.replace("$", ""))
        var image = shopitem.getElementsByClassName("home__img")[0].src

        let jsondata = {
            "ProductName": title,
            "Price": prices,
            "Image": image
        }

        let setting = {
            "async": true,
            "crossDomain": true,
            "url": url,
            "method": "post",
            "headers": {
                "content-type": "application/json",
                "x-apikey": apikey,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)
        }

        $.ajax(setting).done(function (res) {
        })
    }

    for (var i = 0; i < newbutton.length; i++) {
        var containerboxes = newbutton[i]
        containerboxes.addEventListener("click", AddToCartNewProduct)
    }

    function AddToCartNewProduct(event) {

        var button = event.target
        var shopitem = button.parentElement
        var title = shopitem.getElementsByClassName("new__title")[0].innerText
        var price = shopitem.getElementsByClassName("new__price")[0]
        var prices = parseFloat(price.innerText.replace("$", ""))
        var image = shopitem.getElementsByClassName("new__img")[0].src

        let jsondata = {
            "ProductName": title,
            "Price": prices,
            "Image": image
        }

        let setting = {
            "async": true,
            "crossDomain": true,
            "url": url,
            "method": "post",
            "headers": {
                "content-type": "application/json",
                "x-apikey": apikey,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)
        }

        $.ajax(setting).done(function (res) {
        })
    }

    for (var i = 0; i < productbutton.length; i++) {
        var containerboxes = productbutton[i]
        containerboxes.addEventListener("click", AddToCartProduct)
    }

    function AddToCartProduct(event) {

        var button = event.target
        var shopitem = button.parentElement.parentElement
        var title = shopitem.getElementsByClassName("products__title")[0].innerText
        var price = shopitem.getElementsByClassName("products__price")[0]
        var image = shopitem.getElementsByClassName("products__img")[0].src
        var prices = parseFloat(price.innerText.replace("$", ""))

        let jsondata = {
            "ProductName": title,
            "Price": prices,
            "Image": image
        }

        let setting = {
            "async": true,
            "crossDomain": true,
            "url": url,
            "method": "post",
            "headers": {
                "content-type": "application/json",
                "x-apikey": apikey,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)
        }

        $.ajax(setting).done(function (res) {
        })

    }

    for (var i = 0; i < featurebutton.length; i++) {
        var containerboxes = featurebutton[i]
        containerboxes.addEventListener("click", AddToCart)
    }

    function AddToCart(event) {

        var button = event.target
        var shopitem = button.parentElement
        var title = shopitem.getElementsByClassName("featured__title")[0].innerText
        var price = shopitem.getElementsByClassName("featured__price")[0]
        var image = shopitem.getElementsByClassName("featured__img")[0].src
        var prices = parseFloat(price.innerText.replace("$", ""))

        let jsondata = {
            "ProductName": title,
            "Price": prices,
            "Image": image
        }

        let setting = {
            "async": true,
            "crossDomain": true,
            "url": url,
            "method": "post",
            "headers": {
                "content-type": "application/json",
                "x-apikey": apikey,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata)
        }

        $.ajax(setting).done(function (res) {
            console.log(res)
        })

    }
    //read data from database
    let setting = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "get",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        },
    }



    $.ajax(setting).done(function (res) {
        console.log(res)
        addItemToCart()
        removecart()
        //quantitybutton()

        function addItemToCart() {
            let cartRowContent
            let count = 0;
            var totalitem = document.getElementsByClassName("cart__prices-item")[0]
            var carttotal = document.getElementsByClassName("cart__prices-total")[0];
            var price = 0;
            for (var i = 0; i < res.length; i++) {
                price += res[i].Price
            }
            var total = 0;

            for (var i = 0; i < res.length; i++) {
                count++
                cartRowContent +=
                    `<tr class="delete" data-getid="${res[i]._id}"><td>   
                <div class="cart__box">
                    <img src="${res[i].Image}" alt="" class="cart__img"/>
                    </div>
                    <h3 class="cart__title">${res[i].ProductName}</h3>
                    <span class="cart__price"> $${res[i].Price}</span>
                    <div class="cart__amount">
                        <button class="trash_icon" type="button"><i class="bx bx-trash-alt cart__amount-trash"></i></button>
                    </div>`
            }
            $(".cart__details").html(cartRowContent);
            totalitem.innerText = count + " items";
            carttotal.innerText = "$" + price;

        }

        $(".cart__details").on("click", ".delete", function () {
            let id = $(this).data("getid");
            console.log(id)

            let setting = {
                "async": true,
                "crossDomain": true,
                "url": `https://interactivedev-33af.restdb.io/rest/cart/${id}`,
                "method": "delete",
                "headers": {
                    "content-type": "application/json",
                    "x-apikey": apikey,
                    "cache-control": "no-cache"
                },
            }

            $.ajax(setting).done(function (res) {
                console.log(res)

            })
        })

    });


    function removecart() {
        var removecartbutton = document.getElementsByClassName("trash_icon")
        console.log(removecartbutton)
        for (var i = 0; i < removecartbutton.length; i++) {
            var button = removecartbutton[i]
            button.addEventListener("click", function (event) {
                setTimeout(function () {
                    var buttonclick = event.target
                    buttonclick.parentElement.parentElement.parentElement.parentElement.remove()
                }, 1000);
            })
        }
    }

    // Updated Tool
    /*function updatetotal() {
        var cartDetails = document.getElementsByClassName('cart__details')[0];
        var cartBoxes = cartDetails.getElementsByClassName('cart__box');
        var total = 0;
        for (var i = 0; i < res.length; i++) {
            var cartBox = res[i].price;
            console.log(cartBox);
            total += cartBox;
            // If price Contain some cents value 
            total = Math.round(total * 100) / 100;

            document.getElementByClassName("cart__prices-total")[0].innerText = "$" + total;
        }
    }*/


})