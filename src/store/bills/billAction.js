import axios from 'axios'
const url = process.env.REACT_APP_API_URL

//Initially Bill loading from DB
const loadBill =(list)=>(
    {
        type:'LOAD',
        list
    }
)
export const startLoadIni = (query)=>{
    return async (dispatch)=>{
        try {
            console.log('action',query)
            const res = await axios.get(`${url}/bills${query}`,{headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${localStorage.getItem('Token')}`
            }})
            console.log(res)
            dispatch(loadBill(res.data))
        } catch (error) {
            console.log(error)
        }
    }
}

//Adding Bill login is required

const addBill = (bill)=>({
    type:'ADD',
    bill
})

export const startAddBill = (bill)=>{
    return async (dispatch)=>{
        
        const res = await axios.post(`${url}/bill/add`,bill,{headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('Token')}`
        }})
        console.log(res.data)
        dispatch(addBill(res.data))
    }
}

//Remove Bill 
const remove = (billId)=>({
    type:'REMOVE',
    billId
})

export const startRemoveBill = (id)=>{
    return async (dispatch)=>{
        try {
            
            console.log(localStorage.getItem('Token'))
            const res = await axios.delete(`${url}/bill/${id}`,{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('Token')}`

                }
            })
            console.log(res)
            dispatch(remove(id))
        } catch (error) {
            console.log(error)
        }
    }

}