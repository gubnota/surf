(function ($) {
	$(document).ready(function() {			
		if($('#block-admin-configure #edit-date-to').length) {
			$('#block-admin-configure #edit-date-to').datepicker({ dateFormat: "yy/mm/dd" });
		}
		if($('.countdown_origin').length) {
            $('.countdown_origin').each(function(){
                var count_to = new Date(); 
                count_to.setTime(parseInt($(this).text())*1000); 
                $(this).countdown({
                    until: count_to,
                    layout : $('.countdown_layout', $(this).parent()).html()
                });
            });
		}
	});	
})(jQuery);
