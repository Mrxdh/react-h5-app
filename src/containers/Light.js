import React, { Component } from 'react';
import '.././Light.css';
import * as api from 'config/kuban_api'
import * as kbUtil from 'config/kbUtil'

class Light extends Component {
  constructor(){
    super()
    this.setAreaIndex = this.setAreaIndex.bind(this)
    this.openAll = this.openAll.bind(this)
    this.closeAll = this.closeAll.bind(this)
    this.updateAllLight = this.updateAllLight.bind(this)
    this.updateLights = this.updateLights.bind(this)
    this.setUpdateAll = this.setUpdateAll.bind(this)
    this.openAreaAll = this.openAreaAll.bind(this)
    this.closeAreaAll = this.closeAreaAll.bind(this)
    this.updateAreaAll = this.updateAreaAll.bind(this)
    this.changeLightStatus = this.changeLightStatus.bind(this)
    this.state = {
      currentAreaIndex : 0,
      l_index:0,
      dataList:[],
      currentArea : {},
      // 总开关 默认是关闭， 用这个来管理一键开启和关闭
      mainSwitch : 'off'
    }
  }

  componentWillMount(){
    const query = kbUtil.parseUrl(window.location.href)
    this.param = {};
    kbUtil.saveUserInfo({
      jwt_token : query.user_token || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6OTQsInZlcnNpb24iOjEsImV4cCI6MTUwNDgzOTcxMiwiaWF0IjoxNTA0NTgwNTEyLCJlbnRlcnByaXNlX2lkIjpudWxsfQ.2yL--Z-CR4N_awD4TMicQFf4G4HLq86vcOVChHqWuHo'
    })
    this.setState({
      query
    })
    this.getData(query)
  }

  parseData(data){
    const { currentAreaIndex } = this.state
    let newData = {}
    data.forEach(json => {
      const device = newData[json.area.id]
      const newDevice = {
        ...json,
        status : 'off'
      }
      if (device) {
        return device.lightList.push(newDevice)
      }
      newData[json.area.id] = {
        ...json.area,
        lightList : [
          newDevice
        ]
      }
    })

    let newList = Object.values(newData)

    this.setState({
      dataList: newList,
      currentArea : newList[currentAreaIndex]
    })
  }

  getData(params) {
    api.getSmartPlugs({
      location_id : params.location_id
    }).then(res => {
      this.parseData(res);
    }, error => {

    })
  }

  changeLightStatus (item, index) {
    const nextStatus = item.status === 'on' ? 'off' : 'on'
    const { dataList, currentAreaIndex } = this.state

    let newList = dataList.slice()
    newList[currentAreaIndex].lightList[index].status = nextStatus

    this.updateAllLight(nextStatus, {
      controller_id : item.controller_id
    }).then(json => {
      this.setState({
        dataList: newList,
        currentArea : newList[currentAreaIndex]
      })
    })
  }


  setAreaIndex(index){
    const { dataList } = this.state
    this.setState({
      currentAreaIndex : index,
      currentArea : dataList[index]
    })
  }

  renderLight () {
    const { dataList, currentAreaIndex, currentArea } = this.state;
    if (!dataList.length || currentAreaIndex === -1) {
      return <div></div>
    }

    const lightList = currentArea.lightList
    return lightList.map((item,index)=>{
      return (
        <div className="single_switch" key={ index }>
            <div className="single_l">
              <span><img src="" alt=""/></span>
              <span>{ item.name }</span>
            </div>
            <div className="single_r" onClick={ this.changeLightStatus.bind(null, item, index) }>
              {
                item.status
              }
              <img src="https://media-ssl.kuban.io/static/h5/images/icon_switch%20down@1x.png" alt=""/>
            </div>
        </div>
      )
    })
  }

  updateAllLight (type, options = {}) {
    const { query } = this.state
    return new Promise((resolve, reject) => {
      api.postSwitch({
        operation : type,
        location_id : query.location_id,
        ...options
      }).then(json => {
        resolve(json)
      }, error => {
        alert(error.message || (error._error && error._error.message))
        reject(error)
      })
    })
  }

  updateLights (type) {
    const { dataList } = this.state
    let newList = dataList.slice()
    newList = newList.map(json => {
      json.lightList = json.lightList.map(light => {
        light.status = type
        return light
      })
      return json
    })

    this.setState({
      dataList : newList
    })
  }

  setUpdateAll (status) {
    this.setState({
      mainSwitch : status
    })
    this.updateLights(status)
  }

  openAll () {
    this.updateAllLight('on').then(this.setUpdateAll.bind(null, 'on'))
  }

  closeAll () {
    this.updateAllLight('off').then(this.setUpdateAll.bind(null, 'off'))
  }

  updateAreaAll (type) {
    const { dataList, currentAreaIndex } = this.state
    let newList = dataList.slice()
    let newCurrentArea = newList[currentAreaIndex]

    newCurrentArea.lightList = newCurrentArea.lightList.map(light => {
      light.status = type
      return light
    })

    this.setState({
      dataList : newList
    })
  }

  openAreaAll () {
    const { currentArea } = this.state
    this.updateAllLight('on', {
      area_id : currentArea.id
    }).then(this.updateAreaAll.bind(null, 'on'))
  }

  closeAreaAll () {
    const { currentArea } = this.state
    this.updateAllLight('off', {
      area_id : currentArea.id
    }).then(this.updateAreaAll.bind(null, 'off'))
  }

  render() {
    const { dataList, currentAreaIndex, mainSwitch} = this.state;

    return (
      <div className="l_container">
        <div className="header">
          <div className="header_img"><img src="https://media-ssl.kuban.io/static/h5/images/img-icon-down@1x.png" alt=""/>{ mainSwitch === 'off' ? '关灯状态' : '开灯状态' }</div>
          <div className="header_button">
            <span onClick={ this.openAll }>一键开启</span>
            <span onClick={ this.closeAll }>一键关闭</span>
          </div>
        </div>
        <div className="l_nav">
          <ul>
            {
              dataList.map((item, index)=>{
                let style = currentAreaIndex===index ? {opacity:1,borderBottom:'solid 3px #ff5a60'} : {opacity:0.58,borderBottom:'none'};
                return <li key={index} onClick={ this.setAreaIndex.bind(null, index) } style={style}>{item.name}</li>
              })
            }
          </ul>
        </div>
        <div className="l_subnav">
          <div className="subnav_l">总开关</div>
          <div className="subnav_r">
            <span onClick={ this.openAreaAll }>全部开启</span>
            <span onClick={ this.closeAreaAll }>全部关闭</span>
          </div>
        </div>
        <div className="l_content">
          {
            this.renderLight()
          }
        </div>
      </div>
    );
  }
}

export default Light