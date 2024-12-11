import { memo, useContext, useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Select, { Option } from "./Select";
import classes from './DynamicForm.module.css'
import ThemeContext from "../context/ThemeContext";
import { sanitize } from "../utils/sanitize";
import { MdDeleteForever } from "react-icons/md";
import { CONSTANTS } from "../constants";

export interface Field {
  id?: string;
  label: string;
  name: string;
  type: string;
  value?: any;
  required?: boolean,
  removable?: boolean,
  error?: string;
}

interface DynamicFormProps{
  initialFormFields?: Field[];
  allowDynamicField?: boolean;
  onAddField?: (field: Field) => void;
  onRemoveField?: (id: string) => void;
  onSave?: (data: any) => void;
}

const initialFieldState : Field = {
  label: "",
  name: "",
  type: "text",
  error:""
}

function DynamicForm({initialFormFields, allowDynamicField = true,  onAddField, onRemoveField, onSave}: DynamicFormProps) {
  const { theme } = useContext(ThemeContext);
  const [fields, setFields] = useState(initialFormFields);
  const [newField, setNewField] = useState<Field>(initialFieldState);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (initialFormFields && initialFormFields.length > 0) {
      setFields(initialFormFields);
    }
  }, [initialFormFields]);


  const options: Option[] = [
    { value: "text", label: "Text" },
    { value: "number", label: "Number" },
    { value: "email", label: "Email" },
    { value: "password", label: "Password" },
  ];

  const handleChange = (fieldIndex: number,event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedField = { ...fields![fieldIndex], value: sanitize(event.target.value) };
    const error = validateField(updatedField);
    const newFields = [...fields!];
    newFields[fieldIndex] = { ...updatedField, error };
    setFields(newFields);
  };

  const validateField = (field: Field): string | undefined => {
    if (field.required && !field.value) {
      return `${field.label} ${CONSTANTS.ERRORS.REQUIRED}`;
    }
  
    if (field.type === "email" && field.value && !/\S+@\S+\.\S+/.test(String(field.value))) {
      return CONSTANTS.ERRORS.INVALID_EMAIL;
    }
  
    if (field.type === "number" && field.value && isNaN(Number(field.value))) {
      return CONSTANTS.ERRORS.VALID_NUMBER;
    }

    if (field.type === "number" && field.value && Number(field.value) < 0) {
      return CONSTANTS.ERRORS.POSITIVE_NUMBER;
    }
  
    return "";
  };

  const handleNewFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, property: keyof Field) => {
    setNewField({ ...newField, [property]: event.target.value, error: '' });
  };

  const handleAddField = () => {
    if(!newField.label){
        setNewField({ ...newField, error: CONSTANTS.ERRORS.LABEL_REQUIRED});
        return;
    }
    const fieldlabel = newField.label.toLowerCase().split(" ").join("");
    const addedField = {
      ...newField,
      name: `field-${fieldlabel}-${fields!.length + 1}`,
      removable: true,
      error: ''
    };
    setFields([...fields!, addedField]);
    if (onAddField) {
      onAddField(addedField);
    }
    setIsAdding(false);
    setNewField(initialFieldState);
  };

  const handleRemoveField = (id: string) => {
    if(onRemoveField)
       onRemoveField(id);
  };

  const validateFormFields = (fields: Field[]): boolean => {
    let isValid = true;
    const updatedFields = fields.map(field => {
      const error = validateField(field); 
      if (error) {
        isValid = false;
      }
      return { ...field, error };
    });
    setFields(updatedFields);
    return isValid;
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateFormFields(fields!);
    if (isValid && onSave) {
      const formValues = fields!.reduce((acc, field) => {
        acc[field.name] = field.value !== undefined ? String(field.value) : "";
        return acc;
      }, {} as { [key: string]: string });
      onSave(formValues);
    }
  };

  const handleCancelAddField = function(){
    setIsAdding(false);
    setNewField(initialFieldState)
  }
  
  return (
    <form onSubmit={handleSubmit} className={`${theme === CONSTANTS.THEME.DARK ? classes.darkMode : ""} w-100 d-flex flex-col gap-3`} noValidate>
      {fields!.map((field, fieldIndex) => (
        <div className={`d-flex align-items-end ${classes.input_wrapper}`} key={field.id}>
          <Input label={field.label} id={field.id || "Field" + field.id} type={field.type} value={field.value || ''} onChange={(event) => handleChange(fieldIndex, event)} required={field?.required} error={field.error} aria-required={field.required ? "true" : "false"}/>
          {field.removable && (
            <Button type="button" buttonType="text" className={`${classes.deleteBtn} p-0`} onClick={() => handleRemoveField(field.id ?? '')} aria-label={`Remove ${field.label}`}>
              <MdDeleteForever size={30} />
            </Button>
          )}
          {field.error && <span id={`error-${field.id}`} className={classes.errorText}>{field.error}</span>}
        </div>
      ))}

      {isAdding && (
        <div className={classes.dynamicFields}>
          <div className="d-flex flex-col gap-3">
            <Input label="Field Label" id="fieldLabel" name="label" type="text" value={newField.label} placeholder="Enter Label" onChange={(e) => handleNewFieldChange(e, "label")} error={newField.error} aria-required="true" aria-invalid={newField.error ? "true" : "false"}/>
            <Select label="Type" options={options} onChange={(e) => handleNewFieldChange(e, "type")} value={newField.type} aria-required="true"/>
          </div>
          <div className={classes.dynamicFields_button}>
            <Button type="button" buttonType={CONSTANTS.BUTTON_TYPE.TEXT} className="p-0" onClick={handleAddField} aria-label="Add new field">Add</Button>
            <Button type="button" buttonType={CONSTANTS.BUTTON_TYPE.TEXT} className="p-0" onClick={handleCancelAddField} aria-label="Cancel adding field">Cancel</Button>
          </div>
        </div>
      )}

      <div className={classes.form_actions}>
        {!isAdding && (
          <>
            <Button type="button" onClick={() => setIsAdding(true)} aria-label="Add new field">Add Field</Button>
            <Button type="submit" aria-label="Save form">Save</Button>
          </>
        )}
      </div>
    </form>
  );
}

export default memo(DynamicForm);