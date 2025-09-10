<template>
  <h1>show center</h1>

  <a-space wrap>
    <a-button type="primary" @click="test_request">Primary Button</a-button>
  </a-space>

  <a-space direction="vertical" :size="12">
    <a-date-picker v-model:value="value2" picker="week"/>
  </a-space>

  <div class="chart" ref="chartRef"></div>

</template>


<script setup>
import {ref, onMounted} from 'vue'
import * as echarts from 'echarts'
import http from "../http/index.js"

const test_request = () => {
  http.post("http://api.uric.cn:8000/test/123/").then((res) => {
    console.log(res.data);
  })
}
const value2 = ref(null);


const chartRef = ref(null);
let chartInstance = null;

// 指定图表的配置项和数据
const option = {
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  legend: {
    data: ['销量']
  },
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
};

onMounted(() => {
  chartInstance = echarts.init(chartRef.value);
  chartInstance.setOption(option);
})

</script>

<style>
.chart {
  width: 600px;
  height: 400px;
}

</style>
