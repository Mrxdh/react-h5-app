
    window.addEventListener("resize",function(){
        var MAX_WIDTH=640,
            htmlDom=document.querySelector("html"),
            htmlWidth=htmlDom.clientWidth,
            screenWidth=screen.width,
            width=Math.min(htmlWidth,MAX_WIDTH),
            htmlFontSize=width/10,
            preHtmlFontSize=htmlDom.style.fontSize||"";
        preHtmlFontSize=parseFloat(preHtmlFontSize);
        if(preHtmlFontSize&&htmlFontSize==preHtmlFontSize){
            return
        }
        if(screenWidth>750){
            htmlFontSize=37.5
        }
        htmlDom.style.fontSize=htmlFontSize+"px"
    });
    !function(){
        var event=document.createEvent("HTMLEvents");
        event.initEvent("resize",false,false);
        window.dispatchEvent(event)
    }();




