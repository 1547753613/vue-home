import {get} from "../request/Http";


/**
 * 验证用户名是否存在
 * @param rule
 * @param value
 * @param callback
 * @returns {*}
 */
var validateAname= (rule, value, callback) => {
  if (value.indexOf(" ")!=-1){
    callback(new Error('密码不允许存在空格'));
  }
  if(value.length>10||value.length<3){
    return callback(new Error("账号在3到10为字符"))
  }
    get('/test/findname', {aname: value}).then(data => {
      if (data == 1) {
        callback(new Error('账号已存在'));
      } else {
        callback();
      }
    })

}
/**
 * 验证密码
 * @param rule
 * @param value
 * @param callback
 */
var validateApass=(rule, value, callback) => {
  if (value.indexOf(" ")!=-1){
    callback(new Error('密码不允许存在空格'));
  }
  if (value.length<6||value.length>12){
    callback(new Error('密码请在7到12位之间'));
  }
  callback();
}
/**
 * 再次校验密码
 * @param pass
 * @returns {validateApass}
 */
const validateEnApass=(pass)=> {
  var validateApass=(rule, value, callback) => {
    if (pass()!=value){
      callback(new Error("两次密码不一致"));
    }
    callback();
  }
  return validateApass;

}

/**
 * 校验身份证
 * @param rule
 * @param value
 * @param callback
 */
 const  validateIdcard=(rule, value, callback) => {
   const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
   if (!value) {
      callback(new Error('证件号码不能为空'))
   } else if (!reg.test(value)) {
      callback(new Error('证件号码格式不正确'))
   }
   get('/test/checkIdcard',{idcard:value}).then(data=>{
     if (data){
       callback();

     } else {
       callback(new Error('证件号码已有员工添加'));


     }
   })
  }
/**
 * 校验地址
 * @param address
 * @returns {Function}
 */
const validateAddress= (address)=>{
  return (rule, value, callback) => {

    if (value.indexOf(address()) == 0) {

      callback();
    }
    callback(new Error('籍贯和地址不一致'));
  }
}

export {validateAname,validateApass,validateEnApass,validateIdcard,validateAddress}
