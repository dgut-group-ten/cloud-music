/*
 * @Description: 时间工具函数 
 * @Author: Allen Tan
 * @Date: 2019-12-09 10:44:08
 * @LastEditors: Allen Tan
 * @LastEditTime: 2019-12-09 11:07:12
 */

/**
 * @description: UTC时间转成北京时间
 * @param {utc_datetime：utc时间} 
 * @return: 北京时间
 */ 
export const utc2beijing = function (utc_datetime) {
  // 将UTC 2019-12-09T02:43:45.000+0000
  // 转为正常的时间格式 年-月-日 时:分:秒
  var T_pos = utc_datetime.indexOf('T');
  var Z_pos = utc_datetime.indexOf('.');
  var year_month_day = utc_datetime.substr(0,T_pos);
  var hour_minute_second = utc_datetime.substr(T_pos+1,Z_pos-T_pos-1);
  var new_datetime = year_month_day+" "+hour_minute_second; // 2019-12-09 02:43:45

  // 处理成为时间戳
  timestamp = new Date(Date.parse(new_datetime));
  timestamp = timestamp.getTime();
  timestamp = timestamp/1000;

  // 增加8个小时，北京时间比utc时间多八个时区
  var timestamp = timestamp+8*60*60;

  // 时间戳转为时间
  var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString('chinese',{hour12:false});
  return beijing_datetime; // 2019-12-09 02:43:45
} 