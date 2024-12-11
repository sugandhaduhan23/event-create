import UserContext, { UserContextType } from "../context/UserContext";
import DynamicForm, { Field } from "../components/DynamicForm";
import {useContext, useMemo, useState } from "react";
import { addUser, updateUser } from "../services/user.service";
import { User } from "../models/user.model";
import Loader from "../components/Loader";
import Alert, { AlertProps } from "../components/Alert";
import { CONSTANTS } from "../constants";

interface UserFormProps {
  userData: User;
  dynamicFields: Field[],
  notifyParent: () => void,
  onAddField: (field: Field) => void;
  onRemoveField: (id: string) => void
}

const initialFormFields : Field[] = [
  {
    label: "Name",
    name: "name",
    id: "name",
    type: "text",
    required: true,
    removable: false,
    error: ''
  },
  {
    label: "Email",
    name: "email",
    id: "email",
    type: "email",
    required: true,
    removable: false,
    error:'',
  },
  {
    label: "Age",
    name: "age",
    id: "age",
    type: "number",
    required: true,
    removable: false,
    error:''
  }
];

export default function UserForm({userData, dynamicFields, onAddField, onRemoveField, notifyParent} : UserFormProps) {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const userCtx = useContext<UserContextType>(UserContext);
  const isEditing = Object.keys(userData).length !== 0;;

  const formFields = useMemo(() => {
    let fields: Field[] = [...initialFormFields, ...dynamicFields];
    if (userData) {
      fields = fields.map((field) => ({
        ...field,
        value: userData![field.name] || "",
      }));
    }
    return fields;
  }, [dynamicFields, userData]); 


  const manageUser = async (userDetails: User) => {
    if(!isEditing){
        addNewUser(userDetails);
    }else{
      editUser(userDetails);
    } 
  }

  async function addNewUser(userDetails: User){
    setLoading(true);
    try{
        const newUser = await addUser(userDetails);
        userCtx.addUser(newUser);
        notifyParent();
        setAlert({ message: CONSTANTS.MESSAGE.USER_ADDED, type: CONSTANTS.MESSAGE.SUCCESS });
        setLoading(false);
      }catch(err){
          setAlert({ message: CONSTANTS.MESSAGE.FAILED_TO_ADD_USER, type: CONSTANTS.MESSAGE.ERROR });
          setLoading(false);
      }
  }

  async function editUser(updatedUserDetails: User){
    setLoading(true);
    try{
       userData = {...userData, ...updatedUserDetails}
       const updatedUser = await updateUser(userData);
       userCtx.editUser(updatedUser);
       setAlert({ message: CONSTANTS.MESSAGE.USER_EDITED, type: CONSTANTS.MESSAGE.SUCCESS });
       setLoading(false);
     }catch(err){
         setAlert({ message: CONSTANTS.MESSAGE.FAILED_TO_EDIT_USER, type: CONSTANTS.MESSAGE.ERROR });
         setLoading(false);
     }
  }

  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <>
      {loading && <Loader/>}
      {alert && (
        <Alert message={alert.message} type={alert.type} onClose={hideAlert} />
      )}
      <DynamicForm initialFormFields={formFields} onAddField={onAddField} onRemoveField={onRemoveField} onSave={manageUser} />
    </>
  );
}

