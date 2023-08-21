    import React, { useEffect, useState } from "react";
    import './Form.css'
const Form = () => {
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        city: '',
        salary: ''
    });
    const [record, setRecord] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input, [name]: value
        });
    }

    const handleSubmit = () => {
        if (editingIndex !== -1) {
            const updatedRecord = [...record];
            updatedRecord[editingIndex] = input;
            setRecord(updatedRecord);
            setEditingIndex(-1);
            localStorage.setItem('crud', JSON.stringify(updatedRecord));
        } else {
            setRecord([...record, input]);
            localStorage.setItem('crud', JSON.stringify([...record, input]));
        }
        setInput({
            name: '',
            email: '',
            password: '',
            city: '',
            salary: ''
        });
    }

    const handleEdit = (index) => {
        setInput(record[index]);
        setEditingIndex(index);
    }

    const handleDelete = (index) => {
        const updatedRecord = record.filter((_, i) => i !== index);
        setRecord(updatedRecord);
        localStorage.setItem('crud', JSON.stringify(updatedRecord));
    }

    useEffect(() => {
        let allRecord = JSON.parse(localStorage.getItem('crud'));
        if (allRecord === null) {
            setRecord([]);
        } else {
            setRecord(allRecord);
        }
    }, []);
    return (
        <center>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>City</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                    <tr>
                        <td><input type="text" name="name" onChange={handleChange} value={input.name} /></td>
                        <td><input type="text" name="email" onChange={handleChange} value={input.email} /></td>
                        <td><input type="text" name="password" onChange={handleChange} value={input.password} /></td>
                        <td><input type="text" name="city" onChange={handleChange} value={input.city} /></td>
                        <td><input type="text" name="salary" onChange={handleChange} value={input.salary} /></td>
                        <td>
                            <input
                                type="button"
                                value={editingIndex !== -1 ? "Edit" : "Submit"}
                                onClick={handleSubmit}
                            />
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {record.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.password}</td>
                            <td>{item.city}</td>
                            <td>{item.salary}</td>
                            <td>
                                <button className="edit-button" onClick={() => handleEdit(index)}>Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </center>
    )


}
export default Form;
