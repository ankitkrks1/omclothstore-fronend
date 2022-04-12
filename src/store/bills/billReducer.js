
const billReducerDefaultState=[]


const billReducer = (state=billReducerDefaultState,action)=>{
    switch (action.type){
        case 'LOAD':
            return action.list
        case 'ADD':
            return [action.bill,...state]
        case 'REMOVE':
            return state.filter(prod=>prod._id!==action.billId)
        default:
            return state;
    }
}
export default billReducer