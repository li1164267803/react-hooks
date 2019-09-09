import "./query.scss";
import API from '../../req'
import React, {Component}from 'react';
import {PickerView, Button, ActivityIndicator} from 'antd-mobile';

const formatDate = (data) => {
  const date = new Date(data)
  const pad = n => n < 10 ? `0${n}` : n;
  return `${date.getFullYear()}年${pad(date.getMonth() + 1)}月${pad(date.getDate())}日`
}
const api = new API();
class Query extends Component {
  state = {
    agentInfo: {},
    province: [],
    animating: true,
    conIsShow: false,
    provinceCode: [110000, 110101]
  }

  async componentDidMount() {
    try {
      const res = await api.getCityList();
      this.setState({province: res})
    } finally {
      this.setState({animating: false})
    }
  }

  onChange = (provinceCode) => {
    this.setState({provinceCode})
  }
  query = async () => {
    try {
      this.setState({animating: true});
      const res = await api.getAgentAetail(this.state.provinceCode[1]);
      this.setState({
        agentInfo: res,
        conIsShow: true
    })
    } finally {
      this.setState({animating: false})
    }
  }
  render() {
    let {provinceCode, province, agentInfo, conIsShow, animating} = this.state
    return (
      <div className="query">
        <div className="title">查询</div>
        <PickerView
          cols={2}
          data={province}
          value={provinceCode}
          onChange={this.onChange}
        />
        <Button onClick={this.query}>查询</Button>
        <div style={conIsShow ? {display: "block"} : {display: "none"}}>
          {
             <div>
                <div className="list">
                    <span>是否有代理：</span>
                    <span>{agentInfo.exist_agent ? "是" : "否"}</span>
                </div>
                <div className="list">
                    <span>代理价格：</span>
                    <span>{agentInfo.agent_price}</span>
                </div>
                <div className="list" style={agentInfo.exist_agent ? {display: "block"} : {display: "none"}}>
                    <span>开通时间：</span>
                    <span>{formatDate(agentInfo.agent_start_time)}</span>
                </div>
            </div>
          }
        </div>
        <ActivityIndicator toast text="加载中" animating={animating}/>
      </div>
    )
  }
}

export default Query
