import axios from 'axios'
const url = process.env.REACT_APP_API_URL

//Initially product loading from DB
const loadProd =(list)=>(
    {
        type:'LOAD',
        list
    }
)
export const startLoadIni = (query)=>{
    return async (dispatch)=>{
        try {
            console.log('action',query)
            const res = await axios.get(`${url}/products${query}`)
            
            dispatch(loadProd(res.data))
        } catch (error) {
            console.log(error)
        }
    }
}

//Adding Product login is required

const addProd = (product)=>({
    type:'ADD',
    product
})

export const startAddProd = (prod)=>{
    return async (dispatch)=>{
        
        const res = await axios.post(`${url}/product`,prod,{headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('Token')}`
        }})
        console.log(res.data)
        dispatch(addProd(res.data))
    }
}

//shown user's product
export const startUserProdLoad = (query)=>{
    return async (dispatch)=>{
        try {
            
      
            const res = await axios.post(`${url}/user/products${query}`,{},{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('Token')}`

                }
            })
            
            dispatch(loadProd(res.data))
        } catch (error) {
            console.log(error)
        }
    }   
}

//Remove Product 
const remove = (prodId)=>({
    type:'REMOVE',
    prodId
})

export const startRemoveProd = (id)=>{
    return async (dispatch)=>{
        try {
            
            console.log(localStorage.getItem('Token'))
            const res = await axios.delete(`${url}/product/${id}`,{
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