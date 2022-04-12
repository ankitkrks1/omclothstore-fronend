
export const addUser = (user={})=>(
    {
        type:'ADD-USER',
        user
    }
)

export const removeUser= ()=>({
    type:'REMOVE-USER'
    
})