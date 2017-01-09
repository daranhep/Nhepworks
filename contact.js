$.each($("textarea[data-autoresize]"), function() {
    var b = this.offsetHeight - this.clientHeight;
    var a = function(c) {
        $(c).css("height", "auto").css("height", c.scrollHeight + b)
    };
    $(this).on("keyup input", function() {
        a(this)
    }).removeAttr("data-autoresize")
});
$(".handler").on("blur", function() {
    $(this).removeClass("error")
}).on("focus", function() {
    $(this).removeClass("error")
});
$("select").change(function() {
    $(this).removeClass("placeholder")
});
function resetTabs() {
    $(".contact-bar a").removeClass("active");
    $("#result").slideUp(200).addClass("out")
}
function showResult() {
    $("#result").slideDown(300).removeClass("out");
    $("fieldset").slideUp(300).addClass("out");
    $(".stamp").addClass("anim")
}
$("#inquiry").click(function() {
    resetTabs();
    $(this).addClass("active");
    $("#hello_form").slideUp(300).addClass("out");
    $("#contact_form").slideDown(300).removeClass("out")
});
$("#hey").click(function() {
    resetTabs();
    $(this).addClass("active");
    $("#contact_form").slideUp(300).addClass("out");
    $("#hello_form").slideDown(300).removeClass("out")
});
function validateEmail(a) {
    var c = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    var b = c.test(a);
    if (!b) {
        return false
    } else {
        return true
    }
}
$("#submit_btn").click(function() {
    var g = $("input[name=name]").val();
    var f = $("input[name=org]").val();
    var a = $("input[name=email]").val();
    var d = $("textarea[name=message]").val();
    var b = $("#budget").val();
    var c = $("#timeline").val();
    var e = true;
    if (g == "") {
        $("input[name=name]").addClass("error");
        e = false
    }
    if (a == "") {
        $("input[name=email]").addClass("error");
        e = false
    }
    if (validateEmail(a)) {} else {
        $("input[name=email]").addClass("error");
        e = false
    }
    if (d == "") {
        $("textarea[name=message]").addClass("error");
        e = false
    }
    if (e) {
        post_data = {
            userName: g,
            userOrg: f,
            userEmail: a,
            userMessage: d,
            userBudget: b,
            userTimeline: c
        };
        $.post("contact/contact-send", post_data, function(h) {
            showResult();
            $("#contact_form input").val("");
            $("#contact_form textarea").val("")
        }).fail(function(h) {
            $("#result").hide().html('<div class="error">' + h.statusText + "</div>").fadeIn(200)
        })
    }
});
$("#submit_btn_hello").click(function() {
    var d = $("input[name=name-hello]").val();
    var a = $("input[name=email-hello]").val();
    var b = $("textarea[name=message-hello]").val();
    var c = true;
    if (d == "") {
        $("input[name=name-hello]").addClass("error");
        c = false
    }
    if (a == "") {
        $("input[name=email-hello]").addClass("error");
        c = false
    }
    if (validateEmail(a)) {} else {
        $("input[name=email]").addClass("error");
        c = false
    }
    if (b == "") {
        $("textarea[name=message-hello]").addClass("error");
        c = false
    }
    if (c) {
        post_data = {
            userName: d,
            userEmail: a,
            userMessage: b,
        };
        $.post("contact/hello-send", post_data, function(e) {
            showResult();
            $("#hello_form input").val("");
            $("#hello_form textarea").val("")
        }).fail(function(e) {
            $("#result-hello").hide().html('<div class="error">' + e.statusText + "</div>").fadeIn(200)
        })
    }
});