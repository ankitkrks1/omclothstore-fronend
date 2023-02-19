
const productReducerDefaultState=[]


const productReducer = (state=productReducerDefaultState,action)=>{
    switch (action.type){
        case 'LOAD':
            return action.list
        case 'ADD':
            return [action.product,...state]
        case 'REMOVE':
            return state.filter(prod=>prod._id!==action.prodId)
        default:
            return state;
    }
}
export default productReducer