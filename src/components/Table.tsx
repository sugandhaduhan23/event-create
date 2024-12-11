import { ReactNode, useContext, useMemo, useState } from "react";
import styles from "./Table.module.css";
import Button from "./Button";
import { MdModeEdit } from "react-icons/md";
import ThemeContext from "../context/ThemeContext";
import { CONSTANTS } from "../constants";

export interface Column<T> {
  header: string;
  accessor: keyof T;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  editable: boolean;
  onEdit: (data: T) => void;
  pageSize?: number; 
}

function Table<T>({ columns, data, editable = false, onEdit, pageSize = 20 }: TableProps<T>) {
  const { theme } = useContext(ThemeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);

  const editRowData = (rowData: T) => {
    if (onEdit) onEdit(rowData);
  };

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * currentPageSize;
    return data.slice(startIndex, startIndex + currentPageSize);
  }, [data, currentPage, currentPageSize]);

  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / currentPageSize)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPageSize(Number(event.target.value));
    setCurrentPage(1); 
  };

  return (
    <div className={`${styles.table_wrapper} d-flex mt-2 flex-col w-100 ${theme === CONSTANTS.THEME.DARK ? styles.darkMode : ""}`}>
    <table role="table" aria-labelledby="tableTitle" className={`${styles.table}`}>
       <thead>
          <tr>
             {columns.map((column) => (
             <th key={column.header} scope="col">{column.header}</th>
             ))}{editable && 
             <th scope="col">Actions</th>
             }
          </tr>
       </thead>
       <tbody>
          {paginatedData.length === 0 ? (
          <tr><td colSpan={columns.length + (editable ? 1 : 0)} className={styles.noData}>No Data Found</td></tr>
          ) : (paginatedData.map((row, rowIndex) => (
          <tr key={rowIndex}>
             {columns.map((column, colIndex) => (
             <td key={colIndex}>{row[column.accessor] as ReactNode}</td>
             ))}{editable && (
             <td>
                <Button type="button" buttonType={CONSTANTS.BUTTON_TYPE.TEXT} onClick={() =>
                   editRowData(row)} aria-label="Edit row">
                   <MdModeEdit size={20} />
                </Button>
             </td>
             )}
          </tr>
          )))} 
       </tbody>
    </table>
    {paginatedData.length !== 0 && (
    <div className={styles.pagination} aria-live="polite">
       <button onClick={prevPage} disabled={currentPage === 1} className={styles.paginationButton} aria-disabled={currentPage === 1}>Previous</button>
       <div className={styles.display}>
          <span className={styles.pageInfo}>Page {currentPage} of {Math.ceil(data.length / currentPageSize)}</span>
          <select value={currentPageSize} onChange={handlePageSizeChange} className={styles.pageSizeSelector}>
             {[5, 10, 15, 20].map((size) => (
             <option key={size} value={size}>{size}</option>
             ))}
          </select>
       </div>
       <button onClick={nextPage} disabled={currentPage === Math.ceil(data.length / currentPageSize)} className={styles.paginationButton} aria-disabled={currentPage === Math.ceil(data.length / currentPageSize)}>Next</button>
    </div>
    )}</div>  );
}

export default Table;
