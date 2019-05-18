function ServiceExecuter(params) {
    $.ajax({
        type: "POST",
        //async: true,
        url: "/WS.asmx/" + params.methodName,
        data: params.parameters,
        context: this,
        async: false,
        dataType: "json",
        success: function (data) {
            if (params.onSuccess != null) {
                params.onSuccess(data);
            }
        }
    });
}

function CloseLogin() {
    $('#divLoginError').hide();
    $('#modalLogin').hide(200);
}

function CloseRegister() {
    $('#divRegisterError').hide();
    $('#modalRegister').hide(200);
}

function GetProductCategory(id) {
    var executer = new ServiceExecuter({
        methodName: "GetProductCategory", parameters: { id: id },
        onSuccess: function (data) {
            var html = "";
            for (var i = 0 ; i < data.length; i++) {
                html += '<a class="itemMenuName level4" href="shop.html?category=' + data[i].guid + '"><span>' + data[i].title + '</span></a>';
            }
            $('#divCategories').html(html);
        }
    });
}

$('.mySearchBox').on('keyup', function () {
    //GetProduct("", $('.mySearchBox').val());
});

var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();


function DoSearchDelay() {
    delay(function () {
        GetProduct("", $('.mySearchBox').val());
    }, 1000);
}

function DoSearch() {
    GetProduct("", $('.mySearchBox').val());
}

function MakeProductList(data, divID, len, _guid) {
    var html = "";
    var _len = data.length;
    if (len) {
        _len = len;
    }

    for (var i = 0 ; i < _len; i++) {
        var valid = true;
        if (_guid) {
            if (data[i].guid == _guid) {
                valid = false;
            }
        }
        if (valid) {
            html += '<div class="item-product">\
						<article class="js-product-miniature" data-id-product="1" data-id-product-attribute="1" itemscope itemtype="#">\
	<div class="img_block">\
       <a href="#" onclick=ShowProductPage("' + data[i].guid + '") class="thumbnail product-thumbnail">\
          <img    src = "'+ data[i].image + '"\
    alt = "'+ data[i].title + '"\
    data-full-size-image-url = "' + data[i].image + '"  >\
                        <img class="img-responsive second-image animation1" \
    src="' + data[i].image2 + '" \
    alt="" itemprop="image"  />\
</a>\
<ul class="product-flag">\
                                                        <li class=" new">New</li>\
            </ul>\
</div>\
<div class="product_desc">\
    <div class="desc_info">\
            <div class="hook-reviews">\
                <div class="comments_note" itemprop="aggregateRating" itemscope itemtype="#">\
    <span class="nb-comments"><span itemprop="reviewCount">1</span> Review(s)</span>\
</div>\
            </div>\
            <h4><a  onclick=ShowProductPage("' + data[i].guid + '")  href="#"\
    title="' + data[i].title2 + '" itemprop="name" class="product_name">' + data[i].title2 + '</a></h4>\
			                    <div class="manufacturer"><a  onclick=ShowProductPage("' + data[i].guid + '")  href="#">' + data[i].title2 + '</a></div>\
                        <div class="product-price-and-shipping">\
               <span itemprop="price" class="price ">' + ConvertToPersianNumbers(data[i].price) + ' تومان</span>\
             <span class="sr-only">قیمت</span>\
            </div>\
            <div class="product-desc" itemprop="description"><p>توضیح</p></div>\
                              <div class="variant-links">\
  <a  onclick=ShowProductPage("' + data[i].guid + '")  href="#"\
   class="color"\
   title="Orange"\
   style="background-color: #F39C11"           ><span class="sr-only">Orange</span></a>\
  <a  onclick=ShowProductPage("' + data[i].guid + '")  href="#"\
   class="color"\
   title="Blue"\
   style="background-color: #5D9CEC"           ><span class="sr-only">Blue</span></a>\
<span class="js-count count"></span>\
</div>\
    </div>	\
    <div class="actions">\
        <ul class="add-to-links">\
            <li class="cart">\
<div class="product-add-to-cart">	\
<input type="hidden" name="token" value="d92c68d73a8b4ce2baab9a587fa3d8f8">\
<input type="hidden" name="id_product" value="1" class="product_page_product_id">\
<input type="hidden" name="qty" value="1">\
<button onclick=InsertUserProduct("' + data[i].guid + '","' + (data[i].price) + '") class="button ajax_add_to_cart_button add-to-cart btn-default" data-button-action="add-to-cart" type="submit" >\
     افزودن به کارت خرید\
</button>\
</div>\
            </li>\
            <li style="display:none">\
                <a  onclick=ShowProductPage("' + data[i].guid + '")  href="#" class="links-details" title="جزئیات محصول">جزئیات محصول</a>\
            </li>\
        </ul>\
    </div>\
</div>\
</article>\
                                        </div>';
        }
    }
    $('#' + divID).html(html);
}

function GetProduct(category, search) {
    $('#divProductPage').hide();
    $('#divProducts').show();
    var executer = new ServiceExecuter({
        methodName: "GetProduct", parameters: { id: "", category: category, search: search, mode: "" },
        onSuccess: function (data) {
            MakeProductList(data, "divProducts");
        }
    });
    if (search == "") {
        var executer = new ServiceExecuter({
            methodName: "GetProduct", parameters: { id: "", category: category, search: search, mode: "new" },
            onSuccess: function (data) {
                MakeProductList(data, "divProducts2");
                $('#tab_new_product').show();
                $('#tab_best_sellers').show();
                if (search == "" && category == "") {
                    setTimeout(function () {
                        $('#tab_new_product').show();
                        $('#tab_best_sellers').show();
                    }, 2000);
                }
            }
        });
        var executer = new ServiceExecuter({
            methodName: "GetProduct", parameters: { id: "", category: category, search: search, mode: "bestseller" },
            onSuccess: function (data) {
                MakeProductList(data, "divProducts3");
                jQuery.ajax({
                    url: "js/shoputil.js",
                    dataType: 'script',
                    success: function () { },
                    async: true
                });
                $('#tab_new_product').show();
                $('#tab_best_sellers').show();
                if (search == "" && category == "") {
                    setTimeout(function () {
                        $('#tab_new_product').show();
                        $('#tab_best_sellers').show();
                    }, 2000);
                }
            }
        });
    }
    else {
        $('#divTopBanners').hide();
        $('.myBanners').hide();
        $('#divProducts2').hide();
        $('#divProducts3').hide();
        jQuery.ajax({
            url: "js/shoputil.js",
            dataType: 'script',
            success: function () { },
            async: true
        });
    }
    if (search == "" && category == "") {
        setTimeout(function () {
            $('#tab_new_product').show();
            $('#tab_best_sellers').show();
        }, 2000);
    }
}

function StartShopPayment() {
    var executer = new ServiceExecuter({
        methodName: "StartShopPayment", parameters: { userguid: userID },
        onSuccess: function (data) {
            if (data != "error") {
                location.href = data;
            }
            else {
                alert('مشکلی در اتصال به بانک پیش آمد، لطفاً مجدد تلاش نمایید');
            }
        }
    });
}

function GetUserProductList(paid) {
    $('#divTopBanners').hide();
    $('.myBanners').hide();
    var executer = new ServiceExecuter({
        methodName: "GetUserProductList", parameters: { userguid: userID, paid: paid },
        onSuccess: function (data) {
            if (paid == 0) {//basket
                if (data.length == 0) {
                    $('#lblBasketNoItem').show();
                }
                else {
                    $('#lblBasketNoItem').hide();
                    var totalPrice = 0;
                    $('#btnPay').hide();
                    var html = "<table style='width:100%'>";
                    for (var i = 0 ; i < data.length; i++) {
                        console.log(data[i].price);
                        html += "<tr style='width:100%; height:35px; font-size:14px'>";
                        html += "<td style='cursor:pointer' onclick=DeleteProductFromBasket('" + data[i].guid + "')>" + "حذف محصول" + "</td>";
                        html += "<td>" + ConvertToPersianNumbers(data[i].persianDate) + "</td>";
                        html += "<td>" + ConvertToPersianNumbers(data[i].price) + " تومان</td>";
                        html += "<td>" + ConvertToPersianNumbers(data[i].productName) + "</td>";
                        totalPrice += parseInt(data[i].price);
                        html += "</tr>";
                    }
                    if (totalPrice != 0) {
                        $('#btnPay').show();
                    }
                    $('#lblBasketTotal').html(ConvertToPersianNumbers(totalPrice) + " تومان");
                    html += "</table>";
                    $('#divBasketItems').html(html);
                }
            }
            else {//history
                var html = '<table style="width:100%; font-size:14px" border="1">';
                html += "<tr style='height:40px' align='center'><td>وضعیت</td><td>تاریخ خرید</td><td>قیمت</td><td>نام محصول</td><td>#</td></tr>";
                for (var i = 0 ; i < data.length; i++) {
                    html += "<tr  align='center' style='width:100%; height:40px; font-size:14px'>";
                    html += "<td>" + data[i].paid.replace("1", "در حال بررسی توسط ادمین سایت").replace("2", "ارسال شده توسط ادمین سایت") + "</td>";
                    html += "<td>" + ConvertToPersianNumbers(data[i].persianDate) + "</td>";
                    html += "<td>" + ConvertToPersianNumbers(data[i].price) + " تومان</td>";
                    html += "<td>" + ConvertToPersianNumbers(data[i].productName) + "</td>";
                    html += "<td>" + ConvertToPersianNumbers(i + 1).toString() + "</td>";
                    html += "</tr>";
                }
                html += '</table>';
                $('#divHistory').find('div').html(html);
                $('html, body').animate({
                    scrollTop: $('#divHistory').offset().top,
                });
            }
        }
    });
}

function DeleteProductFromBasket(guid) {
    var executer = new ServiceExecuter({
        methodName: "DeleteProductFromBasket", parameters: { guid: guid },
        onSuccess: function (data) {
            GetUserProductList("0");
            GetUserBasketItemCount();
        }
    });
}

function InsertUserProduct(product, price) {
    if (userID != "") {
        var executer = new ServiceExecuter({
            methodName: "InsertUserProduct", parameters: { userguid: userID, product: product, price: price },
            onSuccess: function (data) {
                alert("محصول با موفقیت به سبد خرید شما اضافه شد");
                GetUserBasketItemCount();
            }
        });
    }
    else {
        alert("برای خرید ابتدا باید لاگین کنید");
    }
}

function RegisterUser() {
    var executer = new ServiceExecuter({
        methodName: "RegisterShopUser", parameters: { name: $('#txtRegisterName').val(), family: $('#txtRegisterFamily').val(),
            gender: "1", email: $('#txtRegisterEmail').val(), password: $('#txtRegisterPassword').val(), mobile: $('#txtRegisterMobile').val(), address: $('#txtRegisterAddress').val() },
        onSuccess: function (data) {
            alert('شما با موفقیت در فروشگاه ثبت نام کردید');
        }
    });
}

var userID = "";
var userType = "";
function CheckLogin(email, password) {
    var executer = new ServiceExecuter({
        methodName: "Login", parameters: { email: email, password: password, shop: "1" },
        onSuccess: function (data) {
            if (data != "") {
                var a = data.split('|');
                userID = a[0];
                userType = a[1];

                if (typeof (Storage) !== "undefined") {
                    localStorage.setItem("enerfitUser", userID + "|" + userType);
                }

                location.href = "shop.html";
            }
            else {//login unsuccessful, alarm user
                $('#divLoginError').show();
            }
        }
    });
}

function GetUserBasketItemCount() {
    var executer = new ServiceExecuter({
        methodName: "GetUserBasketItemCount", parameters: { userguid: userID },
        onSuccess: function (data) {
            $('#lblNumUserBasketItems').html(ConvertToPersianNumbers(data));
        }
    });
}

function UserLoggedIn() {
    if (typeof (Storage) !== "undefined") {
        if (localStorage.getItem("enerfitUser")) {
            var y = localStorage.getItem("enerfitUser").split('|');
            userID = y[0];
            userType = y[1];
            GetUserBasketItemCount();
            $('#divBasketPreview').show();
            $('#btnRegister').hide();
            $('#btnUser').find('span').html('خروج');
            $('#btnPurchaseHistory').show();
            $('#btnUser').on('click', function () {
                userID = "";
                userType = "";
                if (typeof (Storage) !== "undefined") {
                    localStorage.removeItem("enerfitUser");
                }

                location.href = "shop.html";
            });
        }
        else {
            $('#btnPurchaseHistory').hide();
            $('#divBasketPreview').hide();
            $('#btnRegister').show();
            $('#btnRegister').on('click', function () {
                $('#modalRegister').show();
            });
            $('#btnUser').find('span').html('ورود');
            $('#btnUser').on('click', function () {
                $('#divLoginError').hide();
                $('#txtLoginEmail').val("");
                $('#txtLoginPassword').val("");
                $('#modalLogin').show();
            });
        }
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function ChangeMainImage(ev) {
    $('#imgProduct').attr('src', $(ev.target).attr('src'));
}

function ShowRelatedProducts(category, guid) {
    var executer = new ServiceExecuter({
        methodName: "GetProduct", parameters: { id: "", category: category, search: "", mode: "" },
        onSuccess: function (data) {
            MakeProductList(data, "divRelatedProducts", 3, guid);
        }
    });
}

function ShowProductPage(guid) {
    $('#divTopBanners').hide();
    $('.myBanners').hide();
    $('#divProductPage').show();

    $('html, body').animate({
        scrollTop: $('#divProductPage').offset().top,
    });

    $('#divProducts').hide();
    $('#divProducts2').hide();
    $('#divProducts3').hide();
    var executer = new ServiceExecuter({
        methodName: "GetProduct", parameters: { id: guid, category: "", search: "", mode: "" },
        onSuccess: function (data) {
            $('#lblProductTitle').html(ConvertToPersianNumbers(data[0].title));
            $('#imgProduct').attr('src', data[0].image);
            $('#lblProductPrice').html(ConvertToPersianNumbers(data[0].price) + " تومان");
            $('#lblProductDescription').html(data[0].description);
            $('#btnProductBuy').on('click', function () {
                InsertUserProduct(data[0].guid, data[0].price);
            });
            ShowRelatedProducts(data[0].category, data[0].guid);
            var images = [];
            if (data[0].image != "") {
                images.push(data[0].image);
            }
            if (data[0].image2 != "") {
                images.push(data[0].image2);
            }
            if (data[0].image3 != "") {
                images.push(data[0].image3);
            }
            if (data[0].image4 != "") {
                images.push(data[0].image4);
            }
            if (data[0].image5 != "") {
                images.push(data[0].image5);
            }
            if (data[0].image6 != "") {
                images.push(data[0].image6);
            }
            if (data[0].image7 != "") {
                images.push(data[0].image7);
            }
            if (data[0].image8 != "") {
                images.push(data[0].image8);
            }
            if (data[0].image9 != "") {
                images.push(data[0].image9);
            }
            if (data[0].image10 != "") {
                images.push(data[0].image10);
            }

            var imagesHTML = "";
            for (var i = 0 ; i < images.length; i++) {
                imagesHTML += '<div class="owl-item active" style="width: 141px; float:right"><div class="thumb-container">\
    <img class="thumb js-thumb  selected " onclick="ChangeMainImage(event)" data-image-medium-src="' + images[i] + '" data-image-large-src="' + images[i] + '" src="' + images[i] + '" alt="" title="" width="100" itemprop="image">\
    </div></div>';
            }
            $('#divProductImages').html(imagesHTML);

            var owl = $("#product .images-container .product-images");
            owl.owlCarousel({
                autoPlay: false,
                smartSpeed: 1000,
                autoplayHoverPause: true,
                nav: true,
                dots: false,
                responsive: {
                    0: {
                        items: 2,
                    },
                    480: {
                        items: 3,
                    },
                    768: {
                        items: 2,
                        nav: false,
                    },
                    992: {
                        items: 3,
                    },
                    1200: {
                        items: 3,
                    }
                }
            });

        }
    });
}

function LoadHeaderFooterSocial() {
    var executer = new ServiceExecuter({
        methodName: "LoadHeaderFooterSocial", parameters: "",
        onSuccess: function (data) {
            $('#divHeader1').html(data.headershop1);
            $('#divHeader2').html(data.headershop2);
            $('#divHeader3').html(data.headershop3);

            $('#divFooter1').html(data.footershop1);
            $('#divFooter2').html(data.footershop2);
            $('#divFooter3').html(data.footershop3);

            $('#telegram').attr('href', data.socialshop2);
            $('#instagram').attr('href', data.socialshop3);
            $('#facebook').attr('href', data.socialshop1);
            $('#aparat').attr('href', data.socialshop4);
        }
    });
}

$(document).ready(function () {
    UserLoggedIn();
    GetProductCategory("");
    LoadHeaderFooterSocial();
    $('#divProductPage').hide();
    $('#divHistory').hide();
    $('#divTopBanners').show();
    $('.myBanners').show();
    $('#tab_new_product').show();
    $('#tab_best_sellers').show();

    var cat = "";
    if (getParameterByName("category") != null) {
        cat = getParameterByName("category");
    }
    var mode = "";
    if (getParameterByName("mode") != null) {
        mode = getParameterByName("mode");
    }
    if (mode != "basket") {
        GetProduct(cat, "");
        $('#divCard').hide();
    }
    else if (mode == "basket") {
        $('#divCard').show();
        $('#divProducts').hide();
        $('#divProducts2').hide();
        $('#divProducts3').hide();

        GetUserProductList("0");
        $('#divTopBanners').hide();
        $('.myBanners').hide();
    }

    if (getParameterByName("history") != null) {
        $('#divTopBanners').hide();
        $('.myBanners').hide();
        $('#divHistory').show();
        $('#divProductPage').hide();
        $('#divProducts').hide();
        $('#divProducts2').hide();
        $('#divProducts3').hide();

        $('#divCard').hide();
        GetUserProductList("1");
    }

    if (userID != "") {
        if (getParameterByName("au")) {
            $('#divPurchaseResult').show();
            $('#hrefBackToShop').show();
            $('#divTopBanners').hide();
            $('.myBanners').hide();
            $('#divHistory').hide();
            $('#divProductPage').hide();
            $('#divProducts').hide();
            $('#divProducts2').hide();
            $('#divProducts3').hide();

            var executer = new ServiceExecuter({
                methodName: "GetShopResult", parameters: { au: getParameterByName("au") },
                onSuccess: function (data) {
                    $('#divCard').hide();
                    $('#divHistory').hide();
                    $('#divProductPage').hide();
                    $('#divProducts').hide();
                    $('#divProducts2').hide();
                    $('#divProducts3').hide();

                    var html = "<br/><br/>";
                    if (data.result == "ok") {
                        html += "<p style='font-size:18px'>شما با موفقیت محصول(ات) زیر را خریداری کرده اید</p>";
                        GetUserBasketItemCount();
                    }
                    else {
                        html += "<p style='font-size:18px'>مشکلی در خرید محصول(ات) زیر پیش آمد</p>";
                    }
                    html += "<table border='1' style='width:50%'>";
                    for (var i = 0 ; i < data.list.length; i++) {
                        html += "<tr align='center' style='width:100%; height:40px; font-size:14px'>";
                        html += "<td>" + ConvertToPersianNumbers(data.list[i].productName) + "</td>";
                        html += "<td>" + ConvertToPersianNumbers(data.list[i].price) + " تومان</td>";
                        html += "</tr>";
                    }
                    html += "</table>";
                    $('#divPurchaseResult').html(html);
                    $('html, body').animate({
                        scrollTop: $('#divPurchaseResult').offset().top,
                    });
                }
            });
        }
    }
});

function ConvertToPersianNumbers(val) {
    var persianNumber = val;
    persianNumber = val.toString().replace(/1/g, "۱").replace(/2/g, "۲").replace(/3/g, "۳").replace(/4/g, "۴").replace(/5/g, "۵").replace(/6/g, "۶").replace(/7/g, "۷").replace(/8/g, "۸").replace(/9/g, "۹").replace(/0/g, "۰");
    return persianNumber;
}