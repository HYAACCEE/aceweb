////////////////////////////////
// Author: Bora DAN — http://codecanyon.net/user/bqra
// 18 August 2013
// E-mail: bora_dan@hotmail.com
////////////////////////////////

$(function () {    
    (function ($) {
        $.fn.jalendar = function (options) {
            
            var settings = $.extend({
                customDay: new Date(),
                color: '#65c2c0',
                lang: 'ZH'
            }, options);
            
            // Languages            
            var dayNames = {};
            var monthNames = {};
            var lAddEvent = {};
            var lAllDay = {};
            var lTotalEvents = {};
            var lEvent = {};
            dayNames['ZH'] = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
            dayNames['EN'] = new Array('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun');
            dayNames['TR'] = new Array('Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Pzr');
            dayNames['ES'] = new Array('Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Såb', 'Dom');
            monthNames['ZH'] = new Array('1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'); 
            monthNames['EN'] = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'); 
            monthNames['TR'] = new Array('Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'); 
            monthNames['ES'] = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'); 
            lAddEvent['ZH'] = '新增事件';
            lAddEvent['EN'] = 'Add New Event';
            lAddEvent['TR'] = 'Yeni Etkinlik Ekle';
            lAddEvent['ES'] = 'Agregar Un Nuevo Evento';
            lAllDay['ZH'] = '整日';
            lAllDay['EN'] = 'All Day';
            lAllDay['TR'] = 'Tüm Gün';
            lAllDay['ES'] = 'Todo El Día';
            lTotalEvents['ZH'] = '最近待面试： ';
            lTotalEvents['EN'] = 'Total Events in This Month: ';
            lTotalEvents['TR'] = 'Bu Ayki Etkinlik Sayısı: ';
            lTotalEvents['ES'] = 'Total De Eventos En Este Mes: ';
            lEvent['ZH'] = '待办事件';
            lEvent['EN'] = 'Event(s)';
            lEvent['TR'] = 'Etkinlik';
            lEvent['ES'] = 'Evento(s)';
            
            
            var $this = $(this);
            var div = function (e, classN) {
                return $(document.createElement(e)).addClass(classN);
            };
            
            var clockHour = [];
            var clockMin = [];
            for (var i=0;i<24;i++ ){
                clockHour.push(div('div', 'option').text(i))
            }
            for (var i=0;i<59;i+=5 ){
                clockMin.push(div('div', 'option').text(i))
            }
            
            // HTML Tree
            $this.append(
                div('div', 'wood-bottom'), 
                div('div', 'jalendar-wood').append(
                    div('div', 'close-button'),
                    div('div', 'jalendar-pages').append(
                        div('div', 'pages-bottom'),
                        div('div', 'header').css('background-color', settings.color).append(
                            ////div('a', 'prv-m'),
                            ////div('h1'),
                            ////div('a', 'nxt-m'),
                            ////div('div', 'day-names')
                        ),
                        div('div', 'title').html('<span class="float-l dark-grey f14">面试日历</span><span class="float-r dark-grey f14 title-r"></span>'),
                        div('div', 'day-names'),
                        div('div', 'days'),
                        div('div', 'total-bar').html( lTotalEvents[settings.lang] + '<b style="color: '+settings.color+'"></b>')
                    ),
                    div('div', 'events').append(
                        div('div', 'gradient-wood'),
                        div('div', 'events-list')
                    )
                )
            );
            
            // Adding day boxes
            for (var i = 0; i < 42; i++) {
                $this.find('.days').append(div('div', 'day'));
            }
            
            // Adding day names fields
            for (var i = 0; i < 7; i++) {
              $this.find('.day-names').append(div('div', 'day-name').addClass(i>0&&i<6?"":"light-grey").text(dayNames[settings.lang][i]));
            }

            var date = new Date(settings.customDay);
            var year = date.getFullYear();
            var month = date.getMonth();
            var day = date.getDate();
            
            var isLeapYear = function(year1) {
                var f = new Date();
                f.setYear(year1);
                f.setMonth(1);
                f.setDate(29);
                return f.getDate() == 29;
            };
        
            var feb;
            var febCalc = function(feb) { 
                if (isLeapYear(year) === true) { feb = 29; } else { feb = 28; } 
                return feb;
            };
            var monthDays = new Array(31, febCalc(feb), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

            calcWeeks();
            //calcMonth();

            function calcWeeks() {
                /////$this.find('.header h1').html(monthNames[settings.lang][month] + ' ' + year);
                $this.find('.title-r').html(year + "年" + monthNames[settings.lang][month]);
              
                var weekStart = new Date();  //当前日期
                var nowDayOfWeek = weekStart.getDay();  //今天是本周的第几天 
                weekStart = new Date(year, month, day - nowDayOfWeek); //获得上周的开始日期

                $this.find('.day').html('&nbsp;');
                $this.find('.day').removeClass('everyday').removeClass('this-month').removeClass('next-month').removeClass('day-before');
                var d = weekStart;
                var everyday = "day-before";
                for (var i = 0; i < 28; i++) { //取4周28天
                    var yy = d.getFullYear();
                    var mm = d.getMonth();
                    var dd = d.getDate();
                    if(dd == day){
                      everyday = "everyday";
                      $this.find('.day').eq(i).addClass(everyday).addClass('this-month').addClass('today').attr('data-date', formatDate(yy,mm+1,dd)).html(dd);
                    }else{
                      if ( mm != date.getMonth() ) {
                        $this.find('.day').eq(i).addClass(everyday).addClass('next-month').attr('data-date', formatDate(yy,mm+1,dd)).html(dd);
                      }else{
                        $this.find('.day').eq(i).addClass(everyday).addClass('this-month').attr('data-date', formatDate(yy,mm+1,dd)).html(dd);
                      }
                    }

                    d.setDate(d.getDate()+1);//获取AddDayCount天后的日期
                }
               // $this.find('.day.today').css('color', settings.color); //2017-04-22 by linda 去掉了当天默认颜色
                $this.find('.day.next-month').css('color', '#cccccc');
                $this.find('.day.day-before').css('color', '#eeeeee');
                // added event
                var src = "";
                var j = 0 ;
                $this.find('.added-event').each(function(i){
                    $(this).attr('data-id', i);
                    $this.find('.everyday[data-date="' + $(this).attr('data-date') + '"]').append(
                        div('div','event-single').attr('data-id', i).append(
//                            div('p','').html($(this).attr('data-title')+ "  面试   " + $(this).attr('data-time'))
                        	div('span','').html(j == 0 ? (src = $(this).attr('data-role')) : ((src = "") && j ++)).hide(),
                        	$(this).attr('data-role') == 1 ? div('p','float-l middle').html('<img src="../doc/images/HC/date_mark2.png" /><span class="f12" style="color: #727171;font-weight: normal;padding-left: 3px;">顾问面试</span>').css("padding-right","5px") : div('p','float-l').html('<img src="../doc/images/HC/date_mark.png"/>').css("padding-right","5px"),
                       		div('p','').html($(this).attr('data-title'))
                            			.addClass("bold f16 pdl10 middle").css("margin-left","-15px"),
                            div('div','details').append("<img class='float-l mgr5' height='13' src='../doc/images/HC/time.png' />").append(
                                    div('div').text($(this).attr('data-time'))
                              ).css("padding-left","10px"),
                            div('div','details').append("<img class='float-l' style='margin: 8px 2px 0 6px;' height='19' src='../doc/images/HC/location.png' />").append(
                                  div('div').text($(this).attr('data-detail')).css("border-bottom","1px solid #e3e3e3")
                                  			.css("padding","10px 0 12px 10px").css("color","#929292").addClass("middle")
                            )
                        )
                    );
//                    $this.find('.day').has('.event-single').addClass('have-event').addClass('iii').css("color","#fff"); //.prepend(div('i',''));
                    //面试icon颜色变化
                    if(src == 0){
                    	$this.find('.everyday[data-date="' + $(this).attr('data-date') + '"]').addClass('have-event').addClass('iii').css("color","#fff");
                    }else{
                    	$this.find('.everyday[data-date="' + $(this).attr('data-date') + '"]').addClass('have-event').addClass('iii2').css("color","#fff");
                    }
                    
                });
                calcTotalDayAgain();  
            }

            //格式化日期：yyyy-MM-dd
            function formatDate(y,m,d) {
              var myyear = y; 
              var mymonth = m; 
              var myday = d; 
                if(m < 10) mymonth = "0" + mymonth;
                if(d < 10) myday = "0" + myday;
                return (myyear+"-"+mymonth + "-" + myday);
            }
            
            var $erase = $this.find('.event-single .erase');
            $this.find('.jalendar-pages').css({'width' : $this.find('.jalendar-pages').width() });
            var jalendarWoodW = $this.find('.jalendar-wood').width();
            var woodBottomW = $this.find('.wood-bottom').width();
            var jalendarWoodH = $this.find('.jalendar-wood').height();
            var woodBottomH = $this.find('.wood-bottom').height();

            // calculate for scroll
            function calcScroll() {
                if ( $this.find('.events-list').height() < $this.find('.events').height() ) { $this.find('.gradient-wood').hide(); $this.find('.events-list').css('border', 'none') } else { $this.find('.gradient-wood').show(); }
            }
            
            // Calculate total event again
            function calcTotalDayAgain() {
                var eventCount = $this.find('.everyday .event-single').length;
                $this.find('.total-bar b').text(eventCount);
                $this.find('.events h3 span b').text($this.find('.events .event-single').length)
            }
            
            function prevAddEvent() {
                $this.find('.day').removeClass('selected').removeAttr('style');
//                $this.find('.today').css('color', '#fff');//2017-04-22 by linda 去掉了当天默认颜色
                $this.find('.next-month').css('color', '#cccccc');
                $this.find('.day-before').css('color', '#eeeeee');
                $this.find('.events').hide();
            }
            var thisEvent = $this.find('.have-event');
            thisEvent.hover( function(){
              thisEvent = $(this);
              $(this).css("box-shadow","0 -3px 5px rgba(45,45,45,0.1)");
              $(this).css("z-index","3");
//              $('.today.have-event').css("color","#fff");//2017-04-22 by linda 去掉了当天默认颜色
              var eventSingle = $(this).find('.event-single')
                  $this.find('.events').css('top', ($(this).offset().top-$this.offset().top+$(this).height()+10)+'px');
                  $this.find('.events').show().find('.events-list').html(eventSingle.clone());
                  calcTotalDayAgain();
                  calcScroll();
                  
            }, function(){
                prevAddEvent();
            });
            $this.find('.events').hover(function(){
                thisEvent.css("box-shadow","0 -3px 5px rgba(45,45,45,0.1)");
                thisEvent.css("z-index","3");
                $('.today.have-event').css("color","#fff");
                $this.find('.events').show();
            },function(){
              prevAddEvent();
              $this.find('.events').hide();
            });
            $this.on('click', '.event-single .erase', function(){
                $('div[data-id=' + $(this).parents(".event-single").attr("data-id") + ']').animate({'height': 0}, function(){ 
                    $(this).remove();
                    calcTotalDayAgain();
                    calcScroll();
                });
            });

        };

    }(jQuery));

});

