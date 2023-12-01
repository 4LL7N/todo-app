import { useState } from 'react'
import './App.css'

let dolistArray:any=[]
let ActiveArr:any=[]
let complitedArr:any =[]
let filterButton = 1
interface Todotype{
  text:string
  done:boolean
  id:number
}
function App() {
  const [doList,setdoList] =useState<Todotype[]>([])
  const [dayNight,setdayNight] = useState(true)
  const [isDone , setIsDone] = useState(false)
  
  // let isDone = false
  let random = Math.random() * Math.random() * Math.random()

  function todo(event:any){
    event.preventDefault()
    let newObj={
      text : event.target.value,
      done: isDone,
      id: random
    }
    dolistArray.push(newObj)
    setdoList([...dolistArray])
    
  }
  function clickonCheck(id:number){
    let index = doList.findIndex((item) => item.id == id )
    doList[index].done = !doList[index].done 
    setdoList([...doList])
  }
  
  function clear(){ 
    dolistArray = []
    setdoList([...dolistArray])
  }

  function listFilter(key:number){
    if(key == 1){
      filterButton =1
      setdoList([...dolistArray])
    }else if(key == 2){
      filterButton=2
      ActiveArr = dolistArray.filter((obj:any) => obj.done == false)
      setdoList([...ActiveArr])
    }else{
      filterButton =3
      complitedArr = dolistArray.filter((obj:any) => obj.done == true)
      setdoList([...complitedArr])
    }

    

  }

  function Delete(id:number){
    for(let i=0 ; i<dolistArray.length ;i++){
      if(dolistArray[i].id == id){
        dolistArray.splice(i , 1);
      }
    }
    listFilter(filterButton)
    // setdoList([...dolistArray])
    
  }

  console.log(doList)
  return (
    <>
      <div className= {`application ${dayNight ? "applicationLight":"applicationDark"}`}  >
        <header id="header">
          <h1 id="head">TODO</h1>
          <img src={dayNight ? "./images/icon-moon.svg" :"./images/icon-sun.svg" } id="dayNightImg" onClick={() => {setdayNight(!dayNight)}}/>
        </header>
        <form name="listInput" className={`input ${dayNight? "light":"dark"}`}>
          <input type="checkbox" name='input' className={`checkbox ${dayNight?"checkboxLight":"checkboxDark"}`} onClick={() => {setIsDone(!isDone)}} />
          <input type="text" name="textInput" className={`textInput text ${dayNight?"lightTextInput":"darkTextInput"}`} placeholder='Currently typing' onKeyDown={(event) => {if(event.key == "Enter"){ todo(event)}}}/>
        </form>
        <div className='list'>
          <div className='dolist'>
            {doList.map((item:Todotype,index:number) =>{
              console.log(index)
              return(<div key={item.id} className={`toDo ${dayNight? "light":"dark"} ${dayNight?"bottomLineligth":"bottomLinedark"} ${index ==0?"firstTodo":undefined}`}>
                        <div key={random} id="textcheckbox">
                          <input type="checkbox" name='isDoneCheck' className={`checkbox ${dayNight?"checkboxLight":"checkboxDark"} `} checked={item.done} onChange={() => clickonCheck(item.id)}/>
                          <p className={`text ${dayNight? "light":"dark"} ${item.done?dayNight?"textLinedlight":"textLinedDark":undefined}`}>{item.text}</p>
                        </div>
                        <img className="deleteButton" src='./images/icon-cross.svg' onClick={()=>Delete(item.id)} />
                    </div>)
            })}
          </div>
          <div className={`toDo ${dayNight? "light":"dark"} ${doList.length==0?"onlymanipulationBox":"manipulationBox"}` }>
            <p className={`cleartext ${dayNight?"clearlight":"clearDark"}`}>{doList.length} items left</p>
            <div className={`filter ${dayNight? "light":"dark"}`}>
              <p  className={`filterButton ${filterButton==1?"filterButtonActivated":dayNight?"filterButtonNotActivatedlight":"filterButtonNotActivatedDark"}`} onClick={() => {listFilter(1)}}>All</p>
              <p  className={`filterButton ${filterButton==2?"filterButtonActivated":dayNight?"filterButtonNotActivatedlight":"filterButtonNotActivatedDark"}`} onClick={() => {listFilter(2)}}>Active</p>
              <p  className={`filterButton ${filterButton==3?"filterButtonActivated":dayNight?"filterButtonNotActivatedlight":"filterButtonNotActivatedDark"}`} onClick={() => {listFilter(3)}}>Completed</p>
            </div>
            <p className={`cleartext ${dayNight?"clearlight":"clearDark"}`} onClick={() => {clear()}}>Clear Completed</p>
          </div>
        </div>
        <p className={`cleartext ${dayNight?"clearlight":"clearDark"} ${"ending"}`}>Drag and drop to reorder list</p>
      </div>  
    </>
  )
}

export default App
