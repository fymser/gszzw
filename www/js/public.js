$(document).ready(function(){
	
	/*********左侧广告切换********/
	(function(){
		var num = 0;	//计数器
		var toggleObj = $('.scroll-img li');	//切换对象
		var timmerId;	//计时器
		var nextBtn = $('.next');
		var prevBtn = $('.prev');
		$('.scroll-img li:gt(0)').hide();	//页面载入隐藏大于第二章图片
		function autoToggle(){
			if(num < 3){
				num++;
				toggleObj.eq(num).fadeIn('slow').siblings().hide();
			}else{
				toggleObj.eq(0).fadeIn('slow').siblings().hide();
				num = 0;
			}
		}
		timmerId = setInterval(autoToggle,4000);
		
		//按钮移入移出
		$('.scroll-img>span').hover(function(){
			clearInterval(timmerId);
		},function(){
			timmerId = setInterval(autoToggle,4000);
		});
		
		//单击下一张
		nextBtn.click(function(){
			autoToggle();
		});
		
		//单击上一张
		prevBtn.click(function(){
			if(num == 0){
				num = 3;
				toggleObj.eq(num).fadeIn('slow').siblings().hide();
			}else if(num > 0 ){
				num--;
				toggleObj.eq(num).fadeIn('slow').siblings().hide();
			}
		});
	})();
	
	/*********左侧广告切换********/
	
	//提交网站js 
	(function(){
		$('.addsite').click(function(){
			$('.submit-websitebox').show();
			return false;
		});
		$('.close-icon').click(function(){
			if(confirm('您确定要删除此网址吗？')){
				$(this).parent().remove();
			}
		});
		$('.submit-box').find('.close').click(function(){
			$('.submit-websitebox').hide();
		});
		
	})();
	
	
	/**********今日热点box***********/
	$('.circle-num').click(function(event){
		$('.search-hot').toggle();
		$(this).addClass('active');
		event.stopPropagation();	//阻止事件冒泡
	});
	//body点击隐藏热点搜索
	$('body').click(function(event){
		$('.search-hot').hide();
	});
	$('.search-hot').click(function(event){
		event.stopPropagation();	//阻止事件冒泡
	});
	
	//判断用户是否正在浏览当前页面
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	//判断IE浏览器
	if(!(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1)){
		var hiddenProperty = 'hidden' in document ? 'hidden' :    
			'webkitHidden' in document ? 'webkitHidden' :    
			'mozHidden' in document ? 'mozHidden' :    
			null;	//兼容性检测
		var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
		var onVisibilityChange = function(){
			if (document[hiddenProperty]) {    
				$('.search-hot').hide();
			}
		}
		document.addEventListener(visibilityChangeEvent, onVisibilityChange);
	}
	/**********今日热点box***********/
	
	//表单提示语兼容性
	if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i)=="8."){ 
		var nameTips = $('.name').attr('placeholder');
		var phoneTips = $('.phone').attr('placeholder');
		var fbBookTips = $('.fb-book').attr('placeholder');
		$('.name').attr('value',nameTips);
		$('.phone').attr('value',phoneTips);
		$('.fb-book').text(fbBookTips);
	}else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/9./i)=="9."){ 
		var nameTips = $('.name').attr('placeholder');
		var phoneTips = $('.phone').attr('placeholder');
		var fbBookTips = $('.fb-book').attr('placeholder');
		$('.name').attr('value',nameTips);
		$('.phone').attr('value',phoneTips);
		$('.fb-book').text(fbBookTips);
	} 
	
	
	/**********百度搜索***********/
	(function(){
		//选中选项效果
		$('.tabs span').click(function(){
			$(this).addClass('active')
				.siblings().removeClass('active');
			$('#word').addClass('focus');	//用于后续判断切换搜索选项时按下enter键依然可以进行搜索
		});
		
		//点击搜索按钮
		$('.submit').click(function(){
			var _index;	//索引
			var targetUrl;
			var searchValue = $('#word').val();	//获取搜索框的值
			$('.tabs span').each(function(){
				//检查选中要搜索什么内容并赋值给相应的索引
				if($(this).hasClass('active')){
					_index = $(this).index();
				}
				
			});
			switch(_index){
				
				//百度搜索网页
				case 0: {
					targetUrl = 'https://www.baidu.com/s?wd='+searchValue+'&ie=utf-8&cl=3&t=12&fr=news'
					$(this).attr('href',targetUrl);
					break;
				}
				//百度搜索新闻
				case 1: {
					targetUrl = 'http://news.baidu.com/ns?word='+searchValue+'&tn=news&from=news&cl=2&rn=20&ct=1';
					$(this).attr('href',targetUrl);
					break;
				}
				//百度搜索知道
				case 2: {
					targetUrl = 'http://zhidao.baidu.com/search?ct=17&pn=0&tn=ikaslist&rn=10&word='+searchValue+'&fr=wwwt';
					$(this).attr('href',targetUrl);
					break;
				}
				//百度搜索图片
				case 3: {
					targetUrl = 'http://image.baidu.com/search/index?ct=201326592&cl=2&nc=1&lm=-1&st=-1&tn=baiduimage&istype=2&fm=&pv=&z=0&ie=utf-8&word='+searchValue;
					$(this).attr('href',targetUrl);
					break;
				}
				//百度搜索音乐
				case 4: {
					targetUrl = 'http://music.baidu.com/search?fr=zhdao&key='+searchValue;
					$(this).attr('href',targetUrl);
					break;
				}
				//百度搜索贴吧
				case 5: {
					targetUrl = 'http://tieba.baidu.com/f?ie=utf-8&kw='+searchValue;
					$(this).attr('href',targetUrl);
					break;
				}
				default:
					targetUrl = 'https://www.baidu.com/s?wd='+searchValue+'&ie=utf-8&cl=3&t=12&fr=news'
					$(this).attr('href',targetUrl);
					break;
				
			}
		});
		
		//按下回车键搜索
		//聚焦添加相应的类用于后续判断按下Enter 键的进行搜索
		$('#word').focus(function(){
			$(this).addClass('focus');
		}).blur(function(){
			$(this).removeClass('focus');
		});
		var isChooseBaidu = $('.searchBox-choose span').eq(0).find('em');
		document.onkeydown=function(event){
			var e = event || window.event || arguments.callee.caller.arguments[0];
			if(e && e.keyCode==13&&$('#word').hasClass('focus')){ // enter 键并搜索框处于聚焦状态
				var _index;	//索引
				var targetUrl;	//打开相应的url
				var searchValue = $('#word').val();	//获取搜索框的值
				$('.tabs span').each(function(){
					//检查选中要搜索什么内容并赋值给相应的索引
					if($(this).hasClass('active')){
						_index = $(this).index();
					}
				});
				switch(_index){
					//百度搜索网页
					case 0: {
						targetUrl = 'https://www.baidu.com/s?wd='+searchValue+'&ie=utf-8&cl=3&t=12&fr=news'
						window.open(targetUrl);
						break;
					}
					//百度搜索新闻
					case 1: {
						targetUrl = 'http://news.baidu.com/ns?word='+searchValue+'&tn=news&from=news&cl=2&rn=20&ct=1';
						window.open(targetUrl);
						break;
					}
					//百度搜索知道
					case 2: {
						targetUrl = 'http://zhidao.baidu.com/search?ct=17&pn=0&tn=ikaslist&rn=10&word='+searchValue+'&fr=wwwt';
						window.open(targetUrl);
						break;
					}
					//百度搜索图片
					case 3: {
						targetUrl = 'http://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=index&fr=&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word='+searchValue+'&rsp=0';
						window.open(targetUrl);
						break;
					}
					//百度搜索音乐
					case 4: {
						targetUrl = 'http://music.baidu.com/search?fr=zhdao&key='+searchValue;
						window.open(targetUrl);
						break;
					}
					//百度搜索贴吧
					case 5: {
						targetUrl = 'http://tieba.baidu.com/f?ie=utf-8&kw='+searchValue;
						window.open(targetUrl);
						break;
					}
					default:
						targetUrl = 'https://www.baidu.com/s?wd='+searchValue+'&ie=utf-8&cl=3&t=12&fr=news'
						window.open(targetUrl);
						break;
				}
			}
		}; 
	})();
	
	/**********百度搜索***********/
	
	//切换搜索方式
	$('.searchBox-choose span').click(function(){
		var _index = $(this).index();	//获取索引
		$(this).find('em').addClass('active')
			.parent().siblings().find('em').removeClass('active');
		$('.search-box').eq(_index).show().siblings('.search-box').hide();
	});
	
	/**********google搜索***********/
	$('.google-btn').click(function(){
		var keywords = $('.google-input').val();	//获取搜索关键字
		var targetUrl = 'https://www.google.com/#q='+keywords;
		$(this).attr('href',targetUrl);
	});
	
	//聚焦添加相应的类用于后续判断按下Enter
	$('.google-input').focus(function(){
		$(this).addClass('focus');
	}).blur(function(){
		$(this).removeClass('focus');
	});
	
	//google搜索按下Enter键
	$(window).keydown(function(event){
		if(event.keyCode == 13 && $('.google-input').hasClass('focus')) {
			var targetUrl;	//打开相应的url
			var keywords = $('.google-input').val();	//获取搜索框的值
			var targetUrl = 'https://www.google.com/#q='+keywords;
			window.open(targetUrl);
		}
	});
	/**********google搜索***********/
});

