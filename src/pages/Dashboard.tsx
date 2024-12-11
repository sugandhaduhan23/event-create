import { useContext, useEffect, useMemo, useState } from "react";
import Table, { Column } from "../components/Table";
import { User } from "../models/user.model";
import { getUsers } from "../services/user.service";
import Button from "../components/Button";
import SlidingWindow from "../components/SlidingWindow";
import UserForm from "./UserForm";
import UserContext, { UserContextType } from "../context/UserContext";
import { Field } from "../components/DynamicForm";
import Loader from "../components/Loader";
import { addFields, deleteField, getFields } from "../services/fields.service";
import { CONSTANTS } from "../constants";
import Alert, { AlertProps } from "../components/Alert";
import UserChart from "./UserChart";


const initialColumns: Column<User>[] = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Age", accessor: "age" },
];

export default function Dashboard() {
  const userCtx = useContext<UserContextType>(UserContext);
  const [dynamicFields, setDynamicFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSlidingWindowOpen, setSlidingWindowOpen] = useState(false);
  const [activeView, setActiveView] = useState<'chart' | 'form'>('chart');
  const [userDataForEdit, setUserDataForEdit] = useState<User>({});
  const [alert, setAlert] = useState<AlertProps | null>(null);

  useEffect(() => {
    async function fetchDynamicFormFields() {
      setLoading(true);
      try {
        const fields = await getFields();
        setDynamicFields(fields);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
    fetchDynamicFormFields();
  }, []);

  useEffect(() => {
    async function getUserData() {
      setLoading(true);
      try {
        const data = await getUsers();
        userCtx.saveUsers(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
    getUserData();
  }, []);

  const dynamicColumns = useMemo(() => dynamicFields.map(field => ({
    header: field.label,
    accessor: field.name,
  })), [dynamicFields]);


  const addField = async (field: Field) => {
    try {
      const newField = await addFields(field);
      setDynamicFields([...(dynamicFields || []), newField]);
      setAlert({ message: CONSTANTS.MESSAGE.FIELD_ADDED, type: CONSTANTS.MESSAGE.SUCCESS });
    } catch (err) {
      setAlert({ message: CONSTANTS.MESSAGE.FAILED_TO_ADD_FIELD, type: CONSTANTS.MESSAGE.ERROR });
    }
  };

  const removeField = async (id: string) => {
    try {
      await deleteField(id);
      setDynamicFields((prevFields) => prevFields!.filter((field) => field.id !== id));
      setAlert({ message: CONSTANTS.MESSAGE.FIELD_REMOVED, type: CONSTANTS.MESSAGE.SUCCESS });
    } catch (err) {
      setAlert({ message: CONSTANTS.MESSAGE.FAILED_TO_REMOVE_FIELD, type: CONSTANTS.MESSAGE.ERROR });
    }
  };

  const getTableColumns = (): Column<User>[] => {
    return [...initialColumns, ...dynamicColumns];
  };

  const handleEditUser = (user: User) => {
    setUserDataForEdit(user);
    setActiveView('form'); 
    setSlidingWindowOpen(true);
  };

  const setSlidingWindowClose = () => {
    setUserDataForEdit({});
    setSlidingWindowOpen(false);
    setAlert(null);
  };

  const hideAlert = () => {
    setAlert(null);
  };

  const handleViewChange = (view: 'chart' | 'form') => {
    setActiveView(view);
    setSlidingWindowOpen(true);
  };

  function notifyParent(){
    setUserDataForEdit({});
  }

  return (
    <>
      {loading && <Loader />}
      <SlidingWindow isOpen={isSlidingWindowOpen} onClose={setSlidingWindowClose} className={activeView === 'chart' ? 'w-100 text-center' : ''}>
        {alert && <Alert message={alert.message} type={alert.type} onClose={hideAlert} />}
        {activeView === 'chart' && (
          <UserChart columns={getTableColumns()} userData={userCtx.users} />)}
        {activeView === 'form' && (
          <UserForm userData={userDataForEdit} onAddField={addField} onRemoveField={removeField} dynamicFields={dynamicFields} notifyParent={notifyParent}/>
        )}
      </SlidingWindow>
      <div className="m-auto w-75 mt-2">
        <div className="d-flex flex-row justify-end gap-3">
          {userCtx.users.length !== 0 &&
            (<Button onClick={() => handleViewChange('chart')} className="align-self-end">
            View Trends
          </Button>)}
          <Button onClick={() => handleViewChange('form')} className="align-self-end">
            Add User
          </Button>
        </div>
        <Table columns={getTableColumns()} data={userCtx.users} editable onEdit={handleEditUser}/>
      </div>
    </>
  );
}
