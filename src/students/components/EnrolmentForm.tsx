import { FormEvent, useEffect, useRef, useState } from 'react';
import {Student} from '../entities/Student';
import { FormattedMessage, useIntl } from 'react-intl';

interface EnrolmentFormProps {
    chosenProgram: string;
    currentEnrolments: number;
    editingStudent?:Student;
    onStudentChanged:(student: Student) => void;
    onCancel?: () => void; // Callback para cancelar la edición
}

function EnrolmentForm(props: EnrolmentFormProps) {

    const intl = useIntl();

    // En lugar de mantener el título en el estado, lo calculamos al renderizar:
    const btnTitleText = props.editingStudent
      ? intl.formatMessage({
          id: 'app.students.form.create.button.update',
          defaultMessage: 'Actualizar'
        })
      : intl.formatMessage({
          id: 'app.students.form.create.button.register',
          defaultMessage: 'Registrar'
        });

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [welcomeMessage, setWelcomeMessage] = useState("");

    const [editingStudentID, setEditingStudentID] = useState<string>();

    const nameInputRef = useRef<HTMLInputElement>(null); 
    
    // Efecto para actualizar (o limpiar) welcomeMessage al cambiar el idioma
    useEffect(() => {
        setWelcomeMessage("");
    }, [intl.locale]);    

    // Método que se ejecutará al intentar registrar o actualizar a un estudiante
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLInputElement;
      const cancelText = intl.formatMessage({
        id: 'app.students.form.create.button.cancel',
        defaultMessage: 'Cancelar',
      });
  
      if (submitter.value === cancelText) {
        // Al presionar cancelar, limpiar el formulario y notificar al padre que se cancela la edición.
        setEditingStudentID(undefined);
        setFirstName("");
        setLastName("");
        nameInputRef.current?.focus();
        if (props.onCancel) {
          props.onCancel();
        }
        return;
      }
  
    // Si no se presionó cancelar, se procede con la inscripción
    const welcomeText = intl.formatMessage(
    {
      id: 'app.students.form.create.message.welcome',
      defaultMessage: 'Bienvenido/a {fullName}',
    },
    { fullName: `${firstName} ${lastName}` });

      setWelcomeMessage(welcomeText);
      event.currentTarget.reset();
      nameInputRef.current?.focus();
  
      const student: Student = {
        id: editingStudentID,
        firstName: firstName,
        lastName: lastName,
        program: props.chosenProgram,
      };
  
      props.onStudentChanged(student);
  
      // Limpiamos la edición
      setEditingStudentID(undefined);
      setFirstName("");
      setLastName("");
      nameInputRef.current?.focus();

      if (props.onCancel) {
        props.onCancel();
      }
    };

  
  useEffect(() => {
    if (props.editingStudent) {
        setEditingStudentID(props.editingStudent.id);
        setFirstName(props.editingStudent.firstName);
        setLastName(props.editingStudent.lastName);
    }
  }, [props.editingStudent]);

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-4">
            <FormattedMessage id="app.students.form.create.label.title" defaultMessage="Crear Estudiante" /> - {props.chosenProgram}
          </h2>
  
          <div>
            <label className="block text-gray-700 mb-1 text-left">
              <FormattedMessage id="app.students.form.create.label.name" defaultMessage="Nombres" />:
            </label>
            <input 
              type="text" 
              name="fname" 
              onChange={(event) => setFirstName(event.target.value)}
              ref={nameInputRef}
              value={firstName}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
  
          <div>
            <label className="block text-gray-700 mb-1 text-left">
              <FormattedMessage id="app.students.form.create.label.lastname" defaultMessage="Apellidos" />:
            </label>
            <input 
              type="text" 
              name="lname" 
              onChange={(event) => setLastName(event.target.value)}
              value={lastName}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
          </div>
  
          <div className="flex justify-center space-x-4">
            <input 
              type="submit" 
              value={btnTitleText} 
              className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded cursor-pointer"
            />
            <input 
              type="submit" 
              value={intl.formatMessage({
                id: 'app.students.form.create.button.cancel',
                defaultMessage: 'Cancelar'
              })}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded cursor-pointer"
            />
          </div>
  
          {welcomeMessage && (
            <p id="studentMsg" className="mt-4 text-sm text-green-600">
              {welcomeMessage}
            </p>
          )}
        </form>
      </div>
    );
   }

export default EnrolmentForm;