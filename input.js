(function ($) {
	//面向对象的方式进行插件封装
	var obj = {
		inint: function (options) {
			this.opt = options || {};
			this.creatdom();
			this.bindevent();
		},
		creatdom: function () {
			var htmlstr = '<div  class="inp">\
				<input type="text" class="text" placeholder="">\
				<input type="button" value="搜索" class="inpbtn"></div>';
			this.opt.father.html(htmlstr);
			$('.inp input').attr('placeholder', this.opt.text);
		},
		bindevent: function () {
			var self = this;
			$('.text').on('input', function (e) {
				e.preventDefault();
				var value = $(this).val();
				console.log(12312);
				self.getdate(value);
			})
		},
		getdate: function (val) {
			var self = this;
			var opt = self.opt;
			$.ajax({
				type: opt.type,
				url: opt.url,
				data: opt.data + val + opt.count,
				dataType: opt.dataType,
				success: function (data) {
					opt.sucFn(data);
				},
				error: function () {
					opt.errFn();
				},
			});

		}
	}

	//扩展方法
	$.fn.extend({
		search: function (options) {
			options.father = this || $('body');
			obj.inint(options);

		}
	})
})(jQuery)