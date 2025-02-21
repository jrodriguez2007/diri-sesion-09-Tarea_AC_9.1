import { DetailsList, IColumn } from "@fluentui/react/lib/DetailsList";
import { MdEdit, MdDelete } from "react-icons/md";
import {Student} from '../entities/Student';
import { useEffect, useState } from "react";
import uuid from 'react-uuid';
import { FormattedMessage, useIntl } from "react-intl";


interface EnrolListProps {
    students: Student | undefined;
    onStudentRemoved: (student: Student) => void;
    onStudentEditing: (student: Student) => void;
}

function EnrolList({ students, onStudentRemoved, onStudentEditing }: EnrolListProps) {
    const intl = useIntl();
    const [items, setItems] = useState<Student[]>([]);

    useEffect(() => {
        if (students) {
            const currentID = students.id;
            if (currentID == undefined) {
                const student: Student = {
                ...students,
                id: uuid()
            };
            setItems([...items, student]);
            } else {
                const studentIndex = items.findIndex(item => item.id === students!.id);
                if (studentIndex !== -1) {
                const updatedItems = [...items];
                updatedItems[studentIndex] = { ...students }; // reemplazamos el estudiante
                setItems(updatedItems);
                } else {
                //TODO Ya lo gestionaremos mejor...
                console.log("No encontramos el estudiante con ID " + studentIndex);
                }
            }
        }
    }, [students])

    const columns: IColumn[] = [
        { 
            key: "firstName", 
            name: intl.formatMessage({
                id: 'app.students.list.head.name',
                defaultMessage: 'Nombre'
            }), 
            fieldName: "firstName", 
            minWidth: 120, 
            maxWidth: 200, 
            isResizable: true 
        },
        { 
            key: "lastName", 
            name: intl.formatMessage({
                id: 'app.students.list.head.lastname',
                defaultMessage: 'Apellido'
            }), 
            fieldName: "lastName", 
            minWidth: 100, 
            maxWidth: 200, 
            isResizable: true 
        },
        { 
            key: "program", 
            name: intl.formatMessage({
                id: 'app.students.list.head.program',
                defaultMessage: 'Programa'
            }), 
            fieldName: "program", 
            minWidth: 100, 
            maxWidth: 200, 
            isResizable: true 
        },
        {
            key: 'actions',
            name: intl.formatMessage({
                id: 'app.students.list.head.actions',
                defaultMessage: 'Acciones'
            }),
            fieldName: 'actions',
            minWidth: 50,
            maxWidth: 50,
            isResizable: true,
            onRender: (item: any) => (
            <div className="flex items-center">
                    <MdEdit
                        onClick={() => handleEdit(item)}
                        className="cursor-pointer mr-4 text-orange-600 hover:text-orange-500"
                        size={20}
                    />
                    <MdDelete
                        onClick={() => handleDelete(item)}
                        className="cursor-pointer text-red-600 hover:text-red-500"
                        size={20}
                    />
            </div>
 ),
        }
    ];

    
    const handleDelete = (item: Student) => {
        setItems(items.filter(i => i.id !== item.id));
        onStudentRemoved(item);
    }

    const handleEdit = (item: Student) => {
        onStudentEditing(item);
    }

    return (
        <div className="p-4 bg-white rounded shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold">
            <FormattedMessage id="app.students.list.head.title" defaultMessage="Lista de Estudiantes" />
          </h2>
          <div className="overflow-x-auto text-sm">
            <DetailsList items={items} columns={columns} />
          </div>
        </div>
      );
}

export default EnrolList;
