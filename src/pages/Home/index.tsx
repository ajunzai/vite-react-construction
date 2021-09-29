import React, { useState } from "react"
import "./App.css"
import classNames from "classnames"

const surplusImgArr = [
  "./src/assets/3.jpeg",
  "./src/assets/4.jpeg",
  "./src/assets/5.jpeg",
]
function Home() {
  const [count, setCount] = useState(0)
  const [imgArr, setImgArr] = useState([
    "./src/assets/1.jpeg",
    "./src/assets/2.jpeg",
  ])

  const nextFn = () => {
    // 计数count 和 添加的数组数量相同停止
    if (count > 3) {
      return
    }
    setCount(count + 1)
    if (surplusImgArr.length === 0) {
      return
    }
    const fakeImgArr = imgArr.slice()
    fakeImgArr.push(surplusImgArr[0])
    surplusImgArr.shift()
    console.log(surplusImgArr, fakeImgArr)
    setImgArr(fakeImgArr)
  }
  return (
    <div className="App">
      {imgArr.map((img, index) => {
        const positionTop = index - count
        return positionTop >= -1 ? (
          <div
            className='content-wrap'
            style={{ top: positionTop * 100 + "vh" }}
            key={index}
          >
            <img src={img} className="img-bg" alt="bg" />
            <button className="next-button" type="button" onClick={nextFn}>
              点击下一个
            </button>
          </div>
        ) : null
      })}
    </div>
  )
}

export default Home
