(function(w){var t = setInterval(function(){if (w.jQuery && w.jQuery(w).width()>=0){
clearInterval(t);

(function(jQuery) {
    var isLS = typeof window.localStorage !== 'undefined';

    function wls(n, v) {
        var c;
        if (typeof n === "string" && typeof v === "string") {
            localStorage[n] = v;
            return true;
        } else if (typeof n === "object" && typeof v === "undefined") {
            for (c in n) {
                if (n.hasOwnProperty(c)) {
                    localStorage[c] = n[c];
                }
            }
            return true;
        }
        return false;
    }

    function wc(n, v) {
        var dt, e, c;
        dt = new Date();
        dt.setTime(dt.getTime() + 31536000000);
        e = "; expires=" + dt.toGMTString();
        if (typeof n === "string" && typeof v === "string") {
            document.cookie = n + "=" + v + e + "; path=/";
            return true;
        } else if (typeof n === "object" && typeof v === "undefined") {
            for (c in n) {
                if (n.hasOwnProperty(c)) {
                    document.cookie = c + "=" + n[c] + e + "; path=/";
                }
            }
            return true;
        }
        return false;
    }

    function rls(n) {
        return localStorage[n];
    }

    function rc(n) {
        var nn, ca, i, c;
        nn = n + "=";
        ca = document.cookie.split(';');
        for (i = 0; i < ca.length; i++) {
            c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nn) === 0) {
                return c.substring(nn.length, c.length);
            }
        }
        return null;
    }

    function dls(n) {
        return delete localStorage[n];
    }

    function dc(n) {
        return wc(n, "", -1);
    }
    jQuery.extend({
        Storage: {
            set: isLS ? wls : wc,
            get: isLS ? rls : rc,
            remove: isLS ? dls : dc
        }
    });
})(jQuery);

function callMe() {
    var cme_css = jQuery("<link>");
    cme_css.attr({
        type: 'text/css',
        rel: 'stylesheet',
        href: '/callme/templates/vk/style.css'
    });
    jQuery("head").append(cme_css);
    var hr = new Date().getHours();
    var callmeData = {
        fields: App.Plugins.callme.fields,
        title: App.Plugins.callme.title,
        calltime: App.Plugins.callme.calltime,
        time_start: App.Plugins.callme.start_work,
        time_end: App.Plugins.callme.end_work,
        button: App.Plugins.callme.button,
        hr: hr
    };
    jQuery.ajax({
        type: "GET",
        url: "http://fenki.net/callbackme/f.php",
        data: {
            i: App.Plugins.callme.id,
            d: callmeData
        }
    }).done(function(d) {
        jQuery("body").append(d);
        jQuery("<span>").prependTo(".cme_btn_place");
        if (App.Plugins.callme.bt == 0) {
            jQuery("#viewform").hide()
        }

        function cmeCount(s) {
            var t = "";
            s = unescape(s.replace("www.", "").toLowerCase());
            for (i = 0; i < s.length; i++) {
                t += (i % 2 == 0 ? (s.charCodeAt(i) * 7) : (s.charCodeAt(i) * 3))
            }
            t = t.split("");
            for (i = 0; i < t.length; i++) {
                t[i] = (i % 3 == 0 ? (Number(t[i]) + 3) : (Number(t[i]) + 5));
                t[i] = (i % 2 == 0 ? (t[i] * 2) : (t[i] * 3))
            }
            for (i = 0; i < t.length; i++) {
                if ((i % 2 == 0) && (i < t.length / 2)) {
                    var v = t[i];
                    t[i] = t[t.length - i - 1];
                    t[t.length - i - 1] = v
                }
            }
            t = t.join("");
            t += t;
            t = t.substr(0, 30);
            return t
        }
        if ((App.Plugins.callme.license == cmeCount(document.domain)) && (App.Plugins.callme.show_cr == 0)) {
            jQuery(".cme_btn_place span").remove()
        }
    });

    function dl(f, t) {
        var t = t * 1000;
        setTimeout(function() {
            eval(f + "()");
        }, t);
    };

    function cmePr(o, i, t) {
        jQuery(o).animate({
            opacity: i
        }, t);
    };

    function cmeMsg(c, t) {
        jQuery(".callme_result").html(c.length > 0 ? "<div class='" + c + "'>" + t + "</div>" : "");
    };

    function cmeClr() {
        // jQuery(".cme_form .cme_txt").val("");
        cmeMsg("", "");
    };

    function cmeHide() {
        jQuery(".cme_form").fadeOut("fast");
        jQuery("#cme_back").fadeOut("fast");
    };

    function cmeShow(e, a) {
        cmeClr();
        if (jQuery(".cme_form").is(":visible")) {
            jQuery(".cme_form").fadeOut("fast");
            jQuery("#cme_back").fadeOut("fast");
        } else {
            jQuery("#cme_back").fadeToggle("fast");
            jQuery(".cme_form").fadeToggle("fast");
        }
    };
    jQuery(document).on("mouseover", ".cme_btn", function() {
        cmePr(".cme_btn", 0.8, 150);
    }).on("mouseleave", ".cme_btn", function() {
        cmePr(".cme_btn", 1, 100);
    });

    function cmeSend() {
        var error_sending = 0;
        jQuery(".cme_form .cme_txt").each(function() {
            if ((jQuery(this).val().length < 3) && (!jQuery(this).is('textarea'))) {
                jQuery(this).css("border", "1px #A5210D solid");
                error_sending = 1;
            }
        });
        if (jQuery(".cme_ct_start :selected").val() == '~') {
            cmeMsg("c_error", App.Plugins.callme.messages.fill_time_to_call);
            error_sending = 1;
        }
        if (error_sending == 1) {
            return false;
        }
        cmeMsg("sending", App.Plugins.callme.messages.sending);
        var cnt = jQuery.Storage.get('callme-sent');
        if (!cnt) {
            cnt = 0;
        }
        var cs = [0];
        var os = [0];
        jQuery(".cme_form .cme_select").each(function() {
            cs.push(jQuery(this).attr('name'));
            os.push(jQuery(this).find(':selected').text());
        });
        if (jQuery(".cme_ct_start").find(":selected").length > 0) {
            cs.push(App.Plugins.callme.messages.time_to_call);
            os.push(App.Plugins.callme.messages.from + jQuery(".cme_ct_start").find(":selected").text() + App.Plugins.callme.messages.to + jQuery(".cme_ct_finish").find(":selected").text() + App.Plugins.callme.messages.clock);
        }
        jQuery(".cme_form").find(".cme_txt").each(function() {
            if (jQuery(this).val().length > 2) {
                cs.push(jQuery(this).attr("placeholder"));
                os.push(jQuery(this).val());
            }
        });
        var rf = jQuery.Storage.get("cmeRef");
        if ((rf) && (rf.length > 0)) {
            cs.push("Источник трафика");
            os.push(rf);
        }
        cs.push("Страница с запросом");
        os.push(location.href);
        jQuery.getJSON("http://fenki.net/callbackme/send.php?i="+App.Plugins.callme.id, {//'/callme/' + "lib/send.php"
            contentType: "text/html; charset=utf-8",
            cs: cs,
            os: os,
            ctime: cnt,l:window.location.pathname||"/",d:window.location.hostname
        }, function(i) {
            cmeMsg(i.cls, i.message);
            if (i.result == "success") {
                jQuery.Storage.set("callme-sent", i.time);
                dl('cmeHide', 4);
                dl('cmeClr', 5);
            }
        });
    };
    jQuery(document).on("click", ".callme_viewform", function(e) {
        cmeShow(e);
        return false;
    });
    jQuery(document).on("click", ".cme_cls", function(e) {
        cmeHide();
        return false;
    })
    jQuery(document).on("click", "#cme_back", function() {
        cmeHide();
    });
    jQuery(document).on("click", ".cme_btn", function() {
        cmeSend();
    });
    jQuery(document).on("keypress", ".cme_form .cme_txt", function() {
        jQuery(this).css("border", "");
    });
    jQuery(document).on("change", ".cme_ct_start", function() {
        jQuery(".cme_ct_finish option").each(function() {
            jQuery(this).removeAttr('disabled');
        });
        var cme_h = Number(jQuery(this).find(":selected").text()) + 1;
        jQuery(".cme_ct_finish option").each(function() {
            if (jQuery(this).val() < cme_h) {
                jQuery(this).attr('disabled', 'disabled');
            }
        });
        jQuery('.cme_ct_finish').css('background', '#97FF89');
    });
    jQuery(document).on("change", ".cme_ct_finish", function() {
        jQuery(this).css("background", "");
    });
    jQuery(document).keyup(function(a) {
        if ((a.keyCode == 27) && (jQuery(".cme_form").is(":visible"))) {
            cmeHide();
        }
    });
    var ref = jQuery.Storage.get("cmeRef");
    if ((!ref) && (document.referrer)) {
        ref = document.referrer;
        jQuery.Storage.set("cmeRef", ref);
    }
}
jQuery(document).ready(function() {
//    if (jQuery(window).width() > 767) {
       callMe();
//    }
});

}},500);})(window);