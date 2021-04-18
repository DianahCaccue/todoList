import React,{Fragment,useState} from "react"

const InputTodo=()=>{
  const[description,setDescription]=useState("");
  var query=`mutation createTodo ($todo_id:Int,$description:String)
  {
  createTodo(todo_id:$todo_id,description:$description)
  } `
  const onSubmitForm= async(e)=> {
      e.preventDefault();
      try {
          //const body={description};
          const response= await fetch("http://localhost:4000/graphql",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                query,
                variables:description
            })
          });
          window.location="/";
      } catch (err) {
          console.error(err.message)
      }
  }

    return(
        <Fragment>
             <h2 className="text-center mt-5">Todo List</h2>
             <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                 <input type="text" className="form-control" value={description} 
                 onChange={e => setDescription(e.target.value)}/>
                 <button className="btn btn-success">Add</button>
             </form>
        </Fragment>
       
    )

}
export default InputTodo