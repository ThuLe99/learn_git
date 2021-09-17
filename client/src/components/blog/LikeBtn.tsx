import React, { useState, useRef } from 'react'
import {useSelector} from 'react-redux'
interface IProps {
    isLike: number
    handleLike : () =>void
    handleUnLike: () =>void
  }
  
const LikeBtn: React.FC<IProps> = ({isLike, handleLike, handleUnLike}) => {
    return (
        <>
            {
                isLike === 0
                ? <i className="far fa-heart" onClick={handleLike}></i>
                : <i className="fas fa-heart" onClick={handleUnLike}></i>
            }
        </>
    )
}

export default LikeBtn
