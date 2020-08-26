import { Message }  from 'element-ui';
export function inform (data,onClose) {


  Message({
        showClose: true,
        message:data.msg,
        type:data.code==201?"error":"success",
        offset:300,
        duration:1000,
        onClose //关闭回调函数
    });
}
//警告
export function warning(mess,onClose) {
  Message({
    showClose: true,
    message:mess,
    type:"warning",
    offset:300,
    duration:1000,
    onClose //关闭回调函数
  });
}

export function success(mess,onClose) {
  Message({
    showClose: true,
    message: mess,
    type: "success",
    offset: 300,
    duration: 1000,
    onClose //关闭回调函数
  });
}
  export function error(mess,onClose) {
    Message({
      showClose: true,
      message: mess,
      type: "error",
      offset: 300,
      duration: 1000,
      onClose //关闭回调函数
    });
  }

