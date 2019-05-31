chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("request");
        if (request.action === "do_something") {
            var str = "<ol>";
            for (var i = 0; i < request.data.length;++i) {
                var e = request.data[i];
                str += "<li><div>" + e[0] + "</div><div><a href='" + e[1] + "'>" + e[1] + "</a></div></li>";
            }
            str += "</ol>";
            document.write(str);
        }
    }
);
