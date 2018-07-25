


(function($){
	function Swiper(options){
		//实现按轮播图功能
		this.opts = options || {};
		this.wrap = this.opts.father;
		this.init();
		this.bindEvent();
		this.sliderAuto();
	}

	Swiper.prototype.init = function() {
		this.nowIndex = 0;
		this.timer = undefined;
		this.key = true;
		this.image = this.opts.image;
		this.len = this.image.length -1;
		this.itemwidth = parseInt(this.wrap.css('width'));
		this.createDom();
	};
	Swiper.prototype.createDom = function() {
		var len = this.len;
		var str = '';
		var imgBox = $('<ul class ="imgbox"></ul>');
		var order = $('<div class ="order"></div>');
		var list = $('<ul></ul>');
		var listStr = '';
		var btn = '<div class="btn"><span class="lef">《</span><span class="rig">》</span></div>';
		for (var i = 0; i < len; i++) {
			str += '<li><a href="#"><img src="'+this.image[i]+'"></a></li>';
			listStr +='<li></li>';
		}
		str +='<li><a href="#"><img src="'+this.image[0]+'"></a></li>';
		$(listStr).appendTo(list);
		this.wrap.append(imgBox.html(str))
			.append($(btn))
			.append(order.append(list));
			$('.order li').eq(0).addClass('active');
		$('.imgbox li').css({
			width:this.itemwidth + 'px',
			height:this.itemHeight + 'px',
		});
		$('.imgbox').css({
			width:this.itemwidth*(this.len + 1) + 'px',
			height:this.itemHeight + 'px',
		})


	};

	Swiper.prototype.bindEvent = function(){
		var self = this;
		$('.order li').add('.lef').add('.rig').on('click',function(){
			if ($(this).attr('class') == 'lef') {
				
				self.move('lef')
			}else if ($(this).attr('class') == 'rig') {
				self.move('rig')
			}else{
				self.move($(this).index());
			}
			self.changeStyle()
		});
		self.wrap.on('mouseenter',function(){
			$('.btn').show();
			clearTimeout(self.timer);
		})
		.on('mouseleave',function(){
			$('.btn').hide();
			self.slider();
		})
	}
	Swiper.prototype.move = function move(dir){
		var key = this.key;
		var self = this;
		
		var len = self.len;
		var itemwidth = self.itemwidth;
		if (key) {
			key = false;
			if (dir == 'lef' || dir == 'rig') {
				if (dir == 'lef') {
					if (self.nowIndex == 0) {
						
						$('.imgbox').css('left',-(len*itemwidth)+'px');
						self.nowIndex = len -1;
					}else{
						self.nowIndex --;
					}
				}else{
					if (self.nowIndex == len - 1) {
						$('.imgbox').animate({'left':-(len*itemwidth)+'px'},function(){
							$(this).css('left','0');
							 self.sliderAuto();
							 key = true;

						})
						self.nowIndex = 0;
					}else{
						self.nowIndex ++;
					}
				}
			}else{ 
		                                          
				self.nowIndex = dir;
			}
			self.slider();
		}	
	}	
	Swiper.prototype.slider = function(){
		var self = this;
		var nowIndex = this.nowIndex;
		var itemwidth = this.itemwidth;
	  	$('.imgbox').animate({'left':-(nowIndex*itemwidth)+'px'},function(){ 
	  		self.sliderAuto();
	  		key = true;
	  	})
	}
	Swiper.prototype.changeStyle = function(){
		var nowIndex = this.nowIndex;
		//切换class类名
		$('.active').removeClass('active');
		$('.order li').eq(nowIndex).addClass('active')
	}
	Swiper.prototype.sliderAuto = function(){
		var self = this;
		clearTimeout(self.timer);
		self.timer = setTimeout(function(){
			self.move('rig');
			self.changeStyle();
		},2000)
	}
	$.fn.extend({
		sliderImg:function(options){
			options.father = this ||$('body');
			 new Swiper(options);
		}
	})

})(jQuery)