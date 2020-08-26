/**
 * 查询访问路由是否拥有
 * @param arr 当前登陆人的所有权限
 * @param name  访问路由名称
 * @returns {boolean}
 */
export function test(arr,name) {
    for (let obj in arr ){
      if (arr[obj].name==name) {
        return true;
      }
    }
    return false;
}

/**
 * 查询操作权限是否拥有
 * @param arr
 * @param name  url
 */
export function testauth(arr,name) {
  for (let obj in arr ){
    if (arr[obj].url==name) {
      return true;
    }
  }
  return false;
}
