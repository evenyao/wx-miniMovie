var app = getApp();

Component({
  
  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的属性列表 */
  properties: {
    name: {
      type: String,
      value: 'Car'
    }
  },

  /* 组件的初始数据 */
  data: {
    dataList: [],
  },

  /* 组件声明周期函数 */
  lifetimes: {
    attached: function () {
      this.getUsData()
    },
    moved: function () { 

    },
    detached: function () { 

    },
  },

  /* 组件的方法列表 */
  methods: {
    getUsData(){
      
    }
  }
  
})