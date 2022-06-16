import React, { useEffect, useState } from 'react';
import todo from '../images/note.png';
import './todo.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

const getLocalItems = () => {
    let list = localStorage.getItem('List');
    console.log(list);

    if (list) {
        return JSON.parse(localStorage.getItem('List'));
    } else {
        return [];
    }
}


const Todo = () => {

    //get value state
    const [inputdata, setInputData] = useState('');
    // add item value state
    const [item, setItem] = useState(getLocalItems());
    //toogle change state
    const [toggleSubmit, setToggleSubmit] = useState(true);
    // toggle edit item to set value state
    const [isEditItem, setIsEditItem] = useState(null);
    // console.log(inputdata)

    //add item
    const addItem = () => {
        if (!inputdata) {
            alert("plz enter value");
        }else if(inputdata && !toggleSubmit ){
            setItem(
                item.map((elem)=>{
                    if(elem.id === isEditItem)
                    {
                        return { ...elem ,name:inputdata}
                    }
                    return elem;
                })
            )

            setToggleSubmit(true);
            setInputData('');
            setIsEditItem(null);

        }
        
        else {
            const allInputData = { id: new Date().getTime().toString(), name: inputdata }
            //add items
            setItem([...item, allInputData]);
            setInputData('')

        }

    }
    //delete item
    const deleteItem = (ind) => {
        // console.log(id);
        const updateItem = item.filter((elem) => {
            return ind !== elem.id;
        });

        setItem(updateItem);
    }

    //remoce all data
    const removeAll = () => {
        setItem([]);
    }

    //store adata in localstorage using useEffect()->its perform side effect in functinal component (here we use for to get and set the data  from localstorage)
    useEffect(() => {
        localStorage.setItem('List', JSON.stringify(item))

    }, [item]);

    //EDit Item In todo list

    //  1.get the id and name of the data which user clicked to edit
    // 2.then we will set the toggle mode to change the add button to edit buttton
    // 3. now update the value of setInput with name updated value to edit 
    //  4. to pass the current element Id to new state variable to reference 

    const editItem = (id) => {
        const newEditItem = item.find((elem) => {

            return elem.id === id

        })
        console.log(newEditItem);

        setToggleSubmit(false);
        setInputData(newEditItem.name)
        setIsEditItem(id);
    }


    return (
        <>
            <div className='main-div '>
                {/* for background color */}
                <div className='child-div'>
                    {/* //all center align */}

                    <figure>
                        <img src={todo} alt='logo ' />
                        <figcaption>Enter Your Todo List ✌️ </figcaption>
                    </figure>
                    <div className='addItems'>
                        <input type="text" placeholder='✍️ Add Item '
                            value={inputdata} onChange={(e) => setInputData(e.target.value)}
                        />
                        {
                            toggleSubmit ? <i className="fa fa-plus add-btn" title='add item' onClick={addItem}></i> : <i className="fa fa-edit add-btn" title='update item' onClick={addItem}></i>

                        }

                    </div>
                    <div className='showItems'>

                        {
                            item.map((elem) => {
                                return (
                                    <div className='eachItem' key={elem.id}>
                                        {/* //fetch items */}
                                        <h3>{elem.name}</h3>
                                        <div className='todo-btn'>
                                            <i className="fa fa-edit add-btn" title='edit item' onClick={() => editItem(elem.id)}></i>
                                            <i className="fa fa-trash-alt add-btn" title='delete item' onClick={() => deleteItem(elem.id)}></i>
                                        </div>

                                    </div>
                                );

                            })
                        }


                    </div>
                    <div className='showItems'>
                        <button className='btn effect04 ' data-sm-link-text="Remove All" onClick={removeAll}><span>Check List</span></button>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Todo