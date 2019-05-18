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

function GetSlides() {
    var executer = new ServiceExecuter({
        methodName: "GetSlides", parameters: "",
        onSuccess: function (data) {
            var html = "";
            for (var i = 0 ; i < data.length; i++) {
                html += '                            <li data-masterspeed="1000" data-saveperformance="off" data-slotamount="1" data-thumb="' + data[i].image + '" data-title="Awesome Title Here" data-transition="fade">\
                                <img alt="" data-bgfit="cover" data-bgposition="center top" data-bgrepeat="no-repeat" src="' + data[i].image + '"> <!--Slide Overlay-->\
                                <div class="slide-overlay">\
                                </div>\
                                <div class="tp-caption sft sfb tp-resizeme" data-easing="easeOutExpo" data-elementdelay="0.01" data-endeasing="Power4.easeIn" data-endelementdelay="0.3" data-endspeed="1200" data-hoffset="0" data-speed="1500" data-splitin="none" data-splitout="none" data-start="0" data-voffset="-70" data-x="center" data-y="center">\
                                    <div class="text-center">\
                                        <h3 class="c-main-title c-font-uppercase c-font-white text-center">'+ ConvertToPersianNumbers(data[i].title) + '</h3>\
                                    </div>\
                                </div>\
                            </li>\
                ';
            }
            $('#divSlides').html(html);

            if ($('.main-slider .tp-banner').length) {

                var MainSlider = $('.main-slider');
                var strtHeight = MainSlider.attr('data-start-height');
                var slideOverlay = "'" + MainSlider.attr('data-slide-overlay') + "'";

                $('.main-slider .tp-banner').show().revolution({
                    dottedOverlay: slideOverlay,
                    delay: 10000,
                    startwidth: 1200,
                    startheight: strtHeight,
                    hideThumbs: 600,

                    thumbWidth: 80,
                    thumbHeight: 50,
                    thumbAmount: 5,

                    navigationType: "bullet",
                    navigationArrows: "0",
                    navigationStyle: "preview3",

                    touchenabled: "on",
                    onHoverStop: "off",

                    swipe_velocity: 0.7,
                    swipe_min_touches: 1,
                    swipe_max_touches: 1,
                    drag_block_vertical: false,

                    parallax: "mouse",
                    parallaxBgFreeze: "on",
                    parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],

                    keyboardNavigation: "off",

                    navigationHAlign: "center",
                    navigationVAlign: "bottom",
                    navigationHOffset: 0,
                    navigationVOffset: 40,

                    soloArrowLeftHalign: "left",
                    soloArrowLeftValign: "center",
                    soloArrowLeftHOffset: 20,
                    soloArrowLeftVOffset: 20,

                    soloArrowRightHalign: "right",
                    soloArrowRightValign: "center",
                    soloArrowRightHOffset: 20,
                    soloArrowRightVOffset: 20,

                    shadow: 0,
                    fullWidth: "on",
                    fullScreen: "off",

                    spinner: "spinner4",

                    stopLoop: "off",
                    stopAfterLoops: -1,
                    stopAtSlide: -1,

                    shuffle: "off",

                    autoHeight: "off",
                    forceFullWidth: "on",

                    hideThumbsOnMobile: "on",
                    hideNavDelayOnMobile: 1500,
                    hideBulletsOnMobile: "on",
                    hideArrowsOnMobile: "on",
                    hideThumbsUnderResolution: 0,

                    hideSliderAtLimit: 0,
                    hideCaptionAtLimit: 0,
                    hideAllCaptionAtLilmit: 0,
                    startWithSlide: 0,
                    videoJsPath: "",
                    fullScreenOffsetContainer: ""
                });
                $('#divSlides li').each(function () {
                    var im = $(this).attr('data-thumb');
                    $(this).find('.slotholder').find('div').eq(0).css('background-image', 'url("' + im + '")');
                });
            }

        }
    });
}

function GetCoaches() {
    var executer = new ServiceExecuter({
        methodName: "GetCoaches", parameters: "",
        onSuccess: function (data) {
            var html = "";
            for (var i = 0 ; i < data.length; i++) {
                var coachEmail = "<a style='margin:10px' href='mailto:" + (data[i].email) + "' target='_blank' ><img style='height:16px' src='/img/email.png' /></a>";
                var coachTelegram = "<a style='margin:10px' href='https://telegram.me" + (data[i].telegram) + "' target='_blank' ><img style='height:16px' src='/img/telegram.png' /></a>";
                var coachInstagram = "<a style='margin:10px' href='https://www.instagram.com/' target='_blank' ><img style='height:16px' src='/img/instagram.png' /><a/>";
                html += '                        <div class="slide-demo col-sm-3 wow animate fadeInUp" data-wow-delay="0.2s" style="visibility: hidden; animation-delay: 0.2s; animation-name: none;">\
                            <figure class="imghvr-slide-up">\
                                <img alt="example-image" class="imgResponsive" src="'+ data[i].image + '">\
                                <figcaption class="slide-anmt">\
                                    <h3>'+ data[i].name + ' ' + data[i].family + '</h3>\
                                    <p>'+data[i].title+'</p>\
                                    <p style="direction:rtl;">' + coachEmail + coachInstagram + coachTelegram + '</p>\
                                    <ul style="display:none">\
                                        <li>\
                                            <a class="socicon-btn socicon-facebook tooltips" data-original-title="Facebook" href="#"></a>\
                                        </li>\
                                        <li>\
                                            <a class="socicon-btn socicon-linkedin tooltips" data-original-title="Linkedin" href="#"></a>\
                                        </li>\
                                    </ul>\
                                </figcaption>\
                                <a href="javascript:;"></a>\
                            </figure>\
                        </div>';
            }
            $('#divCoaches').html(html);
            $('#divTutorials').html(html);
        }
    });
}

function GetAbout() {
    var executer = new ServiceExecuter({
        methodName: "GetAbout", parameters: "",
        onSuccess: function (data) {
            $('#divAbout').find('.row').html(data);
            $('#divAbout').show();
        }
    });
}

function GetNews(id) {
    var executer = new ServiceExecuter({
        methodName: "GetNewsCategory", parameters: { id: "" },
        onSuccess: function (data) {
            var catList = data;
            var executer = new ServiceExecuter({
                methodName: "GetNews", parameters: { id: id },
                onSuccess: function (data) {
                    var html = "";
                    for (var i = 0 ; i < data.length; i++) {
                        var body = data[i].body;
                        if (body.length > 50) {
                            body = body.substring(0, 50) + " ...";
                        }
                        var cat = "";
                        for (var q = 0 ; q < catList.length; q++) {
                            if (catList[q].id == data[i].category) {
                                cat = catList[q].title;
                            }
                        }
                        html += '                            <div class="item">\
                                <div class="col-sm-12 wow animated fadeInLeft">\
                                    <div class="col-sm-6"><img alt="" style="width:255px; height:300px;" class="img-responsive" src="'+ data[i].image + '">\
                                    </div>\
                                    <div class="col-sm-6">\
                                        <h6 class="lts-abslt-tils">'+ ConvertToPersianNumbers(cat) + '</h6>\
                                        <div class="c-content-title-1">\
                                            <h4 class="headingWline" style="float:right"><a href="default.html?news='+ data[i].id + '">' + ConvertToPersianNumbers(data[i].title) + '</a></h4>\
                                        </div>\
                                        <p style="margin-top:160px">'+ ConvertToPersianNumbers(body) + '</p>\
                                        <div class="row">\
                                            <ul class="c-content-list-1 c-theme">\
                                                <li>نوشته شده در تاریخ ' + ConvertToPersianNumbers(data[i].persianDate) + '</li>\
                                            </ul>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                ';
                    }
                    $('#divLastNews').html(html);
                }
            });
        }
    });
}

function GetTutorials(id) {
    var executer = new ServiceExecuter({
        methodName: "GetTutorialCategory", parameters: { id: "" },
        onSuccess: function (data) {
            var catList = data;
            var executer = new ServiceExecuter({
                methodName: "GetTutorials", parameters: { id: id },
                onSuccess: function (data) {
                    var html = "";
                    for (var i = 0 ; i < data.length; i++) {
                        var body = data[i].body;
                        if (body.length > 50) {
                            body = body.substring(0, 50) + " ...";
                        }
                        var cat = "";
                        for (var q = 0 ; q < catList.length; q++) {
                            if (catList[q].id == data[i].category) {
                                cat = catList[q].title;
                            }
                        }
                        html += '                            <div class="item">\
                                <div class="col-sm-12 wow animated fadeInLeft">\
                                    <div class="col-sm-6"><img alt="" style="width:255px; height:300px;" class="img-responsive" src="'+ data[i].image + '">\
                                    </div>\
                                    <div class="col-sm-6">\
                                        <h6 class="lts-abslt-tils">'+ ConvertToPersianNumbers(cat) + '</h6>\
                                        <div class="c-content-title-1">\
                                            <h4 class="headingWline" style="float:right"><a href="default.html?tutorials=' + data[i].id + '">' + ConvertToPersianNumbers(data[i].title) + '</a></h4>\
                                        </div>\
                                        <p style="margin-top:160px">'+ ConvertToPersianNumbers(body) + '</p>\
                                        <div class="row">\
                                            <ul class="c-content-list-1 c-theme">\
                                                <li>نوشته شده در تاریخ ' + ConvertToPersianNumbers(data[i].persianDate) + '</li>\
                                            </ul>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                ';
                    }
                    $('#divTutorials').html(html);
                }
            });
        }
    });
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

function GetTestimonies(id) {
    var executer = new ServiceExecuter({
        methodName: "GetTestimonies", parameters: { id: id },
        onSuccess: function (data) {
            var html = "";
            for (var i = 0 ; i < data.length; i++) {
                if (data[i].body != "") {
                    html += '                            <div class="item">\
                                <div class="c-content-testimonial-4">\
                                    <div class="circle-tst text-center">\
                                        <i aria-hidden="true" class="fa fa-quote-right"></i>\
                                    </div>\
                                    <div class="c-content">\
                                        '+ ConvertToPersianNumbers(data[i].body) + '\
                                    </div>\
                                    <div class="c-person">\
                                        <div class="c-content-title-1">\
                                            <div class="c-line-center c-theme-bg">\
                                            </div>\
                                        </div>\
                                        <div class="c-person-detail">\
                                            <h4>' + ConvertToPersianNumbers(data[i].username) + '</h4>\
                                            <p style="display:none" class="c-position c-theme-font">CFO, Loop Inc</p>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                ';
                }
            }
            $('#owl-demo').html(html);
        }
    });
}

function ConvertToPersianNumbers(val) {
    var persianNumber = val;
    persianNumber = val.toString().replace(/1/g, "۱").replace(/2/g, "۲").replace(/3/g, "۳").replace(/4/g, "۴").replace(/5/g, "۵").replace(/6/g, "۶").replace(/7/g, "۷").replace(/8/g, "۸").replace(/9/g, "۹").replace(/0/g, "۰");
    return persianNumber;
}

function ShowTickets() {
    window.location = "home.html?userpage=usertickets";
}

function LoadHeaderFooterSocial() {
    var executer = new ServiceExecuter({
        methodName: "LoadHeaderFooterSocial", parameters: "",
        onSuccess: function (data) {
            $('#divHeader1').html(data.header1);
            $('#divHeader2').html(data.header2);
            $('#divHeader3').html(data.header3);

            $('#divFooter1').html(data.footer1);
            $('#divFooter2').html(data.footer2);
            $('#divFooter3').html(data.footer3);

            $('#telegram').attr('href', data.social2);
            $('#instagram').attr('href', data.social3);
            $('#facebook').attr('href', data.social1);
            $('#aparat').attr('href', data.social4);
        }
    });
}
var introducerCodeUsed = "";
function UserLoggedIn() {
    if (typeof (Storage) !== "undefined") {
        if (localStorage.getItem("enerfitUser")) {
            if (location.href.toLowerCase().indexOf("default.html") != -1 || location.href.toLowerCase().indexOf("html") == -1) {
                window.location = "home.html";
            }
            else {

                var y = localStorage.getItem("enerfitUser").split('|');
                userID = y[0];
                userType = y[1];


                if (userType == "user") {//user menus
                    $('#divUserMenu').show();
                    $('#divCoachMenu').hide();
                    $('#navbarDropdownMenuLink').show();

                    var executer = new ServiceExecuter({
                        methodName: "GetNumCoachTickets", parameters: { userguid: userID },
                        onSuccess: function (data) {
                            $('#lblNumTickets').html(ConvertToPersianNumbers(data));
                        }
                    });

                }
                else {//coach menus
                    $('#divUserMenu').hide();
                    $('#divCoachMenu').show();
                    $('#navbarDropdownMenuLink').hide();
                }
                var executer = new ServiceExecuter({
                    methodName: "GetUserInfo", parameters: { userguid: userID, usertype: userType },
                    onSuccess: function (data) {
                        introducerCodeUsed = data[0].introducerCodeUsed;
                        $('#lblUsername').html(data[0].name + " " + data[0].family);
                        $('#imgUserIcon').attr('src', data[0].image2);
                        if (userType == "coach") {
                            $('#imgUserIcon').show();
                        }
                        else {
                            $('#imgUserIcon').hide();
                        }
                    }
                });
            }
        }
    }
}

var userID = "";
var userType = "";
function CheckLogin(email, password) {
    var executer = new ServiceExecuter({
        methodName: "Login", parameters: { email: email, password: password, shop: "0" },
        onSuccess: function (data) {
            if (data != "") {
                var a = data.split('|');
                userID = a[0];
                userType = a[1];

                if (typeof (Storage) !== "undefined") {
                    localStorage.setItem("enerfitUser", userID + "|" + userType);
                }

                location.href = "home.html";
            }
            else {//login unsuccessful, alarm user
                $('#divLoginError').show();
            }
        }
    });
}

function GetNewsList(id) {
    var executer = new ServiceExecuter({
        methodName: "GetNews", parameters: { id: id },
        onSuccess: function (data) {
            var html = "";
            if (id == "") {
                for (var i = 0 ; i < data.length; i++) {
                    html += "<a  style='font-size:18pt; padding: 18px; width:100%' href='default.html?news=" + data[i].id + "'><b>" + ConvertToPersianNumbers(data[i].title) +
                        "</b><small style='font-size:9pt'> (نوشته شده در تاریخ " + ConvertToPersianNumbers(data[i].persianDate) + ") </small><img style='max-height:60px; float:left' src='" + data[i].image + "' /></a>";
                    html += "<hr/>";
                }
            }
            else {
                var img = "";
                if (data[0].image != "") {
                    img = "<img style='float:right; max-height:250px; margin:10px' src='" + data[0].image + "' />";
                }
                html += "<p style='float:left;'><a href='default.html?news=all'>مشاهده لیست اخبار</a></p>";
                html += "<p><b style='font-size:18pt;  padding-bottom:15px;'>" + ConvertToPersianNumbers(data[0].title) + "</b></p>";
                html += "<p style='font-size:10px; padding-bottom:15px;'>نوشته شده در تاریخ " + ConvertToPersianNumbers(data[0].persianDate) + "</p>";
                html += "<p style=' text-align:justified; line-height:250%; direction:rtl;'>" + img + ConvertToPersianNumbers(data[0].body) + "</p>";
            }
            $('#divNewsList').find('.row').html(html);
        }
    });
}

function GetCoachTicket(guid) {
    if (userID == "" || userType != "user")
        return;
    $('#divUserTickets').show();
    var executer = new ServiceExecuter({
        methodName: "GetCoachTicket", parameters: { userGuid: userID, guid: guid },
        onSuccess: function (data) {
            if (guid == "") {
                var html = "<table style='width:100%; font-size:11pt'>";
                for (var i = 0 ; i < data.length; i++) {
                    html += "<tr style='width:100%'>";
                    html += "<td>" + ConvertToPersianNumbers(data[i].subject) + "</td>";
                    html += "<td>ارسال شده در تاریخ: " + ConvertToPersianNumbers(data[i].persianDate) + "</td>";
                    html += "<td>از طرف: " + data[i].coachName + "</td>";
                    html += "<td><button onclick=GetCoachTicket('" + data[i].guid + "') class='btn btn-rose btn-round' type='button' >مشاهده پیام</button></td>";
                    html += "</tr>";
                }
                html += "</table>";
                $('#divUserTickets').html(html);
            }
            else {
                var html = "<p style='float:left; cursor:pointer' onclick=GetCoachTicket('')>مشاهده فهرست پیام ها</p><br/><br/>";
                html += "<span style='float:right; font-size:12pt'>موضوع: " + ConvertToPersianNumbers(data[0].subject) + "</span><br/><br/>";
                html += "<span style='float:right; font-size:12pt'>ارسال کننده: " + ConvertToPersianNumbers(data[0].coachName) + "</span><br/><br/>";
                html += "<span style='float:right; font-size:12pt'>تاریخ ارسال: " + ConvertToPersianNumbers(data[0].persianDate) + "</span><br/><br/>";
                html += "<span style='float:right; font-size:12pt'>متن: " + ConvertToPersianNumbers(data[0].body) + "</span>";
                $('#divUserTickets').html(html);
            }
        }
    });
}

function InsertCoachTicket() {
    var executer = new ServiceExecuter({
        methodName: "InsertCoachTicket", parameters: { coachGuid: userID, userGuid: $('#cmbCoachTicketUserList :selected').val(), subject: $('#txtCoachTicketSubject').val(), body: $('#txtCoachTicketBody').val() },
        onSuccess: function (data) {
            alert('پیام شما با موفقیت ارسال شد');
        }
    });
}

function GetSpecialNewsList(id) {
    var executer = new ServiceExecuter({
        methodName: "GetSpecialNews", parameters: { id: id },
        onSuccess: function (data) {
            var html = "";
            if (id == "") {
                for (var i = 0 ; i < data.length; i++) {
                    html += "<a  style='font-size:18pt; padding: 18px; width:100%' href='default.html?usernews=" + data[i].id + "'><b>" + (data[i].title) +
                        "</b><small style='font-size:9pt'> (نوشته شده در تاریخ " + ConvertToPersianNumbers(data[i].persianDate) + ") </small><img style='max-height:60px; float:left' src='" + data[i].image + "' /></a>";
                    html += "<hr/>";
                }
            }
            else {
                var img = "";
                if (data[0].image != "") {
                    img = "<img style='float:right; max-height:250px; margin:10px' src='" + data[0].image + "' />";
                }
                html += "<p style='float:left;'><a href='default.html?usernews=all'>مشاهده لیست اطلاعیه ها</a></p>";
                html += "<p><b style='font-size:18pt;  padding-bottom:15px;'>" + ConvertToPersianNumbers(data[0].title) + "</b></p>";
                html += "<p style='font-size:10px; padding-bottom:15px;'>نوشته شده در تاریخ " + ConvertToPersianNumbers(data[0].persianDate) + "</p>";
                html += "<p style=' text-align:justified; line-height:250%; direction:rtl;'>" + img + ConvertToPersianNumbers(data[0].body) + "</p>";
            }
            $('#divNewsList').find('.row').html(html);
        }
    });
}

function GetTutorialsList(id) {
    var executer = new ServiceExecuter({
        methodName: "GetTutorialCategory", parameters: { id: ""},
        onSuccess: function (data) {
            var catList = data;
            var executer = new ServiceExecuter({
                methodName: "GetTutorials", parameters: { id: id },
                onSuccess: function (data) {
                    var html = "";
                    if (id == "") {
                        for (var i = 0 ; i < data.length; i++) {
                            var cat = "";
                            for (var q = 0 ; q < catList.length; q++) {
                                if (catList[q].id == data[i].category) {
                                    cat = catList[q].title;
                                }
                            }
                            html += "<p style='font-size:10pt'>دسته بندی " + ConvertToPersianNumbers(cat) + "</p>";
                            html += "<a  style='font-size:18pt; padding: 18px; width:100%' href='default.html?tutorials=" + data[i].id + "'><b>" + ConvertToPersianNumbers(data[i].title) +
                                "</b><small style='font-size:9pt'> (نوشته شده در تاریخ " + ConvertToPersianNumbers(data[i].persianDate) + ") </small><img style='max-height:60px; float:left' src='" + data[i].image + "' /></a>";
                            html += "<hr/>";
                        }
                    }
                    else {
                        var img = "";
                        var cat = "";
                        for (var q = 0 ; q < catList.length; q++) {
                            if (catList[q].id == data[0].category) {
                                cat = catList[q].title;
                            }
                        }
                        if (data[0].image != "") {
                            img = "<img style='float:right; max-height:250px; margin:10px' src='" + data[0].image + "' />";
                        }
                        html += "<p style='float:left;'><a href='default.html?tutorials=all'>مشاهده لیست مطالب آموزشی</a></p>";
                        html += "<p><b style='font-size:18pt;  padding-bottom:15px;'>" + ConvertToPersianNumbers(data[0].title) + "</b></p>";
                        html += "<p style='font-size:10px; padding-bottom:15px;'>دسته بندی " + cat + "</p>";
                        html += "<p style='font-size:10px; padding-bottom:15px;'>نوشته شده در تاریخ " + ConvertToPersianNumbers(data[0].persianDate) + "</p>";
                        html += "<p style=' text-align:justified; line-height:250%; direction:rtl;'>" + img + ConvertToPersianNumbers(data[0].body) + "</p>";
                    }
                    $('#divTutorialsList').find('.row').html(html);
                }
            });
        }
    });
}

function ClassSelected(guid, userHasClass) {
    if (userHasClass == 1) {
        alert('شما پیشتر این کلاس را خریداری کرده اید');
        return;
    }
    if (introducerCodeUsed == "") {
        $('#lblIntroducerCode').show();
        $('#txtIntroducerCode').show();
    }
    else {
        $('#lblIntroducerCode').hide();
        $('#txtIntroducerCode').hide();
    }
    var price = 100;
    var desc = "";
    var executer = new ServiceExecuter({
        methodName: "GetSchedule", parameters: { id: guid, user: "", grp: "" },
        onSuccess: function (data) {
            $('#lblSchedule1').html('رشته: ' + ConvertToPersianNumbers(data[0].fieldName));
            $('#lblSchedule2').html('روز ' + data[0].day.replace("1", "شنبه").replace("2", "یکشنبه").replace("3", "دوشنبه").replace("4", "سه شنبه").replace("5", "چهارشنبه").replace("6", "پنج شنبه").replace("7", "جمعه"));
            $('#lblSchedule3').html('زمان ' + ConvertToPersianNumbers(data[0].time));
            $('#lblSchedule4').html('قیمت ' + ConvertToPersianNumbers(data[0].price) + " تومان ");
            price = data[0].price;
            desc = 'رشته ' + ConvertToPersianNumbers(data[0].fieldName);
        }
    });
    $('#btnPayClass').on('click', function () {
        var executer = new ServiceExecuter({
            methodName: "DoPayment", parameters: { price: price, desc: desc, userguid: userID, type: "class", _class: guid, _c: $('#txtIntroducerCode').val() },
            onSuccess: function (data) {
                if (data != "error") {
                    location.href = data;
                }
                else {
                    alert('مشکلی در اتصال به بانک پیش آمد، لطفاً مجدد تلاش نمایید');
                }
            }
        });
    });
    $('#divClassPurchase').show();
}

function GetSchedule() {
    var _user = "";
    var _grp = "";
    if (userID != "" && userType == "user") {
        _user = userID;
    }
    else {
        _grp = getParameterByName("classlistview");
        $('#lblClassTitle').html('برنامه کلاس های' + " " + _grp.replace('woman', 'بانوان').replace('man', 'آقایان').replace('child', 'کودکان و نوجوانان'));
    }

    var executer = new ServiceExecuter({
        methodName: "GetSchedule", parameters: { id: "", user: _user, grp: _grp },
        onSuccess: function (data) {
            var html = "";
            var htmlTBL = "";
            var currentGuids = [];
            for (var d = 7 ; d > 0; d--) {
                var day = d.toString().replace("1", "شنبه").replace("2", "یکشنبه").replace("3", "دوشنبه").replace("4", "سه شنبه").replace("5", "چهارشنبه").replace("6", "پنج شنبه").replace("7", "جمعه");
                html += '                                    <li class="class-row">\
                                        <div class="class-day">'+ day + '</div>                ';
                for (var i = 0 ; i < data.length; i++) {
                    if (data[i].day == d || data[i].day2 == d || data[i].day3 == d || data[i].day4 == d) {
                        var time = "";
                        if (data[i].day == d) {
                            time = ConvertToPersianNumbers(data[i].time);
                        }
                        else if (data[i].day2 == d) {
                            time = ConvertToPersianNumbers(data[i].time2);
                        }
                        else if (data[i].day3 == d) {
                            time = ConvertToPersianNumbers(data[i].time3);
                        }
                        else if (data[i].day4 == d) {
                            time = ConvertToPersianNumbers(data[i].time4);
                        }
                        html += '                                        <div class="single-class">\
                                            <div class="single-class-inner">\
                                                <div class="class-img"><img alt="" class="" style="border-radius:50%" src="'+ data[i].coachImage + '">\
                                                </div>\
                                                <div style="color:#FF4500" class="caption">\
                                                    <h6 style="color:#FF4500" class="title">' + ConvertToPersianNumbers(data[i].fieldName) + '</h6>\
                                                    <p  style="color:#FF4500" class="class-hours"><i style="color:#FF4500" class="fa fa-clock-o"></i> ' + time + '</p>\
                                                    <p  style="color:#FF4500" class="class-room"><i style="color:#FF4500" class="fa fa-map-marker"></i>' + ConvertToPersianNumbers(data[i].room) + '</p>\
                                                </div>\
                                            </div>\
                                        </div>                        ';
                        if (currentGuids.indexOf(data[i].guid) == -1) {
                            var endDate = "<td></td>";
                            htmlTBL += "<tr style='width:100%; height:40px'>";
                            if (data[i].userHasClass == 1) {
                                htmlTBL += "<td align='left'>ثبت نام شده</td>";
                                endDate = "<td>تاریخ اتمام: " + data[i].endDate + "</td>";
                            }
                            else {
                                htmlTBL += "<td align='left'><button class='btn btn-rose btn-round' type='button' style='font-size:10pt; direction:rtl;' onclick=ClassSelected('" + data[i].guid + '","' +
                                    data[i].userHasClass + "') >ثبت نام (تومان " + ConvertToPersianNumbers(data[i].price) + ")</button></td>";
                            }
                            var classDays = "";
                            classDays = data[i].day.toString().replace("1", "شنبه").replace("2", "یکشنبه").replace("3", "دوشنبه").replace("4", "سه شنبه").replace("5", "چهارشنبه").replace("6", "پنج شنبه").replace("7", "جمعه");
                            if (data[i].day2 != "") {
                                classDays += "، " + data[i].day2.toString().replace("1", "شنبه").replace("2", "یکشنبه").replace("3", "دوشنبه").replace("4", "سه شنبه").replace("5", "چهارشنبه").replace("6", "پنج شنبه").replace("7", "جمعه");
                            }
                            if (data[i].day3 != "") {
                                classDays += "، " + data[i].day3.toString().replace("1", "شنبه").replace("2", "یکشنبه").replace("3", "دوشنبه").replace("4", "سه شنبه").replace("5", "چهارشنبه").replace("6", "پنج شنبه").replace("7", "جمعه");
                            }
                            if (data[i].day4 != "") {
                                classDays += "، " + data[i].day4.toString().replace("1", "شنبه").replace("2", "یکشنبه").replace("3", "دوشنبه").replace("4", "سه شنبه").replace("5", "چهارشنبه").replace("6", "پنج شنبه").replace("7", "جمعه");
                            }
                            classDays += "، ساعت " + ConvertToPersianNumbers(data[i].time);
                            currentGuids.push(data[i].guid);
                            htmlTBL += endDate;
                            htmlTBL += "<td>روزهای برگزاری: " + classDays + "</td>";
                            htmlTBL += "<td>مربی: " + data[i].coachName + "</td>";
                            htmlTBL += "<td align='right'>دوره: " + ConvertToPersianNumbers(data[i].fieldName) + "</td>";
                            htmlTBL += "</tr>";
                        }
                    }
                }
            }
            $('#divSchedule').html(html);
            if (userID != "" && userType == "user") {
                $('#tblSchedule').html(htmlTBL);
            }
            else {
                $('#tblSchedule').html("");
            }
        }
    });
}

function UpsertFoodRegime() {
    var body = [];
    $('#tblFoodRegime textarea').each(function () {
        body.push($(this).val());
    });
    var _userid = $('#cmbFoodRegimeUserList :selected').val();
    var executer = new ServiceExecuter({
        methodName: "UpsertFoodRegime", parameters: { coach: userID, userid: _userid, body: JSON.stringify(body) },
        onSuccess: function (data) {
            alert('اطلاعات رژیم غذایی با موفقیت ذخیره شد');
        }
    });
}



function UploadBodyTest() {
    $('#fileUpload').click();
}

function GetBodyTest(id) {
    var _u = "";
    var _c = "";
    if (userType == "user") {
        _u = userID;
    }
    else {
        _c = userID;
    }
    var executer = new ServiceExecuter({
        methodName: "GetBodyTest", parameters: { userid: _u, id: id, coachid: _c },
        onSuccess: function (data) {
            var html = "<p style='float:right'>تاریخچه اطلاعات " + userType.replace("user", "دریافت").replace("coach", "ارسال") + " شده</p><table style='width:100%; direction:ltr; '>";
            for (var i = 0 ; i < data.length; i++) {
                var x = " از " + data[i].coachName;
                var imgStyle = "";
                if (userType == "coach") {
                    x = " به " + data[i].userName;
                    imgStyle = " display:none; ";
                }
                var _comment = "";
                if (data[i].comment != "") {
                    _comment = " (" + data[i].comment + ")";
                }
                html += "<tr style='width:100%; font-size:13pt; height:60px'>\
                    <td align='left'><img src='" + data[i].coachImage + "' style='border-radius:50px; height:50px; " + imgStyle + "' /></td>\
                    <td align='left'><span >" + userType.replace("user", "دریافت").replace("coach", "ارسال") + " شده در تاریخ " + ConvertToPersianNumbers(data[i].persianDate) + x + "</span></td>\
                    <td align='right' style='cursor:pointer'><a style='float:right' target='_blank' href='" + (data[i].body) + "'>دانلود تست بدنی " + _comment + "</a></td>\
                    </tr>";
            }
            html += "</table>";
            $('#divBodyTestUserHistory').html(html);
        }
    });
}

$(document).on('change', '#fileUpload', function () {
    var fileInput = $('#fileUpload');
    var fileData = fileInput.prop("files")[0];
    var formData = new window.FormData();                  // Creating object of FormData class
    formData.append("file", fileData); // Appending parameter named file with properties of file_field to form_data
    var _userid = $('#cmbBodyTestUserList :selected').val();
    $.ajax({
        url: '/FileUploader.ashx?userid=' + _userid + "&coachid=" + userID + "&comment=" + $('#txtBodyComment').val(),
        data: formData,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function (data) {
            alert('فایل تست بدنی با موفقیت آپلود شد');
        },
        error: function (errorData) {
            console.log(errorData);
        }
    });
});


function UpsertExercisePlan() {
    var body = [];
    var body2 = [];
    var body3 = [];
    var body4 = [];
    var body5 = [];
    var body6 = [];
    var body7 = [];
    $('#tblExercisePlan textarea').each(function () {
        body.push($(this).val());
    });
    $('#tblExercisePlan2 textarea').each(function () {
        body2.push($(this).val());
    });
    $('#tblExercisePlan3 textarea').each(function () {
        body3.push($(this).val());
    });
    $('#tblExercisePlan4 textarea').each(function () {
        body4.push($(this).val());
    });
    $('#tblExercisePlan5 textarea').each(function () {
        body5.push($(this).val());
    });
    $('#tblExercisePlan6 textarea').each(function () {
        body6.push($(this).val());
    });
    $('#tblExercisePlan7 textarea').each(function () {
        body7.push($(this).val());
    });

    var _userid = $('#cmbExercisePlanUserList :selected').val();
    var executer = new ServiceExecuter({
        methodName: "UpsertExercisePlan", parameters: {
            coachid: userID, userid: _userid, body: JSON.stringify(body), body2: JSON.stringify(body2),
            body3: JSON.stringify(body3), body4: JSON.stringify(body4), body5: JSON.stringify(body5), body6: JSON.stringify(body6), body7: JSON.stringify(body7)
        },
        onSuccess: function (data) {
            alert('اطلاعات برنامه تمرینی با موفقیت ذخیره شد');
        }
    });
}

function UpsertSportInfo() {
    var body = [];
    $('#tblSportInfo textarea').each(function () {
        body.push($(this).val());
    });
    var _userid = $('#cmbSportInfoUserList :selected').val();
    var executer = new ServiceExecuter({
        methodName: "UpsertSportInfo", parameters: { coachid: userID, userid: _userid, body: JSON.stringify(body) },
        onSuccess: function (data) {
            alert('اطلاعات شناسنامه ورزشی با موفقیت ذخیره شد');
        }
    });
}

function GetExercisePlan(id) {
    var _u = "";
    var _c = "";
    if (userType == "user") {
        _u = userID;
    }
    else {
        _c = userID;
    }
    var executer = new ServiceExecuter({
        methodName: "GetExercisePlan", parameters: { userid: _u, id: id, coachid: _c },
        onSuccess: function (data) {
            if (id != "") {
                $('#tblExercisePlan').show();
                var body = JSON.parse(data[0].body);
                var body2 = JSON.parse(data[0].body2);
                var body3 = JSON.parse(data[0].body3);
                var body4 = JSON.parse(data[0].body4);
                var body5 = JSON.parse(data[0].body5);
                var body6 = JSON.parse(data[0].body6);
                var body7 = JSON.parse(data[0].body7);
                $('#tblExercisePlan textarea').each(function (index) {
                    $(this).val(ConvertToPersianNumbers(body[index]));
                });
                $('#tblExercisePlan2 textarea').each(function (index) {
                    $(this).val(ConvertToPersianNumbers(body2[index]));
                });
                $('#tblExercisePlan3 textarea').each(function (index) {
                    $(this).val(ConvertToPersianNumbers(body3[index]));
                });
                $('#tblExercisePlan4 textarea').each(function (index) {
                    $(this).val(ConvertToPersianNumbers(body4[index]));
                });
                $('#tblExercisePlan5 textarea').each(function (index) {
                    $(this).val(ConvertToPersianNumbers(body5[index]));
                });
                $('#tblExercisePlan6 textarea').each(function (index) {
                    $(this).val(ConvertToPersianNumbers(body6[index]));
                });
                $('#tblExercisePlan7 textarea').each(function (index) {
                    $(this).val(ConvertToPersianNumbers(body7[index]));
                });

                $('#tblExercisePlan').hide();
                $('#tblExercisePlan2').hide();
                $('#tblExercisePlan3').hide();
                $('#tblExercisePlan4').hide();
                $('#tblExercisePlan5').hide();
                $('#tblExercisePlan6').hide();
                $('#tblExercisePlan7').hide();

                $('#btnExercisePlan').show();
                $('#btnExercisePlan2').show();
                $('#btnExercisePlan3').show();
                $('#btnExercisePlan4').show();
                $('#btnExercisePlan5').show();
                $('#btnExercisePlan6').show();
                $('#btnExercisePlan7').show();
            }
            else {
                $('#tblExercisePlan').hide();
                $('#tblExercisePlan2').hide();
                $('#tblExercisePlan3').hide();
                $('#tblExercisePlan4').hide();
                $('#tblExercisePlan5').hide();
                $('#tblExercisePlan6').hide();
                $('#tblExercisePlan7').hide();

                $('#btnExercisePlan').hide();
                $('#btnExercisePlan2').hide();
                $('#btnExercisePlan3').hide();
                $('#btnExercisePlan4').hide();
                $('#btnExercisePlan5').hide();
                $('#btnExercisePlan6').hide();
                $('#btnExercisePlan7').hide();

                var html = "<p style='float:right'>تاریخچه اطلاعات " + userType.replace("user", "دریافت").replace("coach", "ارسال") + " شده</p><table style='width:100%'>";
                for (var i = 0 ; i < data.length; i++) {

                    var x = " از " + data[i].coachName;
                    var imgStyle = "";
                    if (userType == "coach") {
                        x = " به " + data[i].userName;
                        imgStyle = " display:none; ";
                    }

                    html += "<tr style='width:100%; font-size:13pt; height:60px'>\
                    <td align='right' style='cursor:pointer'><span onclick=GetExercisePlan('" + data[i].id + "')>مشاهده برنامه تمرینی</span></td>\
                    <td align='left'><span >" + userType.replace("user", "دریافت").replace("coach", "ارسال") + " شده در تاریخ " + ConvertToPersianNumbers(data[i].persianDate) + x + "</span></td>\
                    <td align='left'><img src='" + data[i].coachImage + "' style='border-radius:50px; height:50px; " + imgStyle + "' /></td>\
                    </tr>";
                }
                html += "</table>";
                if (userType == "coach") {
                    $('#tblExercisePlan').hide();
                    $('#tblExercisePlan2').hide();
                    $('#tblExercisePlan3').hide();
                    $('#tblExercisePlan4').hide();
                    $('#tblExercisePlan5').hide();
                    $('#tblExercisePlan6').hide();
                    $('#tblExercisePlan7').hide();

                    $('#btnExercisePlan').show();
                    $('#btnExercisePlan2').show();
                    $('#btnExercisePlan3').show();
                    $('#btnExercisePlan4').show();
                    $('#btnExercisePlan5').show();
                    $('#btnExercisePlan6').show();
                    $('#btnExercisePlan7').show();
                }
                else {
                    $('#tblExercisePlan').hide();
                    $('#tblExercisePlan2').hide();
                    $('#tblExercisePlan3').hide();
                    $('#tblExercisePlan4').hide();
                    $('#tblExercisePlan5').hide();
                    $('#tblExercisePlan6').hide();
                    $('#tblExercisePlan7').hide();

                    $('#btnExercisePlan').hide();
                    $('#btnExercisePlan2').hide();
                    $('#btnExercisePlan3').hide();
                    $('#btnExercisePlan4').hide();
                    $('#btnExercisePlan5').hide();
                    $('#btnExercisePlan6').hide();
                    $('#btnExercisePlan7').hide();
                }
                $('#divExercisePlanList').show();
                $('#divExercisePlanList').html(html);
            }
        }
    });
}

function GetSportInfo(id) {
    var _u = "";
    var _c = "";
    if (userType == "user") {
        _u = userID;
    }
    else {
        _c = userID;
    }

    var executer = new ServiceExecuter({
        methodName: "GetSportInfo", parameters: { userid: _u, id: id, coachid: _c },
        onSuccess: function (data) {
            if (id != "") {
                $('#tblSportInfo').show();
                var body = JSON.parse(data[0].body);
                $('#tblSportInfo textarea').each(function (index) {
                    $(this).val(ConvertToPersianNumbers(body[index]));
                });
            }
            else {
                var html = "<p style='float:right'>تاریخچه اطلاعات " + userType.replace("user", "دریافت").replace("coach", "ارسال") + " شده</p><table style='width:100%'>";
                for (var i = 0 ; i < data.length; i++) {
                    var x = " از " + data[i].coachName;
                    var imgStyle = "";
                    if (userType == "coach") {
                        x = " به " + data[i].userName;
                        imgStyle = " display:none; ";
                    }
                    html += "<tr style='width:100%; font-size:13pt; height:60px'>\
                    <td align='right' style='cursor:pointer'><span onclick=GetSportInfo('" + data[i].id + "')>مشاهده شناسنامه ورزشی</span></td>\
                    <td align='left'><span >" + userType.replace("user", "دریافت").replace("coach", "ارسال") + " شده در تاریخ " + ConvertToPersianNumbers(data[i].persianDate) + x + "</span></td>\
                    <td align='left'><img src='" + data[i].coachImage + "' style='border-radius:50px; height:50px; " + imgStyle + "' /></td>\
                    </tr>";
                }
                html += "</table>";
                if (userType == "coach") {
                    $('#tblSportInfo').show();
                }
                else {
                    $('#tblSportInfo').hide();
                }
                $('#divSportInfoList').show();
                $('#divSportInfoList').html(html);
            }
        }
    });
}

function GetCoachUsers() {
    var executer = new ServiceExecuter({
        methodName: "GetCoachUsers", parameters: { coach: userID },
        onSuccess: function (data) {
            var html = "";
            for (var i = 0 ; i < data.length; i++) {
                html += "<option value='" + data[i].guid + "'>" + data[i].namefamily + "</option>";
            }
            $('#cmbBodyTestUserList').html(html);
            $('#cmbExercisePlanUserList').html(html);
            $('#cmbSportInfoUserList').html(html);
            $('#cmbFoodRegimeUserList').html(html);
            $('#cmbCoachTicketUserList').html(html);
        }
    });
}

function GetFoodRegime(id) {
    var _u = "";
    var _c = "";
    if (userType == "user") {
        _u = userID;
    }
    else {
        _c = userID;
    }
    var executer = new ServiceExecuter({
        methodName: "GetFoodRegime", parameters: { userid: _u, id: id, coachid: _c },
        onSuccess: function (data) {
            if (id != "") {
                $('#tblFoodRegime').show();
                var body = JSON.parse(data[0].body);
                $('#tblFoodRegime textarea').each(function (index) {
                    $(this).val(ConvertToPersianNumbers(body[index]));
                });
            }
            else {
                var html = "<p style='float:right'>تاریخچه اطلاعات " + userType.replace("user", "دریافت").replace("coach", "ارسال") + " شده</p><table style='width:100%; direction:ltr;'>";
                for (var i = 0 ; i < data.length; i++) {
                    var x = " از " + data[i].coachName;
                    var imgStyle = "";
                    if (userType == "coach") {
                        x = " به " + data[i].userName;
                        imgStyle = " display:none; ";
                    }
                    html += "<tr style='width:100%; font-size:13pt; height:60px'>\
                    <td style='cursor:pointer'><button class='btn btn-rose btn-round' type='button'  onclick=GetFoodRegime('" + data[i].id + "')>مشاهده رژیم غذایی</button></td>\
                    <td align='right'><span >" + userType.replace("user", "دریافت").replace("coach", "ارسال") + " شده در تاریخ " + ConvertToPersianNumbers(data[i].persianDate) + x + "</span></td>\
                    <td ><img src='" + data[i].coachImage + "' style='border-radius:50px; height:50px; " + imgStyle + "' /></td>\
                    </tr>";
                }
                html += "</table>";
                $('#divFoodRegimeList').show();
                $('#divFoodRegimeList').html(html);
            }
        }
    });
}

function Logout() {
    userID = "";
    userType = "";
    if (typeof (Storage) !== "undefined") {
        localStorage.removeItem("enerfitUser");
    }

    location.href = "default.html";
}

function ShowLogin() {
    if (userID == "") {
        $('#divLoginError').hide();
        $('#txtLoginEmail').val("");
        $('#txtLoginPassword').val("");
        $('#modalLogin').show();
    }
    else {
        userID = "";
        userType = "";
        if (typeof (Storage) !== "undefined") {
            localStorage.removeItem("enerfitUser");
        }

        location.href = "home.html";
    }
}

function GetUserClassList() {
    var executer = new ServiceExecuter({
        methodName: "GetUserClassList", parameters: { user: userID },
        onSuccess: function (data) {
            var html = "<p style='float:right; font-size:16pt'>فهرست کلاسهای شما در حال حاضر به شرح ذیل میباشد:</p><br /><br /><br /><br />";
            html += "<table style='width:100%; font-size:16pt'>";
            for (var i = 0 ; i < data.length; i++) {
                html += "<tr style='width:100%;' align='right'>";
                html += "<td align='right'>نام دوره: " + ConvertToPersianNumbers(data[i].name) + "</td>";
                html += "<td>نام مربی: " + data[i].coach + "</td>";
                html += "<td align='left'>ثبت نام شده در تاریخ " + ConvertToPersianNumbers(data[i].persianDate) + "</td>";
                html += "</tr>";
            }
            html += "</table>";
            $('#divClassList').html(html);
        }
    });
}

function CloseLogin() {
    $('#divLoginError').hide();
    $('#modalLogin').hide(200);
}

function EnterIntroducerCode() {
    if (userID == "" || userType != "user")
        return;
    var executer = new ServiceExecuter({
        methodName: "EnterIntroducerCode", parameters: { guid: userID, code: $('#txtIntroducerCode').val() },
        onSuccess: function (data) {
            if (data == "") {
                alert('کد معرف شما با موفقیت وارد شد');
            }
            else if (data == "duplicate") {
                alert('شما پیشتر کد معرف را وارد کرده اید ');
            }
            else if (data == "wrong") {
                alert('کد معرف وارد شده اشتباه میباشد');
            }
        }
    });
}

function GetCoachUserListPage() {
    if (userID == "" || userType != "coach")
        return;
    var executer = new ServiceExecuter({
        methodName: "GetCoachUserListPage", parameters: { coach: userID },
        onSuccess: function (data) {
            var html = "<p style='float:right; font-size:12pt'>فهرست کاربران شما در حال حاضر به شرح ذیل میباشد:</p><br /><br /><br /><br />";
            html += "<table style='width:100%; font-size:12pt'>";
            for (var i = 0 ; i < data.length; i++) {
                html += "<tr style='width:100%;' align='right'>";
                html += "<td align='right'>نام دوره: " + data[i].name + "</td>";
                html += "<td>نام کاربر: " + data[i].userName + "</td>";
                html += "<td align='left'>ثبت نام شده در تاریخ " + ConvertToPersianNumbers(data[i].persianDate) + "</td>";
                html += "</tr>";
            }
            html += "</table>";
            $('#divCoachUserList').html(html);
        }
    });
}

$(document).ready(function () {
    UserLoggedIn();
    $('#divNewsList').hide();
    var news = getParameterByName("news");
    var tutorials = getParameterByName("tutorials");
    var dashboard = getParameterByName("dashboard");
    var usernews = getParameterByName("usernews");
    var userpage = getParameterByName("userpage");
    var coachpage = getParameterByName("coachpage");
    var about = getParameterByName("about");
    var classlistview = getParameterByName("classlistview");
    $('#divClassResult').hide();
    $('#divUserTickets').hide();
    $('#divUserDashboard').hide();
    $('#btnUserDashboard').hide();
    $('#divCoachDashboard').hide();
    $('#btnSpecialNews').hide();
    $('#btnCoachDashboard').hide();
    $('#divFoodRegime').hide();
    $('#divSportInfo').hide();
    $('#divExercisePlan').hide();
    $('#divBodyTestUser').hide();
    $('#divBodyTestCoach').hide();
    $('#divIntroducerCodeEntry').hide();
    $('#divClassPurchase').hide();
    $('#divClassList').hide();
    $('#divCoachUserList').hide();
    LoadHeaderFooterSocial();
    if (news == null && tutorials == null && userID == "" && dashboard == null && usernews == null && userpage == null && coachpage == null && about == null && classlistview == null) {//main page
        $('#divPart1').show();
        $('#divPart2').show();
        $('#divPart3').show();
        $('#divPart4').show();
        $('#divPart5').hide();
        $('#divPart6').show();
        GetSlides();
        GetCoaches();
        GetNews("");
        GetTutorials("");
        GetTestimonies("");
        $('#divMainSchedule').hide();
        //GetSchedule();
    }
    else {//internal pages (all contents should be hidden here, as each page has its own specific content
        $('#divPart1').hide();
        $('#divPart2').hide();
        $('#divPart3').hide();
        $('#divPart4').hide();
        $('#divPart5').hide();
        $('#divPart6').hide();
        $('#divAbout').hide();
        $('#divMainSchedule').hide();

        if (news != null) {
            $('#divNewsList').show();
            if (news == "all") {
                GetNewsList("");
            }
            else {
                GetNewsList(news);
            }
        }
        if (about != null) {
            GetAbout();
        }
        if (classlistview != null) {
            $('#divMainSchedule').show();
            GetSchedule();
        }
        if (tutorials != null) {
            $('#divTutorialsList').show();
            if (tutorials == "all") {
                GetTutorialsList("");
            }
            else {
                GetTutorialsList(tutorials);
            }
        }

        if (userID != "") {//logged in user (user or coach), hide the login button, display a logout button instead

            if (getParameterByName("au")) {
                $('#divClassResult').show();
                var executer = new ServiceExecuter({
                    methodName: "GetClassResult", parameters: { au: getParameterByName("au") },
                    onSuccess: function (data) {
                        if (data.result == "ok") {
                            $('#lblClassResult1').html("شما با موفقیت کلاس زیر را خریداری کرده اید");
                        }
                        else {
                            $('#lblClassResult1').html("مشکلی در خرید کلاس زیر پیش آمد");
                        }
                        $('#lblClassResult2').html("نام رشته: " + ConvertToPersianNumbers(data.name));
                        $('#lblClassResult3').html("زمان: " + ConvertToPersianNumbers(data.time));
                        //$('#divClassResult4').html("");
                    }
                });
                //
            }

            if (userType == "user") {
                $('#cmbBodyTestUserList').hide();
                $('#cmbExercisePlanUserList').hide();
                $('#Span4').hide();
                $('#cmbSportInfoUserList').hide();
                $('#cmbFoodRegimeUserList').hide();
                $('#Span5').hide();

                $('#lblBodyTestUserList').hide();
                $('#lblExercisePlanUserList').hide();
                $('#lblSportInfoUserList').hide();
                $('#lblFoodRegimeUserList').hide();

                $('#btnSaveSportInfo').hide();
                $('#btnSaveExercisePlan').hide();
                $('#btnFoodRegimeSave').hide();
                $('#divNewsList').hide();
                $('#btnSpecialNews').show();
                $('#btnUserDashboard').show();
                if (dashboard == "user" && usernews == null && userpage == null) {
                    $('#divUserDashboard').show();
                    $('#divPart5').hide();
                }
                else if (usernews != null && dashboard == null && userpage == null) {
                    $('#divNewsList').show();
                    if (usernews == "all") {
                        GetSpecialNewsList("");
                    }
                    else {
                        GetSpecialNewsList(usernews);
                    }
                }
                else if (usernews == null && dashboard == null && userpage == null) {
                    //GetSchedule();
                    //$('#divPart5').show();
                }

                if (userpage == "bodytest") {
                    $('#divBodyTestUser').show();
                    GetBodyTest("");
                }
                else if (userpage == "plan") {
                    GetExercisePlan("");
                    $('#divExercisePlan').show();
                    $('#divExercisePlanList').show();
                    $('#tblExercisePlan textarea').prop('disabled', true);
                    $('#tblExercisePlan2 textarea').prop('disabled', true);
                    $('#tblExercisePlan3 textarea').prop('disabled', true);
                    $('#tblExercisePlan4 textarea').prop('disabled', true);
                    $('#tblExercisePlan5 textarea').prop('disabled', true);
                    $('#tblExercisePlan6 textarea').prop('disabled', true);
                    $('#tblExercisePlan7 textarea').prop('disabled', true);
                }
                else if (userpage == "classlist") {
                    $('#divClassList').show();
                    GetUserClassList();
                }
                else if (userpage == "info") {
                    $('#divSportInfo').show();
                    GetSportInfo("");
                    $('#tblSportInfo textarea').prop('disabled', true);
                }
                else if (userpage == "food") {
                    $('#divFoodRegime').show();
                    $('#tblFoodRegime').hide();
                    $('#divFoodRegimeList').show();
                    $('#tblFoodRegime textarea').prop('disabled', true);
                    $('#cmbFoodRegimeUserList').hide();
                    $('#Span5').hide();
                    $('#btnFoodRegimeSave').hide();
                    GetFoodRegime("");
                }
                else if (userpage == "introducer") {
                    $('#divIntroducerCodeEntry').show();
                }
                else if (userpage == "usertickets") {
                    GetCoachTicket("");
                }

                if (news != null) {
                    $('#divNewsList').show();
                    if (news == "all") {
                        GetNewsList("");
                    }
                    else {
                        GetNewsList(news);
                    }
                }
            }
            else {
                $('#cmbBodyTestUserList').show();
                $('#cmbExercisePlanUserList').show();
                $('#Span4').show();
                $('#cmbSportInfoUserList').show();
                $('#cmbFoodRegimeUserList').show();
                $('#Span5').show();

                $('#lblBodyTestUserList').show();
                $('#lblExercisePlanUserList').show();
                $('#lblSportInfoUserList').show();
                $('#lblFoodRegimeUserList').show();

                $('#btnSaveSportInfo').show();
                $('#btnSaveExercisePlan').show();
                $('#btnFoodRegimeSave').show();

                $('#divExercisePlanList').hide();
                $('#divExercisePlanList').hide();
                $('#btnCoachDashboard').show();
                if (dashboard == "coach") {
                    $('#divCoachDashboard').show();
                }
                if (coachpage == "bodytest") {
                    $('#divBodyTestUser').show();
                    GetCoachUsers();
                    $('#cmbBodyTestUserList').show();
                    $('#divBodyTestCoach').show();
                    GetBodyTest("");
                }
                else if (coachpage == "plan") {
                    GetCoachUsers();
                    GetExercisePlan("");
                    $('#tblExercisePlan textarea').prop('disabled', false);
                    $('#tblExercisePlan2 textarea').prop('disabled', false);
                    $('#tblExercisePlan3 textarea').prop('disabled', false);
                    $('#tblExercisePlan4 textarea').prop('disabled', false);
                    $('#tblExercisePlan5 textarea').prop('disabled', false);
                    $('#tblExercisePlan6 textarea').prop('disabled', false);
                    $('#tblExercisePlan7 textarea').prop('disabled', false);
                    $('#divExercisePlan').show();
                    $('#cmbExercisePlanUserList').show();
                    $('#Span4').show();
                    $('#divExercisePlanList').show();
                }
                else if (coachpage == "info") {
                    GetCoachUsers();
                    $('#divSportInfo').show();
                    GetSportInfo("");
                    $('#cmbSportInfoUserList').show();
                    $('#tblSportInfo textarea').prop('disabled', false);
                }
                else if (coachpage == "food") {
                    GetCoachUsers();
                    $('#tblFoodRegime').show();
                    $('#tblFoodRegime textarea').prop('disabled', false);
                    $('#cmbFoodRegimeUserList').show();
                    $('#Span5').show();
                    $('#divFoodRegimeList').show();
                    $('#divFoodRegime').show();
                    $('#btnFoodRegimeSave').show();
                    GetFoodRegime("");
                }
                else if (coachpage == "coachuserlist") {
                    $('#divCoachUserList').show();
                    GetCoachUserListPage();
                }
                else if (coachpage == "coachspecialnews") {
                    GetCoachUsers();
                    $('#divCoachTicket').show();
                }
            }

            $('.btnLogin').html("خروج");
        }
        else {
            $('.btnLogin').html("ورود اعضاء");
        }
    }
});