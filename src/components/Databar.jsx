import React,{useState} from 'react'

export default function Databar({data,label,color}) {
        const [total]=useState(data.reduce((sum, num) => sum + num, 0))
  return (
        <div>{
                data.map((item,index)=>{
                        return(<Bar key={index} data={item} total={total} label={label[index]} color={color[index]}/>)
                })
        }
        </div>
  )
}
function Bar({data,total,label,color}){
        const percentage=(data/total)*100
        
        return(
                <div className='m-[-10px]'>
                        <p className='font-inter text-sm text-gray-500'>{label}</p>
                        <div className='w-50 border-[1px] rounded ' style={{borderColor:'#E8E8E8'}}>
                                <hr className='border-3 rounded'
                                style={{width:`${percentage}%`,color:`${color}`}}/>
                        </div>
                        <p className='text-right font-inter text-sm' style={{color:color}}>{data}</p>
                </div>
        )
}
