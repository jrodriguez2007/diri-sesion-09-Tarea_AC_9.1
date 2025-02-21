import { useEffect, useState } from 'react';
import EnrolmentForm from "../components/EnrolmentForm";
import EnrolList from "../components/EnrolList";
import {Student} from '../entities/Student';
import { FormattedMessage } from 'react-intl';
import '../styles/StudentsPage.css';

function StudentsPage() {
    const [program, setProgram] = useState("UG");
    const [ugEnrolments, setUGEnrolments] = useState(0);
    const [pgEnrolments, setPGEnrolments] = useState(0);
    const [students, setStudents] = useState<Student>();
    const [editingStudent, setEditingStudent] = useState<Student>();
    
    const handleChangeProgram = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProgram(event.target.value.toString());
    };
    
    const selectedEnrolments = (): number => {
        return program == "UG" ? ugEnrolments : pgEnrolments;
    }

    // Borrado
    const handleStudentRemoved = (student: Student): void => {
        
            // Al borrar, también ajustamos el contador
            if (student.program === "UG") {
            setUGEnrolments((prev) => prev - 1);
            } else {
            setPGEnrolments((prev) => prev - 1);
            }
        
    };    


    // Actualiza el contador según si es creación o actualización
    const handleStudentChanged = (newStudent: Student) => {
        if (editingStudent) {
            // Caso de actualización:
            if (editingStudent.program !== newStudent.program) {
                // Si el estudiante cambió de programa, decrementamos el contador del programa anterior
                if (editingStudent.program === "UG") {
                setUGEnrolments((prev) => prev - 1);
                } else {
                setPGEnrolments((prev) => prev - 1);
                }
                // Y sumamos al contador del nuevo programa
                if (newStudent.program === "UG") {
                setUGEnrolments((prev) => prev + 1);
                } else {
                setPGEnrolments((prev) => prev + 1);
                }
            }
        // Si no cambió de programa, no se modifica el contador
        } else {
            // Caso de creación de estudiante
            if (newStudent.program === "UG") {
                setUGEnrolments((prev) => prev + 1);
            } else {
                setPGEnrolments((prev) => prev + 1);
            }
        }
        // Actualizamos el estudiante (podrías usar un arreglo si se manejan múltiples estudiantes)
        setStudents(newStudent);
        // Limpiamos el estado de edición
        setEditingStudent(undefined);
    };

    // Al establecer editingStudent, actualizamos el estado de "program"
    useEffect(() => {
        if (editingStudent) {
        setProgram(editingStudent.program);
        }
    }, [editingStudent]);
    
    return (
        <main className="p-6">
          {/* Sección para seleccionar tipo de estudio */}
          <section className="mb-5">
            <label className="block text-xl font-semibold mb-3">
                <FormattedMessage
                id="app.students.label.select"
                defaultMessage="Seleccionar tipo de estudio"
                />
                :
            </label>

            <ul className="mx-auto flex items-center w-full text-sm font-medium text-black-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-lime-500 dark:border-lime-600 dark:text-white grades">
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center ps-3">
                        <input
                            id="radio-grade"
                            type="radio"
                            value="UG"
                            name="programGroup"
                            checked={program === "UG"}
                            onChange={handleChangeProgram}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label htmlFor="radio-grade" className="w-full py-3 ms-2 text-base font-medium text-black-900 dark:text-black-300">
                            <FormattedMessage
                                id="app.students.label.grade"
                                defaultMessage="Grado"
                            />
                        </label>
                    </div>
                </li>
                <li className="w-full dark:border-gray-600">
                    <div className="flex items-center ps-3">
                        <input
                            id="radio-postgraduate"
                            type="radio"
                            value="PG"
                            name="programGroup"
                            checked={program === "PG"}
                            onChange={handleChangeProgram}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label htmlFor="radio-postgraduate" className="w-full py-3 ms-2 text-base font-medium text-black-900 dark:text-black-300">
                            <FormattedMessage
                            id="app.students.label.postgraduate"
                            defaultMessage="Postgrado"
                            />
                        </label>
                    </div>
                </li>
            </ul>

            {/* Matriculaciones actuales */}
            <div className="mt-4">
                <p className="text-lg font-medium">
                <FormattedMessage
                    id="app.students.label.enrollments"
                    defaultMessage="Matriculaciones actuales"
                />
                : {selectedEnrolments()}
                </p>
            </div>
          </section>
    
          {/* Formulario de inscripción */}
          <section className="mb-8">
            <EnrolmentForm 
              chosenProgram={program} 
              currentEnrolments={selectedEnrolments()} 
              onStudentChanged={handleStudentChanged}
              editingStudent={editingStudent}
              onCancel={() => setEditingStudent(undefined)}
            />
          </section>
    
          {/* Lista de estudiantes */}
          <section>
            <EnrolList 
              students={students} 
              onStudentRemoved={handleStudentRemoved} 
              onStudentEditing={setEditingStudent}
            />
          </section>
        </main>
      );
}
export default StudentsPage;
