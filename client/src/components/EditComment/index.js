import React, {useState} from 'react'

function EditComment (props) {

const [isEditing, setIsEditing] = useState(false)



    return(
        <div className = 'tasks-container'>
            {
                isEditing ? 
                <form>
                <input type = 'text' defaultValue = {props.item.chore}/> 
                </form>
                : <h1 onDoubleClick ={()=> setIsEditing(true)}>{props.item.chore}</h1>
            }
        </div>
        
    )
}

export default EditComment;