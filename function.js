/*对象深拷贝*/
inputHistory.prototype.deepCopy= function(source) { 
      var that = this;
      var result={};
      for (var key in source) {
            result[key] = typeof source[key]==='object'? that.deepCopy(source[key]): source[key];
         } 
         return result; 
}

/*居中*/
function makeCenter($obj){               
    var $parent = $(this).parent();
    $obj.css({
       "top": function () {
           return ($parent.height() - $(this).height()) / 2 + "px";
       },
       "left": function () {
           return ($parent.width() - $(this).width()) / 2 + "px";
       }
    })    
}

/*等高*/
/*高度统一的问题*/
  var _config = [
    {wrapper:".iot_content_row",children:".bd img",class:".height_d"},
    /*{selector:"#rightSideBar_wrapper",children:"",class0:".rightSide",class1:".leftContent"}, */
    {wrapper:".product_article",children:"",class:".article_zone"} 
  ];
  var _config = [
      {wrapper:".quyu",children:".bd img",class:".text_p",mode:1},
      {wrapper:".product_article",children:"",class:".article_zone",mode:0} 
  ];
  function equalHeight(options){
      jQuery(options).each(function(i,e){
        var heightArr = [],
            max = 0; 
        if(jQuery(e.wrapper).length == 0 || (!e.mode)){return };
        if(e.mode == 0){
              jQuery(e.wrapper).each(function(){
          
                  var $eles = jQuery(this).find(e.class);
                  
                      $eles.each(function(index,element){
                          var height = jQuery(element).height();
                              height > max ? max = height : "";
                      })  
                      $eles.height(max);
                      if(e.children !="")$eles.find(e.children).height(max);
                  })  
        }
        if(e.mode == 1){
              var $eles = jQuery(e.wrapper).find(e.class);
              
                  $eles.each(function(index,element){
                      var height = jQuery(element).height();
                          height > max ? max = height : "";
                  })  
                  $eles.height(max);
                  if(e.children !="")$eles.find(e.children).height(max);
        }
      })
  }
  equalHeight(_config);

/*定时器等待获取异步数据*/
pagination.prototype.ini = function(){
        var that = this;
        var interval = setInterval(inter,500);
        function inter(){
          if(getData.userData){
              clearInterval(interval);
              var data = getData.userData;
              that.page(data);
          }
        };
};

/*定时器等待获取异步数据*/

/*template */
  /*
    <textarea style="display:none;">
    <li>
        <a href="javascript:" data-id="$couponid$">
            <img src="$imgsrc$" width="240" height="180" />
            <p>$traffic$</p>
            <p>$buynum$人购买</p>
            <div>
                <div><del class="g6 db">¥$cost$现金券</del>$discount$折</div>
                <strong class="cr price r pr20">¥$price$</strong>
            </div>
            <h3>$resname$</h3>
        </a>
    </li>
    </textarea>
  */
    String.prototype.temp = function(obj) {
        return this.replace(/\$\w+\$/gi, function(matchs) {
            var returns = obj[matchs.replace(/\$/g, "")];   
            return (returns + "") == "undefined"? "": returns;
        });
    };

    var htmlList = ''
         // textarea中的模板HTML
        , htmlTemp = $("textarea").value;

    json.each(function(i,e){
        htmlList += htmlTemp.temp(e);
    })    
    /*JSON.data.forEach(function(object) {
        htmlList += htmlTemp.temp(object);
    });*/

    // htmlList就是我们需要的HTML代码啦！
    $("ul").innerHTML = htmlList;
/*template*/



  /*获取上传的文件 start*/

  $("#file0").change(function(){
      objUrl = getObjectURL(this.files[0]);
      $('#btnUploadPcb').val(this.files[0].name);
  });
  function getObjectURL(file){
      var url = null ; 
      if (window.createObjectURL!=undefined){ // basic
          url = window.createObjectURL(file) ;
      } else if (window.URL!=undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file) ;
      } else if (window.webkitURL!=undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file) ;
      }
      return url ;
  }
  /*获取上传的文件 end*/

  /*禁止浏览器的图片拖动*/
  Array.prototype.map.call(imgs,function(v,i){
      v.ondragstart = function(e){e.preventDefault()}
  })

  //设置cookie记录广告关闭 start；
  function adClose(){
  
    $(".ad .close").on('click', function(event) {
        var $ad = $(this).parent(".ad");
            $ad.hide();
        var cookieValue = $ad.attr("data"); /*获取广告cookie name*/
        setCookie(cookieValue,"close");
    });

    var $topAd = $(".topAd"),
        $leftAd = $(".leftAd"),
        $rightAd = $(".rightAd");
    var adTopState = getCookie("top");
    var adLeftState = getCookie("left");
    var adRightState = getCookie("right");

    if(adTopState){$topAd.hide();}
    if(adLeftState){$leftAd.hide();}
    if(adRightState){$rightAd.hide();}

  }
  /*设置广告cookie*/
  function setCookie(name,value,hours){
    var exp = new Date();
    exp.setTime(exp.getTime() + hours*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
  }
  /*获取广告cookie*/
  function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
      
    return unescape(arr[2]); //0 是整个匹配，1是去掉（^|）,2是值；
    else
    return null;
  }
//设置cookie记录广告关闭 end

/*根据url设置导航栏高亮*/
  var navHeightLight = function(){
      var href = location.href,
          reg = /(\w+\.com\/){1}/;
      var navIndex = href.split(reg)[2];  /*1为xxx.com*/
      
      var tabArray = ["first","publish&publish_job","taxtool","video","account","answer-list-nzgs","shop","news"]
      var tabIndex ;
          getIndex();
      function getIndex(){
          if(!navIndex){tabIndex = 0;return;}
          $.each(tabArray,function(index){
              var t = searchArray(tabArray[index],"&");

              if(t != -1){
                tabIndex = index; return false; 
              }
          });
          function searchArray(i,selector){
              var a = i.split(selector);
              var t;
              for(var j=0;j<a.length;j++){
                  
                  if(navIndex)t = navIndex.indexOf(a[j]);
                  if(t != -1){
                    return t; 
                  }
              }
              return t;
          }
      }; 
      /*根据获取的index设置高亮样式*/
      $(".head .g-header-nav a").eq(tabIndex).addClass("on");
  }
  
  



/*判断是否移动设备：isMobileDevice start*/
function isMobileDevice(){
    var d;
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && $(window).width()<700 ){
      d="mobile";
    }else{
      d="web";  
    } 
    return d;
}
/*isMobileDevice end*/


  /*全选checkAll功能 start*/
  /*<form>
    <label for="checkAll">全选</label><input type="checkbox" id="checkAll" name="" value="">
     <br/>
    <input type="checkbox" name="item">
    <input type="checkbox" name="item">
    <input type="checkbox" name="item">
    <input type="checkbox" name="item">
    <input type="checkbox" name="item">
    <input type="checkbox" name="item">
  </form>*/
     window.onload = function(){
        var table = $("#show_newsTW table");
        var tableCheckBoxs = table.find("input[type=checkbox]");
        var num = tableCheckBoxs.length;
        var flag;
            $("#all").on("click",function(){
                flag = is_allCheck(table,num);
                if(!flag){
                  tableCheckBoxs.prop("checked",true)  
                }else{
                  tableCheckBoxs.prop("checked",false)  
                }
                
            });
            $("#delete").on("click",function(){
                
                tableCheckBoxs.prop("checked",false)  
                $("#all").prop("checked",false)  
                flag = false;
            });
            tableCheckBoxs.on("click",function(){
                var f = is_allCheck(table,num);
                if(f){
                  $("#all").prop("checked",true)  
                }else{
                  $("#all").prop("checked",false)  
                }
            })

            function is_allCheck(selector,num){
              var checked = $(selector).find("input[type=checkbox]:checked");
              var flag = (checked.length == num);
              return flag;
            }
    } 


     $(function(){
          var checkAll = $("#checkAll") ;
          var checkBoxs = $("input[name=item]");
          checkAll.click(function(){ 
              /*attr不好使了*/
              checkBoxs.prop('checked', this.checked)
          });
          checkBoxs.click(function(){
              var flag = true;
              checkBoxs.each(function(){
                  if(!this.checked){
                    flag = false;
                  }
              })
              checkAll.prop("checked",flag)
          })
     })
/*全选checkAll功能 end*/ 
 

/*兼容ie的placeholder*/
function placeHolder(){
    /*html input 设置 data-placeholder属性*/
    if (!isPlaceholer()) {    
       $(":input").each(function(){
              var temp = $(this).attr("data-placeholder");  
              if(temp){
                $(this).val(temp);
                 $(this).focusin(function() {
                      if($(this).val() ==temp){  
                         $(this).val("");
                      }
                 });
                $(this).focusout(function() {
                      if($(this).val() ==""){ 
                         $(this).val(temp);
                      }
                 });
              }
       })
    }else{
           $(":input").each(function(){
              var temp = $(this).attr("data-placeholder");  
              if(temp){
                $(this).attr("placeholder",temp)
              }
            })
    } 
    function isPlaceholer() {
             var input = document.createElement('input');
             return "placeholder" in input;
    }
}



/*根据屏幕调整字体大小*/
/*备注：由于默认font-size为14px，所以使用window.onload会导致两次根据documnentElement的font-size计算，导致页面变动所以有时不用再onload事件里*/
$(window).on("load resize",function(){
	htmlFontSize();
});
rootFontSize(document.documentElement,window);
function htmlFontSize (){
          var clientWidth = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;
              if(clientWidth > 640) clientWidth = 640;
              document.documentElement.style.fontSize = clientWidth * 1/23/*16*/+"px";
              return clientWidth * 1/23;
};
function rootFontSize(docElem,win){
        var setFontSize = function(){
            g_rem = (docElem.getBoundingClientRect().width || docElem.clientWidth || win.innerWidth)/16;
            !g_rem && (g_rem = 20);
            docElem.style.fontSize = g_rem + 'px';
            document.getElementsByTagName('html')[0].style.fontSize = g_rem + 'px';
        }
        win.addEventListener("resize",setFontSize,false);
        setFontSize();
}

/*调整字体大小2*/
  var g_rem = 20,
              rate = 25;
        (function(win){
            var orientationX = false; //是否横屏进来
            if(win.orientation == 90 || win.orientation == -90){
                orientationX = true;
            }
            var docEl = win.document.documentElement,tid;
            function refreshRem1(){
                g_rem = docEl.getBoundingClientRect().width/rate;
                !g_rem && (g_rem = 20);
                docEl.style.fontSize = g_rem + 'px';
            }
            function refreshRem2(){
                g_rem = docEl.getBoundingClientRect().width/rate;
                if(!g_rem){
                    return refreshRem1();
                }
                var width = docEl.getBoundingClientRect().width;
                var d = win.document.createElement('div');
                d.style.width = '1rem';
                d.style.display = "none";
                docEl.firstElementChild.appendChild(d);
                var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));

                docEl.firstElementChild.removeChild(d);
                docEl.style.fontSize = (g_rem/defaultFontSize)*100 + '%';
            }

            var refreshRem = refreshRem2;
            try{
                win.addEventListener("orientationchange", function(){//触发手机横屏竖屏事件
                    if(orientationX){
                        location.reload();
                    }
                }, false);
            }catch(e){
                
            }
            
            win.addEventListener('pageshow', function(e) {
                if (e.persisted) {
                    clearTimeout(tid);
                    tid = setTimeout(refreshRem, 100);
                }
            }, false);
            refreshRem();
        })(window);  

/*调整字体大小2 end*/

//计时3分钟无操作跳转，若操作则重新计时start；
window.onload = function(){
      waitJump(3,"index.html");
}
function waitJump(min,url){
        function j(time,url){
            var t =setTimeout(function(){
                   window.open(url,"_parent");
            },time*60*1000);
            return t;
        };
        /*初始化定时器*/    
        var timer0 = j(min);
        
        function startTimer(timer,time){
          clearTimeout(timer0);
          timer0 = j(time);
        };
        document.onclick = function(){
          startTimer(timer0,min);  
        }; 
}
/*计时3分钟无操作跳转，若操作则重新计时end*/

//显示时间
window.onload = function(){
      showTime();
}	        	
		
function showTime(){ 
            var show_day=new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六'); 
            var time=new Date(); 
            var year=time.getFullYear(); 
            var month=time.getMonth(); 
            var date=time.getDate(); 
            var day=time.getDay(); 
            var hour=time.getHours(); 
            var minutes=time.getMinutes(); 
            var second=time.getSeconds(); 
            month=month+1; 
            month<10?month='0'+month:month; 
            
            hour<10?hour='0'+hour:hour; 
            minutes<10?minutes='0'+minutes:minutes; 
            second<10?second='0'+second:second; 
            var now_time=year+'年'+month+'月'+date+'日'+' '+show_day[day]+' '+hour+':'+minutes+':'+second; 
            var showTimeDiv = document.getElementById('showtime');
                if(showTimeDiv){
                    showTimeDiv.innerHTML = now_time; 
                    setTimeout(showTime,1000);  
                }else{
                  return false;
                }
};


/*jquery 检测鼠标滚动，以及触屏动作*/
    a(document).on("mousewheel DOMMouseScroll", function(t) {
      var e = t.originalEvent.wheelDelta || t.originalEvent.detail * -1;
      e > 0 ? f.prev() : f.next()
    }), 
    a(document).on("touchstart",function(t){
        var s = t.originalEvent.changedTouches[0];
            startPos = {x:s.pageX,y:s.pageY,time:+new Date};
    }),
    a(document).on("touchend", function(t) {
        var s = t.originalEvent.changedTouches[0],
            distance,x;
        var duration = +new Date - startPos.time;    
        if(s.length > 1 || event.scale && event.scale !== 1) return;
            endPos = {x:s.pageX,y:s.pageY,time:+new Date};
            distance = {x:endPos.x - startPos.x,
                        y:endPos.y - startPos.y};
            realx = Math.abs(distance.x);
            isScrolling = realx < Math.abs(distance.y) ? 1:0; 
        if(Number(duration) > 10 && realx > 10 && isScrolling === 0){
            event.preventDefault();
            distance.x > 0 ? f.prev() : f.next();
        }
    })
/*jquery 检测鼠标滚动，以及触屏动作end*/