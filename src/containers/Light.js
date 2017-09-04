import React, { Component } from 'react';
import '.././Light.css';
import $ from 'webpack-zepto';




class Light extends Component {
  constructor(){
    super();
    this.state = {
      officeList :['101办公室','102办公室','103办公室','105办公室','105办公室','105办公室','105办公室'],
      areaLight :['顶灯','台灯','插座'],
      o_index:0,
      l_index:0,
      dataList:[]
    }
  }

  componentWillMount(){
    this.token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6OTQsInZlcnNpb24iOjEsImV4cCI6NDYyNzg3NDkyMH0.faRschS0AatcnAMJO7b9Uji77h9X3FBRmc90jspRerw';
    this.param = {};

    //this.getData({}); //区域列表数据
    this.setState({
      dataList:[
        {
          id:0,
          name:'101办公室',
          lightList:[
            {
              id:1,
              name:'台灯'
            },{
              id:2,
              name:'顶灯'
            },{
              id:3,
              name:'插座'
            }
          ]
        },{
          id:1,
          name:'102办公室',
          lightList:[
            {
              id:1,
              name:'顶灯'
            },{
              id:2,
              name:'台灯'
            },{
              id:3,
              name:'插座'
            }
          ]
        },{
          id:2,
          name:'103办公室',
          lightList:[
            {
              id:1,
              name:'台灯'
            },{
              id:2,
              name:'顶灯'
            },{
              id:3,
              name:'插座'
            }
          ]
        }
      ]
    });
  }

  dealData(data){
    /*this.setState({
      dataList:data,
    },function () {

    });*/
    this.setState({
      dataList:[
        {
          id:1,
          name:'101办公室',
          lightList:[
            {
              id:1,
              name:'台灯'
            },{
              id:2,
              name:'顶灯'
            },{
              id:3,
              name:'插座'
            }
          ]
        },{
          id:1,
          name:'102办公室',
          lightList:[
            {
              id:1,
              name:'顶灯'
            },{
              id:2,
              name:'台灯'
            },{
              id:3,
              name:'插座'
            }
          ]
        },{
          id:1,
          name:'103办公室',
          lightList:[
            {
              id:1,
              name:'台灯'
            },{
              id:2,
              name:'顶灯'
            },{
              id:3,
              name:'插座'
            }
          ]
        }
      ]
    })
  }

  getData(params) {
    var that = this;
    $.ajax({
      url: '',
      type: 'put',
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
      data: {
        operation: params.operation,
        location_id: params.location_id,
        area_id: params.area_id,
        id: params.id
      },
      success: function (res) {
        that.dealData(res);
      },
      error: function (req) {
        //alert(req.responseJSON && req.responseJSON._error && req.responseJSON._error.message)
      }
    });
  }


  getAreaData(index){
    this.param =
    //this.getData();
    this.setState({
      o_index:index
    });

  }

  controlSingle(index){
    this.setState({
      l_index:index
    })
  }

  lightList(){
    const {areaLight} = this.state;
    return areaLight.map((item,index)=>{
      return <div className="single_switch" key={index}>
        <div className="single_l">
          <span><img src="" alt=""/></span>
          <span>{item}</span>
        </div>
        <div className="single_r" onClick={this.controlSingle.bind(this,index)}>
          <img src="https://media-ssl.kuban.io/static/h5/images/icon_switch%20down@1x.png" alt=""/>
        </div>
      </div>
    })
  }


  render() {
    const {officeList,areaLight,dataList} = this.state;
    console.log(this.state,'=====')
    return (
      <div className="l_container">
        <div className="header">
          <div className="header_img"><img src="https://media-ssl.kuban.io/static/h5/images/img-icon-down@1x.png" alt=""/></div>
          <div className="header_button">
            <span>一键开启</span>
            <span>一键关闭</span>
          </div>
        </div>
        <div className="l_nav">
          <ul>
            {
              dataList.map((items,index)=>{
                let style =this.state.o_index===index?{opacity:1,borderBottom:'solid 3px #ff5a60'} :{opacity:0.58,borderBottom:'none'};
                return <li key={index} onClick={this.getAreaData.bind(this,items.id)} style={style}>{items.name}</li>
              })
            }
          </ul>
        </div>
        <div className="l_subnav">
          <div className="subnav_l">总开关</div>
          <div className="subnav_r">
            <span>全部开启</span>
            <span>全部关闭</span>
          </div>
        </div>
        <div className="l_content">
          {
            this.lightList()
          }
        </div>
      </div>
    );
  }
}

export default Light


var fake = [
  {
    id:1,
    name:'101办公室',
    lightList:[
      {
        id:1,
        name:'台灯'
      },{
        id:2,
        name:'顶灯'
      },{
        id:3,
        name:'插座'
      }
    ]
  },{
    id:1,
    name:'102办公室',
    lightList:[
      {
        id:1,
        name:'台灯'
      },{
        id:2,
        name:'顶灯'
      },{
        id:3,
        name:'插座'
      }
    ]
  },{
    id:1,
    name:'103办公室',
    lightList:[
      {
        id:1,
        name:'台灯'
      },{
        id:2,
        name:'顶灯'
      },{
        id:3,
        name:'插座'
      }
    ]
  }
]