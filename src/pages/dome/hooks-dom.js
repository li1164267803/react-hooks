
import React, { useState} from 'react'
import { Slider } from 'antd-mobile';

export default function Rectangle(props) {
  const [height, setHeight] = useState(10);
  const [width, setWidth] = useState(10);
  const [color, setColor] = useState({ r: 0, g: 0, b: 0});
  const [radius, setRadius] = useState(0);

  const style = {
    marginTop: '80px',
    height: `${height}px`,
    width: `${width}px`,
    backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
    borderRadius: `${radius}px`,
  }

  return (
    <div className="container" style={{padding: "10px 20px" }}>
      <p>height:</p>
      <Slider max={300} min={10} onChange={(n) => setHeight(n || 0)}></Slider>

      <p>width:</p>
      <Slider max={300} min={10} onChange={(n) => setWidth(n || 0)}></Slider>

      <p>color: R:</p>
      <Slider max={255} min={0} onChange={(n = 0) => setColor({...color, r: n})}></Slider>

      <p>color: G:</p>
      <Slider max={255} min={0} onChange={(n = 0) => setColor({...color, g: n})}></Slider>

      <p>color: B:</p>
      <Slider max={255} min={0} onChange={(n = 0) => setColor({...color, b: n})}></Slider>

      <p>Radius:</p>
      <Slider max={150} min={0} onChange={(n = 0) => setRadius(n)}></Slider>
      <div className="reatangle" style={style}></div>
    </div>
  )
}