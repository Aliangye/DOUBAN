(function($){
	//具体实现插件功能
	var obj = {
		init:function(opt){
			this.opt = opt;
			this.creatDom();
			this.bindEvent();
		},
		//根据传参实现DOM元素
		creatDom:function(){
			var self = this;
			var opt = self.opt;
			var wrap = opt.father;
			var len = opt.tabList.length;
			var oUl = $('<ul id="tabs"></ul>');
			var con = $('<div id="content"></div>')
			var oSpan = $('<span class="header"></>span')
			var tabHtml = '';

			for (var i = 0; i < len; i++) {
				tabHtml += ' <li><a href="#"  title="tab'+(i+1)+'">'+ opt.tabList[i]+'</a></li>'                 	
			}
			
			wrap.append(oSpan.text(opt.spanStr))
			.append(oUl.html(tabHtml))
			.append(con.html(opt.conStr))

			for(var i = 0; i < len; i++){
				$($('.conbox')[i]).attr('id','tab'+(i+1));
			}
			$('#content').find('.conbox:first').addClass('current');
			$('#tabs').find('a').eq(0).addClass('activeTab')

		},


		//实现点击切换
		bindEvent:function(){
			var self = this;
			var wrap = self.opt.father;
			$('#tabs').on('click','a',function(e){
				e.preventDefault();
				var id = $(this).attr('title');
				$('.activeTab').removeClass('activeTab');
				$(this).addClass('activeTab');
				$('.current').removeClass('current');
				$('#'+id).addClass('current');
			})
                                          
		}
	} 





	//扩展插件
	$.fn.extend({
		tab:function(option){
			option.father = this || $('body');
			obj.init(option);
		}
	})
})(jQuery)