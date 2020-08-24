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
