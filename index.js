
var exec = require('mz/child_process').execFile;
var assert = require('assert');

module.exports = function (filename, opts) {
  let args = [
    '-v', 'error',
    '-of', 'flat=s=_',
    '-select_streams', 'v:0',
    '-show_entries', 'stream=height,width']
  if(opts && opts.transport) {
    args.push('-rtsp_transport');
    args.push(opts.transport);
  }
  opts.push(filename);
  
  return exec('ffprobe', args).then(function (out) {
    var stdout = out[0].toString('utf8');
    var width = /width=(\d+)/.exec(stdout);
    var height = /height=(\d+)/.exec(stdout);
    assert(width && height, 'No dimensions found!');
    return {
      width: parseInt(width[1]),
      height: parseInt(height[1]),
    };
  });
}
