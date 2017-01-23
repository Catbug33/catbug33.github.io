$(document).ready(function(){

	var stream = {
		mp3: "http://eu3.radioboss.fm/proxy/yevedo02?mp=/stream"
	};
	// ready = false;

	$("#jquery_jplayer_1").jPlayer({
		ready: function (event) {
			ready = true;
			$(this).jPlayer("setMedia", stream);
		},
		pause: function() {
			$(this).jPlayer("clearMedia");
		},
		error: function(event) {
			if(ready && event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET) {
				// Setup the media stream again and play it.
				$(this).jPlayer("setMedia", stream).jPlayer("play");
			}
		},
		swfPath: "jplayer",
		supplied: "mp3",
		preload: "none",
		wmode: "window",
		useStateClassSkin: true,
		autoBlur: false,
		keyEnabled: true
	});

});

var entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};

function escapeHtml(string) {
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
}

$('#play').click(function() {
  $('.jp-play').toggleClass('play pause');
});
function change_info() {

	$(document).ready(function () {
		$.ajax({
				type: 'GET',
				url: 'https://eu3.radioboss.fm:2199/rpc/yevedo02/streaminfo.get',
				data: { get_param: 'data' },
				success: function (data) {
						results = data.data;
						console.log(results);
						title = results[0].track.title;
						console.log(title);
						artist = results[0].track.artist;

						 $('#current_song').html(escapeHtml(title));
						 $('#current_artist').html(escapeHtml(artist));

						// if(results[0] == '' ){
						// 	$(".poster").attr("src",'http://live.vozduh.fm/unknown.png');
						// }else {
						// 	$(".poster").attr("src",results[0]);
						// }

				}
		});
	});
 }
change_info();
setInterval(function(){
		change_info ();
	}, 10000);
