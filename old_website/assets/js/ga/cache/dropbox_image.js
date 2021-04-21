+function ($) { "use strict";
	var dropbox = $('#dropbox_image'),
		message = $('.message', dropbox);
	
	dropbox.filedrop({
		// The name of the $_FILES entry:
		paramname:'dropbox_image',
		
		maxfiles: 5,
    	maxfilesize: 2,
		url: 'post_file.php',
		
		uploadFinished:function(i,file,response){
			//response.file
			if(response.code == '403'){
				message.html(response.status);
				$.data(file).remove();
			}
			if(typeof(response.file) != 'undefined') {
			$.data(file).find('a.delete').attr('href',''+response.file).parent().next().find('.progress').html(response.filename);
		}
			$.data(file).addClass('done');
			// response is the JSON object that post_file.php returns
		},
		
    	error: function(err, file) {
			switch(err) {
				case 'BrowserNotSupported':
					showMessage('您的浏览器不支持HTML5的文件上传！');
					break;
				case 'TooManyFiles':
					message.show();message.html('文件太多！请至多选择5');
					break;
				case 'FileTooLarge':
					message.show();message.html(file.name+'单个文件不能超过'+'2M');
					break;
				default:
					break;
			}
		},
		
		// Called before each upload is started
		beforeEach: function(file){
			if(!file.type.match(/^image\//)){
				message.show();message.html('不允许的扩展名！');
				
				// Returning false will cause the
				// file to be rejected
				return false;
			}
		},
		
		uploadStarted:function(i, file, len){
			createImage(file);
		},
		
		progressUpdated: function(i, file, progress) {
			$.data(file).find('.progress').width(progress);
		}
    	 
	});
	
	var template = '<div class="col-sm-3 preview">'+
						'<span class="imageHolder">'+
							'<img />'+
						'<a class="delete" href="#">&times;</a>'+
							'<span class="uploaded"></span>'+
						'</span>'+
						'<div class="progressHolder">'+
							'<div class="progress"></div>'+
						'</div>'+
					'</div>'; 
	
	
	function createImage(file){

		var preview = $(template), 
			image = $('img', preview);//('img', preview)
			
		var reader = new FileReader();
		
		image.width = 140;
		image.height = 140;
		
		reader.onload = function(e){
			
			// e.target.result holds the DataURL which
			// can be used as a source of the image:
			
			image.attr('src',e.target.result);
		};
		
		// Reading the file as a DataURL. When finished,
		// this will trigger the onload function above:
		reader.readAsDataURL(file);
		
		// message.hide();
		preview.appendTo(dropbox);
		
		// Associating a preview container
		// with the file, using jQuery's $.data():
		
		$.data(file,preview);
	}

	function showMessage(msg){
		message.html(msg);
	}

}(jQuery);