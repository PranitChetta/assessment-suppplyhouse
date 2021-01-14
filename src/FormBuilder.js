import { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { uuid } from 'uuidv4';
import Contact from './Contact';
import './index.css'

function FormBuilder() {

    let ItemIndex = 1;
    const [counter, setCounter] = useState(0);
    let s;
    useEffect(() => {
        s = setInterval(() => {
            setCounter(state => (state + 1));
            // console.log("s....."+counter);
        }, 500);
    }, []);
    useEffect(() => {
        if (counter > 9) {
            // console.log("clear....."+counter);
            clearInterval(s);
        }
    }, [counter]);

    const [copyCount, setCopyCount] = useState(1)
    const [strFormTitle, setFormTitle] = useState("");
    const [strFormDescription, setFormDescription] = useState("");
    const [arrFormQuestion, setFormQuestions] = useState([{ "qid": ItemIndex, "que": "fghfghfgh", "option": "" }]);


    const itemsFromBackend = [
        { id: uuid(), content: <Contact copyCount={ItemIndex} event={() => test()} removeQuestion={() => removeQuestion(ItemIndex)} arrFormQuestion={arrFormQuestion} controlQuestionHandler={()=>controlQuestionHandler()} /> },
    ]

    function test() {
        ItemIndex++;
        var obj = {
            id: uuid(),
            content: <Contact copyCount={ItemIndex} event={() => test()} removeQuestion={() => removeQuestion(ItemIndex)} arrFormQuestion={arrFormQuestion} controlQuestionHandler={()=>controlQuestionHandler()} />
        };
        itemsFromBackend.push(obj);
        console.log(itemsFromBackend);

        var data = arrFormQuestion;
        data.push({ "qid": ItemIndex, "que": "", "option": "" });
        setFormQuestions(data);
    }

    const removeQuestion = (e) => {
        alert("remove question " + e);
        // itemsFromBackend.splice(e-1,1);
    }

    const columnsFromBackend = {
        [uuid()]: {
            name: "todo",
            items: itemsFromBackend
        }
    }

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;
        const column = columns[source.droppableId];
        const copiedItems = [...column.items]
        const [removed] = copiedItems.splice(source.index, 1)
        copiedItems.splice(destination.index, 0, removed);

        setColumns({
            ...columns, [source.droppableId]: {
                ...columns, items: copiedItems
            }
        })
    };

    const [columns, setColumns] = useState(columnsFromBackend)

    const controlHandler = (e) => {
        if (e.target.name === "name") {
            setFormTitle(e.target.value);
        }
        else if (e.target.name === "desc") {
            setFormDescription(e.target.value);
        }
    }

    const controlQuestionHandler=(index,e)=>{
console.log(index+" "+e.target.name);
    }

    return (
        <div >
            {/* onChange={this.handleChange.bind(this)}> */}
            <div className="border col-md-4">
                <input typp="text" className="form-control" name="name" placeholder="Form Title" onChange={(e) => controlHandler(e)} /> <br />

                <input type="text" className="form-control" name="desc" placeholder="Form Description (Optional)" onChange={(e) => controlHandler(e)} />
            </div>


            {/* From here your drag and drop starts */}
            <div style={{ display: 'flex', height: '100%', width: '100%' }}>
                <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns).map(([id, column]) => {
                        return (
                            <div className="firstclass" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Droppable droppableId={id} key={id}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div {...provided.droppableProps} ref={provided.innerRef}
                                                style={{/*background: snapshot.isDraggingOver ? 'white' : 'white'*/
                                                    padding: 5, width: 400, minHeight: 500
                                                }}>
                                                {column.items.map((item, index) => {
                                                    return (
                                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div ref={provided.innerRef} {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={{
                                                                            userSelect: 'none', padding: 16, margin: '0 0 8px 0',
                                                                            minHeight: '50px',
                                                                            backgroundColor: snapshot.isDragging ? 'yellow' : 'lightgray',
                                                                            color: 'while', ...provided.draggableProps.style
                                                                        }}>
                                                                        {item.content}
                                                                    </div>
                                                                )
                                                            }}
                                                        </Draggable>
                                                    )
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }}
                                </Droppable>
                            </div>
                        )
                    })}
                </DragDropContext>
            </div>
        </div>
    )
}

export default FormBuilder;
