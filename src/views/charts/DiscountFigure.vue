<template>
  <div>
    <ve-line :data="chartData"></ve-line>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      chartData: {
        columns: ['日期', '访问用户', '下单用户'],
        rows: [
          { 日期: '9/5', 访问用户: 33, 下单用户: 17 },
          { 日期: '9/6', 访问用户: 15, 下单用户: 0 },
          { 日期: '9/7', 访问用户: 9, 下单用户: 0 },
          { 日期: '9/8', 访问用户: 17, 下单用户: 7 },
          { 日期: '9/9', 访问用户: 27, 下单用户: 4 },
          { 日期: '9/10', 访问用户: 45, 下单用户: 13 }
        ]
      }
    }
  }
}
</script>
