const fetchVideoInfo = require('youtube-info');
const Constants = require('../libs/Constants');
const ReturnResult = require('../libs/ReturnResult');

exports.getYoutubeVideoInfo = function(req, res, next) {
  var video_id = req.body.link.split('v=')[1];
  var ampersandPosition = video_id.indexOf('&');
  if (ampersandPosition != -1) {
    video_id = video_id.substring(0, ampersandPosition);
  }
  fetchVideoInfo(video_id, function(err, videoInfo) {
    if (err)
      return res.jsonp(
        new ReturnResult(
          'Error',
          null,
          null,
          Constants.messages.INVALID_VIDEO_LINK
        )
      );
    return res.jsonp(
      new ReturnResult(
        videoInfo,
        null,
        Constants.messages.VIDEO_INFO_FOUND,
        null
      )
    );
  });
};
