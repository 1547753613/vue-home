export function test(arr,name) {
    for (let obj in arr ){
      if (arr[obj].name==name) {
        return true;
      }
    }
    return false;
}
