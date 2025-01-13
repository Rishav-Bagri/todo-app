import { useState } from "react";

let todoid = 1;
function App() {
    const [todo, settodo] = useState([]);

    const markAsDone = (id) => {
        const updatedTodos = [...todo];
        for (let i = 0; i < updatedTodos.length; i++) {
            if (updatedTodos[i].id === id) {
                updatedTodos[i].done = true;
                break;
            }
        }
        settodo(updatedTodos);
    };

    const addtodo = (title, description) => {
        if (title && description) {
            const newTodo = {
                id: todoid++,
                title,
                description,
                done: false,
            };
            settodo([...todo, newTodo]);
        } else {
            alert("Please provide both a title and a description.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
                <div className="text-center text-2xl font-bold text-red-500 mb-4">
                    TODO LIST
                </div>

                {/* Add Todo Form Container */}
                <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-md">
                    <AddTodo fn={addtodo}></AddTodo>
                </div>

                {/* Todo List - Centered in Row */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
                    {todo
                        .filter((todo) => !todo.done)
                        .map((todo) => {
                            return (
                                <Todocard
                                    key={todo.id}
                                    title={todo.title}
                                    description={todo.description}
                                    done={() => markAsDone(todo.id)}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

function AddTodo({ fn }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    return (
        <div>
            {/* Title Input */}
            <input
                type="text"
                placeholder="Title"
                className="border border-gray-300 p-2 rounded w-full mb-4"
                onChange={(e) => setTitle(e.target.value)}
            />

            {/* Description Input */}
            <input
                type="text"
                placeholder="Description"
                className="border border-gray-300 p-2 rounded w-full mb-4"
                onChange={(e) => setDescription(e.target.value)}
            />

            {/* Add Todo Button */}
            <button
                onClick={() => {
                    fn(title, description);
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded w-full"
            >
                Add Todo
            </button>
        </div>
    );
}

function Todocard({ title, description, done }) {
    return (
        <div className="border border-gray-300 rounded-lg p-4 shadow-lg bg-white">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <button
                onClick={done}
                className="bg-green-500 text-white py-2 px-4 rounded"
            >
                Mark As Done
            </button>
        </div>
    );
}

export default App;
