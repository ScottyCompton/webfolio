import React, {useState} from 'react'

const bkp = 
    [
        {
            name: 'xs',
            min: 0,
            max: 575
        },
        {
            name: 'sm',
            min: 576,
            max: 768
        },
        {
            name: 'md',
            min: 769,
            max: 992
        },
        {
            name: 'lg',
            min: 993,
            max: 1200
        },
        {
            name: 'xl',
            min: 1201,
            max: 32767
        }

    ];


export default (props) => {
      const w = window.innerWidth;
      return bkp.filter((item) => {
          return item.min <= w && w <= item.max;
      })
}
